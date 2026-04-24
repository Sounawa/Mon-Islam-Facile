"use client";

import { Lesson } from "@/lib/lessons-data";
import { ArrowLeft, BookOpen, Info } from "lucide-react";

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onStartQuiz: () => void;
  isCompleted: boolean;
}

export default function LessonView({
  lesson,
  onBack,
  onStartQuiz,
  isCompleted,
}: LessonViewProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 group font-medium"
        aria-label="Retour à l'accueil"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
        Retour aux leçons
      </button>

      {/* Lesson Header */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-lg relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
        }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="relative">
          <div className="text-5xl mb-3">{lesson.emoji}</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
            {lesson.title}
          </h1>
          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 bg-white/25 rounded-full px-3 py-1 text-sm font-bold backdrop-blur-sm">
              ✅ Leçon terminée !
            </span>
          )}
        </div>
      </div>

      {/* Lesson Sections */}
      <div className="space-y-6">
        {lesson.sections.map((section, idx) => (
          <div
            key={idx}
            className={`${lesson.colorBg} ${lesson.colorBorder} border-2 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-md`}
          >
            {/* Section title */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className="mt-0.5 p-2 rounded-xl text-white shrink-0"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
                }}
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                {section.title}
              </h2>
            </div>

            {/* Section content */}
            <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
              {section.content}
            </p>

            {/* Key points */}
            {section.points && section.points.length > 0 && (
              <div className="bg-white/70 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Points importants :
                </p>
                {section.points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2 text-sm sm:text-base text-gray-700"
                  >
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fun Facts */}
      {lesson.funFacts.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-500" />
            Le savais-tu ?
          </h3>
          {lesson.funFacts.map((fact, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-amber-100 to-yellow-50 border border-amber-200 rounded-xl p-4 sm:p-5 flex items-start gap-3 animate-pulse-once"
              style={{
                animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
              }}
            >
              <span className="text-2xl shrink-0">🤔</span>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {fact}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Quiz CTA */}
      <div className="mt-10 text-center">
        <button
          onClick={onStartQuiz}
          className="inline-flex items-center gap-2 text-white font-extrabold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          style={{
            backgroundImage: `linear-gradient(135deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
          }}
        >
          🧠 Passer le Quiz !
          <span className="hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </button>
        <p className="text-gray-500 text-sm mt-3">
          {isCompleted
            ? "Refaire le quiz pour améliorer ton score !"
            : "Teste ce que tu as appris dans cette leçon !"}
        </p>
      </div>

      {/* Inline styles for animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
