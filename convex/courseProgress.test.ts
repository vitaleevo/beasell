import { describe, expect, it } from "vitest";
import type { Id } from "./_generated/dataModel";
import { calculateCourseProgress } from "./courseProgress";

const lessonId = (value: string) => value as Id<"lessons">;

describe("course progress calculation", () => {
  it("returns zero progress when a course has no lessons", () => {
    expect(
      calculateCourseProgress({
        lessonIds: [],
        completedLessonIds: [lessonId("lesson-a")],
      }),
    ).toEqual({
      totalLessons: 0,
      completedLessonIds: [],
      completedLessons: 0,
      progress: 0,
      isCompleted: false,
    });
  });

  it("deduplicates completed lessons and ignores lessons outside the course", () => {
    const result = calculateCourseProgress({
      lessonIds: [lessonId("lesson-a"), lessonId("lesson-b"), lessonId("lesson-c")],
      completedLessonIds: [lessonId("lesson-a"), lessonId("lesson-a"), lessonId("lesson-outside")],
    });

    expect(result.completedLessonIds).toEqual([lessonId("lesson-a")]);
    expect(result.completedLessons).toBe(1);
    expect(result.progress).toBe(33);
    expect(result.isCompleted).toBe(false);
  });

  it("marks the course as completed only when every course lesson is completed", () => {
    const result = calculateCourseProgress({
      lessonIds: [lessonId("lesson-a"), lessonId("lesson-b")],
      completedLessonIds: [lessonId("lesson-b"), lessonId("lesson-a")],
    });

    expect(result.completedLessons).toBe(2);
    expect(result.progress).toBe(100);
    expect(result.isCompleted).toBe(true);
  });
});
