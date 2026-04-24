"use client";

import { Lesson, UserProgress } from "@/lib/lessons-data";
import { CheckCircle, Sparkles } from "lucide-react";

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  progress: UserProgress;
  onClick: () => void;
}

export default function LessonCard({
  lesson,
  index,
  progress,
  onClick,
}: LessonCardProps) {
  const isCompleted = progress.completedLessons.includes(lesson.id);
  const score = progress.quizScores[lesson.id];
  const stars = score !== undefined ? Math.round(score / (lesson.quiz.length / 3)) : 0;

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-offset-2"
      style={{
        backgroundImage: `linear-gradient(135deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
      }}
      aria-label={`Commencer la leçon: ${lesson.title}`}
    >
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />

      {/* Content */}
      <div className="relative p-5 sm:p-6 text-white">
        {/* Lesson number badge */}
        <div className="absolute top-3 right-3 bg-white/20 rounded-full px-2.5 py-0.5 text-xs font-bold backdrop-blur-sm">
          Leçon {index + 1}
        </div>

        {/* Completed badge */}
        {isCompleted && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/25 rounded-full px-2 py-0.5 text-xs font-bold backdrop-blur-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            Terminé
          </div>
        )}

        {/* Emoji */}
        <div className="text-4xl sm:text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
          {lesson.emoji}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold mb-2 leading-tight">
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-white/90 text-sm sm:text-base mb-4 leading-relaxed">
          {lesson.shortDescription}
        </p>

        {/* Stars display */}
        {isCompleted && (
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`text-lg ${
                  s <= Math.min(stars, 3) ? "opacity-100" : "opacity-30"
                }`}
              >
                ⭐
              </span>
            ))}
            <span className="text-xs ml-1 bg-white/20 rounded-full px-2 py-0.5">
              {score}/{lesson.quiz.length}
            </span>
          </div>
        )}

        {/* CTA button */}
        <div className="flex items-center gap-2 bg-white text-gray-800 rounded-xl px-4 py-2 font-bold text-sm group-hover:bg-white/95 transition-colors duration-300 shadow-sm">
          {isCompleted ? (
            <>
              <Sparkles className="w-4 h-4" />
              Relire
            </>
          ) : (
            <>
              Commencer
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
