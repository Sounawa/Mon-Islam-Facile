"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  LESSONS,
  getProgress,
  saveProgress,
  calculateStars,
  type UserProgress,
} from "@/lib/lessons-data";
import LessonCard from "@/components/LessonCard";
import LessonView from "@/components/LessonView";
import QuizSection from "@/components/QuizSection";
import ProgressBadge from "@/components/ProgressBadge";
import StarRating from "@/components/StarRating";
import { Star, BookOpen } from "lucide-react";

type ViewType = "home" | "lesson" | "quiz";

const SOURCE_URLS = [
  {
    label: "Les Statuts Légaux",
    url: "https://www.doctrine-malikite.fr/Les-statuts-legaux-en-Islam_r27.html",
  },
  {
    label: "La Purification",
    url: "https://www.doctrine-malikite.fr/La-purification-proprete-rituelle_r28.html",
  },
  {
    label: "La Prière",
    url: "https://www.doctrine-malikite.fr/La-priere-canonique_r29.html",
  },
  {
    label: "La Zakât",
    url: "https://www.doctrine-malikite.fr/La-Zakat_r30.html",
  },
  {
    label: "Le Ramadan",
    url: "https://www.doctrine-malikite.fr/Jeune-du-mois-de-Ramadan_r31.html",
  },
];

export default function Home() {
  const [view, setView] = useState<ViewType>("home");
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    quizScores: {},
    totalStars: 0,
  });
  const isMountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;
    const saved = getProgress();
    // Defer state updates to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      setProgress(saved);
      setIsMounted(true);
    });
  }, []);

  const updateProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  }, []);

  const handleStartLesson = useCallback((lessonId: string) => {
    setCurrentLessonId(lessonId);
    setView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStartQuiz = useCallback(() => {
    setView("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToHome = useCallback(() => {
    setView("home");
    setCurrentLessonId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToLesson = useCallback(() => {
    setView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleQuizComplete = useCallback(
    (score: number) => {
      if (!currentLessonId) return;
      const lesson = LESSONS.find((l) => l.id === currentLessonId);
      if (!lesson) return;

      const stars = calculateStars(score, lesson.quiz.length);
      const newCompleted = [...new Set([...progress.completedLessons, currentLessonId])];

      // Keep the best score
      const prevScore = progress.quizScores[currentLessonId] || 0;
      const bestScore = Math.max(prevScore, score);
      const prevStars = calculateStars(prevScore, lesson.quiz.length);
      const starDiff = stars - prevStars;

      const newProgress: UserProgress = {
        completedLessons: newCompleted,
        quizScores: { ...progress.quizScores, [currentLessonId]: bestScore },
        totalStars: progress.totalStars + Math.max(starDiff, 0),
      };

      updateProgress(newProgress);
    },
    [currentLessonId, progress, updateProgress]
  );

  const currentLesson = LESSONS.find((l) => l.id === currentLessonId);
  const totalPossibleStars = LESSONS.length * 3;

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-4">🕌</div>
          <p className="text-amber-700 font-bold text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-emerald-100/30 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-rose-100/20 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 w-48 h-48 rounded-full bg-cyan-100/30 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 sticky top-0 bg-amber-50/80 backdrop-blur-md border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo & title */}
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="Accueil"
          >
            <div className="text-3xl sm:text-4xl transform group-hover:rotate-12 transition-transform duration-300">
              ☪️
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 leading-tight">
                Mon Islam Facile
              </h1>
              <p className="text-xs text-amber-600 font-medium hidden sm:block">
                Apprends ta religion ! 🌟
              </p>
            </div>
          </button>

          {/* Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars counter */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500 text-amber-500" />
              <span className="text-sm sm:text-base font-extrabold text-amber-700">
                {progress.totalStars}
              </span>
              <span className="text-xs text-amber-500 hidden sm:inline">
                / {totalPossibleStars}
              </span>
            </div>

            {/* Progress badge (hidden on small screens) */}
            <div className="hidden md:block">
              <ProgressBadge progress={progress} />
            </div>
          </div>
        </div>

        {/* Mobile progress */}
        <div className="md:hidden px-4 pb-2">
          <ProgressBadge progress={progress} />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 py-6 sm:py-10">
        {view === "home" && (
          <div className="max-w-6xl mx-auto">
            {/* Welcome section */}
            <section className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-1.5 mb-4">
                <span className="animate-bounce text-sm">🌟</span>
                <span className="text-sm font-bold text-amber-700">
                  Bienvenue, petit musulman !
                </span>
                <span className="animate-bounce text-sm" style={{ animationDelay: "0.3s" }}>🌟</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
                Découvre les bases de{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                  ta religion
                </span>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Choisis une leçon ci-dessous pour commencer à apprendre !
                Chaque leçon a un quiz amusant à la fin. ✨
              </p>

              {/* Overall progress */}
              {progress.completedLessons.length > 0 && (
                <div className="mt-6 inline-flex flex-col items-center gap-2 bg-white rounded-2xl shadow-sm border border-amber-200 px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <BookOpen className="w-4 h-4" />
                    Tes étoiles totales
                  </div>
                  <StarRating
                    stars={Math.min(Math.floor(progress.totalStars / (LESSONS.length / 3)), 3)}
                    size="lg"
                  />
                  <p className="text-xs text-gray-400">
                    {progress.completedLessons.length} leçon{progress.completedLessons.length !== 1 ? "s" : ""} terminée{progress.completedLessons.length !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </section>

            {/* Lesson grid */}
            <section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              aria-label="Leçons disponibles"
            >
              {LESSONS.map((lesson, idx) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={idx}
                  progress={progress}
                  onClick={() => handleStartLesson(lesson.id)}
                />
              ))}
            </section>
          </div>
        )}

        {view === "lesson" && currentLesson && (
          <LessonView
            lesson={currentLesson}
            onBack={handleBackToHome}
            onStartQuiz={handleStartQuiz}
            isCompleted={progress.completedLessons.includes(currentLesson.id)}
          />
        )}

        {view === "quiz" && currentLesson && (
          <QuizSection
            lesson={currentLesson}
            onComplete={handleQuizComplete}
            onBack={handleBackToLesson}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto bg-white/80 backdrop-blur-sm border-t border-amber-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Attribution */}
          <p className="text-center text-sm text-gray-500 mb-4">
            Contenu adapté de{" "}
            <a
              href="https://www.doctrine-malikite.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2"
            >
              doctrine-malikite.fr
            </a>
          </p>

          {/* Source links */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs text-gray-400">
            {SOURCE_URLS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-600 transition-colors duration-200 underline underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-gray-300 mt-4">
            © {new Date().getFullYear()} Mon Islam Facile — Application éducative
            pour enfants
          </p>
        </div>
      </footer>
    </div>
  );
}
