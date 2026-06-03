#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ConvexHttpClient } from "convex/browser";

import { api } from "../../convex/_generated/api.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const nextOrigin = process.env.NEXT_ORIGIN ?? "http://localhost:3002";
const trustedOrigin = process.env.TRUSTED_ORIGIN ?? "http://localhost:3002";
const convexUrl = process.env.CONVEX_URL ?? "http://127.0.0.1:3210";
const password = "Teste12345!";
const stamp = Date.now();
const envText = readFileSync(path.join(root, ".env.local"), "utf8");
const originalAdminEmails = envText.match(/^ADMIN_EMAILS=(.*)$/m)?.[1]?.trim() ?? "";
const adminEmail = `security-admin-${stamp}@beasell.test`;
const studentEmail = `security-student-${stamp}@beasell.test`;
const otherStudentEmail = `security-other-${stamp}@beasell.test`;

function setConvexEnv(name, value) {
  execFileSync("./node_modules/.bin/convex", ["env", "set", name, value], {
    cwd: root,
    stdio: ["ignore", "ignore", "pipe"],
  });
}

function splitSetCookie(value) {
  if (!value) return [];
  return value.split(/,\s*(?=[^;,\s]+=)/g);
}

function getSetCookies(headers) {
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  return splitSetCookie(headers.get("set-cookie"));
}

function toCookieHeader(setCookies) {
  return setCookies
    .map((cookie) => cookie.split(";")[0])
    .filter(Boolean)
    .join("; ");
}

function getCookieValue(cookieHeader, name) {
  const match = cookieHeader.split("; ").find((cookie) => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

async function signup(email, name) {
  const response = await fetch(`${nextOrigin}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: trustedOrigin,
    },
    body: JSON.stringify({ name, email, password }),
  });
  const body = await response.text();
  const setCookies = getSetCookies(response.headers);
  const cookieHeader = toCookieHeader(setCookies);
  const jwt = getCookieValue(cookieHeader, "better-auth.convex_jwt");

  if (!response.ok || !jwt) {
    throw new Error(`signup failed ${response.status}: ${body.slice(0, 300)}`);
  }

  const client = new ConvexHttpClient(convexUrl);
  client.setAuth(jwt);

  return { client, email };
}

async function expectReject(label, action, expectedText) {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (expectedText && !message.toLowerCase().includes(expectedText.toLowerCase())) {
      throw new Error(`${label} failed with unexpected error: ${message}`);
    }
    return { label, blocked: true, message };
  }

  throw new Error(`${label} was not blocked`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  setConvexEnv("ADMIN_EMAILS", [originalAdminEmails, adminEmail].filter(Boolean).join(","));

  try {
    const admin = await signup(adminEmail, "Admin Security QA");
    const student = await signup(studentEmail, "Aluno Security QA");
    const otherStudent = await signup(otherStudentEmail, "Outro Aluno Security QA");

    const adminUser = await admin.client.mutation(api.users.ensureCurrentUser, {});
    const studentUser = await student.client.mutation(api.users.ensureCurrentUser, {});
    await otherStudent.client.mutation(api.users.ensureCurrentUser, {});

    assert(adminUser.role === "admin", "temporary admin did not receive admin role");
    assert(studentUser.role === "student", "temporary student did not receive student role");

    const courseId = await admin.client.mutation(api.courses.createCourse, {
      title: `Curso Security QA ${stamp}`,
      slug: `curso-security-qa-${stamp}`,
      description: "Curso temporario para validar autorizacao negativa.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      price: 18000,
      isPublished: true,
    });
    const moduleId = await admin.client.mutation(api.courses.addModule, {
      courseId,
      title: "Modulo Security QA",
      order: 1,
    });
    const lessonId = await admin.client.mutation(api.courses.addLesson, {
      moduleId,
      title: "Aula Security QA",
      type: "video",
      contentUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 5,
      order: 1,
    });

    const enrollmentId = await student.client.mutation(api.courses.enroll, {
      courseId,
      paymentMethod: "transferencia",
      paymentReference: `SEC-${stamp}`,
    });
    const payments = await admin.client.query(api.payments.listForAdmin, {});
    const payment = payments.find((row) => row.payment.enrollmentId === enrollmentId);
    assert(payment, "payment record not found for security QA enrollment");
    assert(payment.payment.status === "submitted", "security QA payment was not submitted");

    const blocked = [];
    blocked.push(
      await expectReject(
        "student cannot list admin payments",
        () => student.client.query(api.payments.listForAdmin, {}),
        "administradores",
      ),
    );
    blocked.push(
      await expectReject(
        "student cannot approve payment",
        () =>
          student.client.mutation(api.payments.approve, {
            paymentId: payment.payment._id,
            adminNote: "Tentativa indevida do aluno.",
          }),
        "administradores",
      ),
    );
    blocked.push(
      await expectReject(
        "student cannot reject payment",
        () =>
          student.client.mutation(api.payments.reject, {
            paymentId: payment.payment._id,
            adminNote: "Tentativa indevida do aluno.",
          }),
        "administradores",
      ),
    );
    blocked.push(
      await expectReject(
        "student cannot create course",
        () =>
          student.client.mutation(api.courses.createCourse, {
            title: `Curso Indevido ${stamp}`,
            slug: `curso-indevido-${stamp}`,
            description: "Tentativa indevida.",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
            price: 0,
            isPublished: true,
          }),
        "administradores",
      ),
    );
    blocked.push(
      await expectReject(
        "student cannot list users",
        () => student.client.query(api.users.list, {}),
        "administradores",
      ),
    );
    blocked.push(
      await expectReject(
        "student cannot read student detail",
        () => student.client.query(api.users.getStudentDetail, { userId: studentUser._id }),
        "administradores",
      ),
    );
    blocked.push(
      await expectReject(
        "student cannot read platform health",
        () => student.client.query(api.operations.getPlatformHealth, {}),
        "administradores",
      ),
    );
    blocked.push(
      await expectReject(
        "student cannot complete paid lesson before approval",
        () =>
          student.client.mutation(api.courses.toggleCompletion, {
            courseId,
            lessonId,
            completed: true,
          }),
        "pagamento aprovado",
      ),
    );

    const otherCourses = await otherStudent.client.query(api.courses.getMyCourses, {});
    assert(
      !otherCourses.some((row) => row.enrollment.courseId === courseId),
      "other student can see another student's enrollment",
    );

    await admin.client.mutation(api.payments.approve, {
      paymentId: payment.payment._id,
      adminNote: "Aprovado automaticamente pelo smoke negativo de seguranca.",
    });

    const learningSession = await student.client.query(api.courses.getLearningSession, {
      slug: `curso-security-qa-${stamp}`,
      lessonId,
    });
    assert(
      learningSession?.requiresEnrollment === false,
      "student still cannot access approved course",
    );
    assert(
      learningSession?.lesson?._id === lessonId,
      "approved student did not receive lesson payload",
    );

    const progress = await student.client.mutation(api.courses.toggleCompletion, {
      courseId,
      lessonId,
      completed: true,
    });
    assert(progress?.progress === 100, "approved student could not complete the lesson");

    console.log(
      JSON.stringify(
        {
          checkedAt: new Date().toISOString(),
          courseId,
          paymentId: payment.payment._id,
          blockedChecks: blocked.map((item) => item.label),
          positiveChecks: [
            "admin can create course/module/lesson",
            "admin can approve submitted payment",
            "approved student can access lesson",
            "approved student can complete lesson",
          ],
        },
        null,
        2,
      ),
    );
  } finally {
    setConvexEnv("ADMIN_EMAILS", originalAdminEmails);
  }
}

await main();
