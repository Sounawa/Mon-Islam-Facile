"use client";

import { useState, useCallback } from "react";
import { Lesson, calculateStars, getEncouragingMessage } from "@/lib/lessons-data";
import { CheckCircle, XCircle, Star, RotateCcw, Trophy, PartyPopper } from "lucide-react";

interface QuizSectionProps {
  lesson: Lesson;
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface ShuffledQuestion {
  originalId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateShuffledQuestions(lesson: Lesson): ShuffledQuestion[] {
  return lesson.quiz.map((q) => {
    const correctAnswer = q.options[q.correctIndex];
    const shuffledOptions = shuffleArray(q.options);
    return {
      originalId: q.id,
      question: q.question,
      options: shuffledOptions,
      correctAnswer,
    };
  });
}

export default function QuizSection({
  lesson,
  onComplete,
  onBack,
}: QuizSectionProps) {
  const [questions] = useState<ShuffledQuestion[]>(() => generateShuffledQuestions(lesson));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isAnswered) return;
      setSelectedAnswer(answer);
      setIsAnswered(true);
      if (answer === questions[currentQuestion].correctAnswer) {
        setScore((prev) => prev + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
      }
    },
    [isAnswered, questions, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      onComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0));
    }
  }, [currentQuestion, questions, score, selectedAnswer, onComplete]);

  const handleRetry = useCallback(() => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResult(false);
  }, []);

  const stars = calculateStars(score, questions.length);
  const finalScore = showResult ? score : score;
  const message = getEncouragingMessage(finalScore, questions.length);

  if (showResult) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Result header */}
        <div
          className="rounded-2xl p-8 mb-6 text-white shadow-lg relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
          }}
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
          <div className="relative">
            <div className="text-6xl mb-4">
              {stars >= 3 ? "🏆" : stars >= 2 ? "🌟" : stars >= 1 ? "👍" : "📚"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Quiz terminé !</h2>
            <p className="text-lg text-white/90">{message}</p>
          </div>
        </div>

        {/* Score display */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          {/* Stars */}
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`transition-all duration-500 ${
                  s <= stars
                    ? "scale-110 opacity-100"
                    : "scale-75 opacity-30"
                }`}
                style={{ transitionDelay: `${s * 200}ms` }}
              >
                <Star
                  className={`w-12 h-12 ${
                    s <= stars ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Score bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
              <span>Score</span>
              <span>
                {finalScore} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(finalScore / questions.length) * 100}%`,
                  backgroundImage: `linear-gradient(90deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-bold">
              {stars} étoile{stars !== 1 ? "s" : ""} gagnée{stars !== 1 ? "s" : ""} !
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer
          </button>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            style={{
              backgroundImage: `linear-gradient(135deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
            }}
          >
            Voir la leçon
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors text-sm font-medium"
      >
        ← Retour à la leçon
      </button>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
          <span>
            Question {currentQuestion + 1} / {questions.length}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {score}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              backgroundImage: `linear-gradient(90deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className={`${lesson.colorBg} ${lesson.colorBorder} border-2 rounded-2xl p-6 sm:p-8 mb-6 shadow-md`}>
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-6 flex items-start gap-3">
          <span className="text-2xl sm:text-3xl">{lesson.emoji}</span>
          <span>{question.question}</span>
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correctAnswer;
            const showCorrectFeedback = isAnswered && isCorrect;
            const showWrongFeedback = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all duration-300 flex items-center gap-3 ${
                  showCorrectFeedback
                    ? "border-green-400 bg-green-50 text-green-800 shadow-md"
                    : showWrongFeedback
                    ? "border-red-400 bg-red-50 text-red-800 shadow-md"
                    : isAnswered
                    ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm cursor-pointer text-gray-700"
                }`}
              >
                {/* Letter badge */}
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold shrink-0 ${
                    showCorrectFeedback
                      ? "bg-green-500 text-white"
                      : showWrongFeedback
                      ? "bg-red-500 text-white"
                      : isAnswered
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>

                <span className="flex-1">{option}</span>

                {/* Feedback icons */}
                {showCorrectFeedback && (
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 animate-bounce" />
                )}
                {showWrongFeedback && (
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback message */}
      {isAnswered && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 font-bold ${
            selectedAnswer === question.correctAnswer
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {selectedAnswer === question.correctAnswer ? (
            <>
              <PartyPopper className="w-5 h-5 shrink-0" />
              <span>Bravo ! C&apos;est la bonne réponse ! 🌟</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 shrink-0" />
              <span>
                Oups ! La bonne réponse est :{" "}
                <strong>{question.correctAnswer}</strong>
              </span>
            </>
          )}
        </div>
      )}

      {/* Next button */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-extrabold px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mx-auto block"
          style={{
            backgroundImage: `linear-gradient(135deg, ${lesson.colorFrom}, ${lesson.colorTo})`,
          }}
        >
          {currentQuestion < questions.length - 1
            ? "Question suivante →"
            : "Voir le résultat 🏆"}
        </button>
      )}

      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 1}s`,
              }}
            >
              {["⭐", "✨", "🌟", "💫", "🎉"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
