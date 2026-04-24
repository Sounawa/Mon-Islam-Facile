"use client";

import { LESSONS } from "@/lib/lessons-data";
import { UserProgress } from "@/lib/lessons-data";

interface ProgressBadgeProps {
  progress: UserProgress;
}

export default function ProgressBadge({ progress }: ProgressBadgeProps) {
  const completedCount = progress.completedLessons.length;
  const totalCount = LESSONS.length;
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-amber-200">
      {/* Mini progress bar */}
      <div className="flex items-center gap-1.5">
        {LESSONS.map((lesson) => {
          const isDone = progress.completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: isDone ? lesson.colorFrom : "#e5e7eb",
                boxShadow: isDone ? `0 0 6px ${lesson.colorFrom}50` : "none",
              }}
              title={
                isDone
                  ? `${lesson.emoji} ${lesson.title} ✅`
                  : `${lesson.emoji} ${lesson.title}`
              }
            />
          );
        })}
      </div>

      {/* Text */}
      <div className="text-xs sm:text-sm font-bold text-gray-600">
        <span className="text-amber-600">{completedCount}</span>
        <span className="text-gray-400">/</span>
        <span>{totalCount}</span>
      </div>

      {/* Percentage badge */}
      {completedCount > 0 && (
        <span
          className="text-xs font-extrabold text-white px-2 py-0.5 rounded-full"
          style={{
            backgroundImage: `linear-gradient(135deg, #f59e0b, #d97706)`,
          }}
        >
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
