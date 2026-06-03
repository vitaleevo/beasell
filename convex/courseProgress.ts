import type { Id } from "./_generated/dataModel";

export type CourseProgressInput = {
  lessonIds: Id<"lessons">[];
  completedLessonIds: Id<"lessons">[];
};

export type CourseProgressResult = {
  totalLessons: number;
  completedLessonIds: Id<"lessons">[];
  completedLessons: number;
  progress: number;
  isCompleted: boolean;
};

export function calculateCourseProgress({
  lessonIds,
  completedLessonIds,
}: CourseProgressInput): CourseProgressResult {
  const lessonIdSet = new Set(lessonIds);
  const uniqueCompletedLessonIds = Array.from(new Set(completedLessonIds)).filter((lessonId) =>
    lessonIdSet.has(lessonId),
  );
  const totalLessons = lessonIds.length;
  const completedLessons = uniqueCompletedLessonIds.length;
  const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return {
    totalLessons,
    completedLessonIds: uniqueCompletedLessonIds,
    completedLessons,
    progress,
    isCompleted: totalLessons > 0 && completedLessons === totalLessons,
  };
}
