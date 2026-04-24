"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Scale,
  Droplets,
  Moon,
  HeartHandshake,
  Sun,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Star,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ThumbsUp,
  Info,
  Volume2,
  Sparkles,
  Trophy,
  GraduationCap,
  Quote,
  Home,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  rubriques,
  statutsLegauxIntro,
  statutObligation,
  statutIllicite,
  statutRecommande,
  statutDetestable,
  statutPermis,
  purificationIntro,
  lesAblutions,
  piliersAblutions,
  sunnasAblutions,
  enchainementAblutions,
  priereIntro,
  iqama,
  fatiha,
  sourateIkhlas,
  sourateNasr,
  tashahhudMilieu,
  priereAbraham,
  tashahhudFinal,
  etapesPriere,
  priereDhor,
  cinqPrieres,
  zakatIntro,
  jeuneIntro,
} from "@/lib/content";

// ========================================
// CONSTANTS & MAPPINGS
// ========================================

const iconMap: Record<string, React.ReactNode> = {
  scale: <Scale className="w-8 h-8" />,
  droplets: <Droplets className="w-8 h-8" />,
  moon: <Moon className="w-8 h-8" />,
  "heart-handshake": <HeartHandshake className="w-8 h-8" />,
  sun: <Sun className="w-8 h-8" />,
};

const statutColors: Record<string, string> = {
  obligatoire: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700",
  interdit: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-200 dark:border-red-700",
  recommande: "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-700",
  detestable: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700",
  permis: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-700",
};

const statutIcons: Record<string, React.ReactNode> = {
  obligatoire: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
  interdit: <XCircle className="w-6 h-6 text-red-600" />,
  recommande: <ThumbsUp className="w-6 h-6 text-teal-600" />,
  detestable: <AlertTriangle className="w-6 h-6 text-amber-600" />,
  permis: <Info className="w-6 h-6 text-purple-600" />,
};

// ========================================
// UTILITY COMPONENTS
// ========================================

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (!resolvedTheme) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Changer de thème"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}

function Header({ onHome }: { onHome?: () => void }) {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={onHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Mon Islam Facile
          </span>
        </button>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-700 hidden sm:flex"
          >
            Ecole Malikite
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-emerald-50 dark:bg-gray-900 border-t border-emerald-100 dark:border-emerald-900 py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
          Fait avec &#10084;&#65039; pour les enfants de la Oumma
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Contenu issu de la science islamique authentique, adapte pour les 7-12 ans
        </p>
      </div>
    </footer>
  );
}

function ChildBubble({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-lg">
          &#x1F4A1;
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
          {text}
        </p>
      </div>
    </div>
  );
}

function SectionHero({
  title,
  childExplanation,
  rubrique,
  icon,
}: {
  title: string;
  childExplanation: string;
  rubrique: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-xl">{icon}</div>
          <div>
            <Badge className="bg-white/20 text-white border-0 text-xs mb-1">
              Rubrique {rubrique}
            </Badge>
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 mt-3">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-emerald-50 leading-relaxed">
              {childExplanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArabicBlock({ arabe, traduction, className = "" }: { arabe: string; traduction?: string; className?: string }) {
  return (
    <div className={className}>
      <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-5 mb-3 border border-emerald-100 dark:border-emerald-800">
        <p
          className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 leading-loose text-right font-medium"
          dir="rtl"
        >
          {arabe}
        </p>
      </div>
      {traduction && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mb-1 uppercase tracking-wide">
            Traduction
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line italic">
            {traduction}
          </p>
        </div>
      )}
    </div>
  );
}

// ========================================
// MAIN PAGE COMPONENT
// ========================================

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const goHome = () => {
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (id: string) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleComplete = (id: string) => {
    setCompletedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const progressPercent = (completedSections.length / rubriques.length) * 100;

  // ===================== HOME PAGE =====================
  if (activeSection === null) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Header onHome={goHome} />
        <main className="flex-1">
          {/* Bismillah Header */}
          <section className="bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 text-white py-10 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-10 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
              <div className="absolute bottom-4 right-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Bismillah */}
                <div className="mb-6">
                  <p
                    className="text-3xl md:text-4xl font-bold leading-relaxed"
                    dir="rtl"
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="mt-2 text-emerald-100 text-sm md:text-base">
                    Au nom d&apos;Allah, le Tout Miséricordieux, le Très Miséricordieux
                  </p>
                </div>

                <div className="w-16 h-0.5 bg-white/40 mx-auto my-5 rounded-full" />

                {/* Welcome */}
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  Mon Islam Facile
                </h1>
                <p className="text-base md:text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed">
                  Assalamou&apos;alaykoum — Découvre les bases de ta religion selon
                  l&apos;école Malikite
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs px-3 py-1.5 rounded-full">
                    7-12 ans
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs px-3 py-1.5 rounded-full">
                    Ecole Malikite
                  </Badge>
                </div>
              </motion.div>
            </div>
          </section>

          <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
            {/* Daily Verse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg shadow-emerald-100/50 dark:shadow-emerald-950/20 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <CardTitle className="text-base font-semibold">
                      Verset du jour — La Fâtiha
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-5">
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-5 mb-3 border border-emerald-100 dark:border-emerald-800">
                    <p
                      className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 leading-loose text-right font-medium"
                      dir="rtl"
                    >
                      {fatiha.arabe}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mb-1 uppercase tracking-wide">
                      Traduction
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line italic">
                      {fatiha.traduction}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Daily Wisdom + Imam Malik Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Daily Wisdom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-md shadow-amber-100/50 dark:shadow-amber-950/20 rounded-2xl h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Quote className="w-5 h-5" />
                      <CardTitle className="text-base font-semibold">
                        Sagesse du jour
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-amber-50 dark:bg-amber-950/40 rounded-xl p-4 mb-3 border border-amber-100 dark:border-amber-800">
                      <p
                        className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 leading-loose text-right font-medium"
                        dir="rtl"
                      >
                        طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      &laquo; La recherche du savoir est une obligation pour chaque musulman. &raquo;
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      — Rapporté par Ibn Mâjah
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Imam Malik Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-md shadow-teal-100/50 dark:shadow-teal-950/20 rounded-2xl h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                      <GraduationCap className="w-5 h-5" />
                      <CardTitle className="text-base font-semibold">
                        L&apos;Imâm Mâlik
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 flex items-center justify-center flex-shrink-0 border-2 border-teal-200 dark:border-teal-700">
                        <span className="text-2xl" dir="rtl">
                          م
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                          Mâlik ibn Anas
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          93-179 H / 711-795 J.C. — Médine
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      L&apos;Imâm Mâlik est l&apos;un des quatre grands imams de l&apos;Islam.
                      Il a fondé l&apos;école malikite, suivie par de nombreux musulmans
                      en Afrique du Nord, en Afrique de l&apos;Ouest et en parts d&apos;Afrique
                      de l&apos;Est. Il est surnommé &laquo; l&apos;Imâm de Dar al-Hijra &raquo;
                      (Médine).
                    </p>
                    <Badge variant="outline" className="text-xs border-teal-200 dark:border-teal-700 text-teal-600 dark:text-teal-400">
                      Fondateur de l&apos;école Malikite
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-sm rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                        Ma progression
                      </span>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {completedSections.length} / {rubriques.length}
                    </span>
                  </div>
                  <Progress value={progressPercent} className="h-3" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Topic Cards Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  Choisis ce que tu veux apprendre
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Clique sur un sujet pour découvrir son contenu
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rubriques.map((rub, index) => {
                  const isCompleted = completedSections.includes(rub.id);
                  return (
                    <motion.div
                      key={rub.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card
                        className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-emerald-300 dark:hover:border-emerald-700 group rounded-2xl"
                        onClick={() => goToSection(rub.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                              {iconMap[rub.icon]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {rub.titre}
                              </CardTitle>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {isCompleted && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              )}
                              <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 transition-colors" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            {rub.description}
                          </p>
                          <div className="mt-3">
                            <Badge
                              variant="outline"
                              className="text-xs border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 transition-colors"
                            >
                              Commencer
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ===================== DETAIL PAGE WRAPPER =====================
  const renderDetailPage = (
    sectionId: string,
    rubriqueNum: number,
    title: string,
    childExp: string,
    icon: React.ReactNode,
    content: React.ReactNode
  ) => {
    const isCompleted = completedSections.includes(sectionId);
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Header onHome={goHome} />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={goHome}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Accueil
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleComplete(sectionId)}
              className={
                isCompleted
                  ? "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700"
                  : ""
              }
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Termine
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 mr-1" />
                  Marquer comme termine
                </>
              )}
            </Button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionHero
              title={title}
              childExplanation={childExp}
              rubrique={rubriqueNum}
              icon={icon}
            />
            {content}
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  };

  // ===================== STATUTS LEGAUX =====================
  if (activeSection === "statuts") {
    return renderDetailPage(
      "statuts", 27, statutsLegauxIntro.titre,
      statutsLegauxIntro.explicationEnfant,
      <Scale className="w-10 h-10" />,
      <div className="space-y-6">
        {/* Intro */}
        <Card className="rounded-2xl border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6">
            <ChildBubble text={statutsLegauxIntro.explicationEnfant} />
            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {statutsLegauxIntro.contenu}
            </div>
          </CardContent>
        </Card>

        {/* L'intention */}
        <Card className="rounded-2xl border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-teal-500" />
              L&apos;importance de l&apos;intention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {statutsLegauxIntro.intention}
            </div>
          </CardContent>
        </Card>

        {/* 5 statuts */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Les 5 statuts légaux
          </h3>
          <div className="space-y-4">
            {([
              { data: statutObligation, type: "obligatoire" },
              { data: statutIllicite, type: "interdit" },
              { data: statutRecommande, type: "recommande" },
              { data: statutDetestable, type: "detestable" },
              { data: statutPermis, type: "permis" },
            ] as const).map((item, idx) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`border-2 rounded-2xl ${statutColors[item.type]} overflow-hidden`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      {statutIcons[item.type]}
                      <CardTitle className="text-base">{item.data.titre}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ChildBubble text={item.data.explicationEnfant} />
                    <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {item.data.contenu}
                    </div>
                    {item.data.resumeCategories && (
                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value="details" className="border-0">
                          <AccordionTrigger className="text-sm text-emerald-600 dark:text-emerald-400 hover:no-underline py-2">
                            En savoir plus
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                              {item.data.resumeCategories}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===================== PURIFICATION =====================
  if (activeSection === "purification") {
    return renderDetailPage(
      "purification", 28, purificationIntro.titre,
      purificationIntro.explicationEnfant,
      <Droplets className="w-10 h-10" />,
      <div className="space-y-6">
        {/* Les Ablutions */}
        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Droplets className="w-6 h-6 text-teal-500" />
              {lesAblutions.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChildBubble text={lesAblutions.explicationEnfant} />

            {/* Verset du Coran */}
            <div className="mt-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">
                  Verset du Coran (5:6)
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line italic">
                {lesAblutions.versetCoran}
              </p>
            </div>

            {/* Les 9 étapes */}
            <div className="mt-6">
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="bg-teal-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                  !
                </span>
                Les étapes des ablutions
              </h4>
              <div className="space-y-3">
                {lesAblutions.etapes.map((etape) => (
                  <div
                    key={etape.numero}
                    className="flex gap-3 items-start bg-teal-50/70 dark:bg-teal-950/30 rounded-xl p-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
                      {etape.numero}
                    </div>
                    <div>
                      <h5 className="font-semibold text-teal-800 dark:text-teal-200 text-sm">
                        {etape.titre}
                      </h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
                        {etape.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remarques */}
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="remarques" className="border-0">
                <AccordionTrigger className="text-sm text-amber-600 dark:text-amber-400 hover:no-underline py-2">
                  Remarques importantes
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4">
                    {lesAblutions.remarques}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="coran" className="border-0">
                <AccordionTrigger className="text-sm text-teal-600 dark:text-teal-400 hover:no-underline py-2">
                  Toucher et lire le Coran
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-teal-50 dark:bg-teal-950/30 rounded-xl p-4">
                    {lesAblutions.remarquesCoran}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Piliers des ablutions */}
        <Card className="rounded-2xl border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {piliersAblutions.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChildBubble text={piliersAblutions.explicationEnfant} />
            <div className="mt-4 space-y-3">
              {piliersAblutions.versets.map((v, i) => (
                <div key={i} className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {v}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sunnas des ablutions */}
        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-teal-500" />
              {sunnasAblutions.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChildBubble text={sunnasAblutions.explicationEnfant} />
            <div className="mt-4 space-y-3">
              {sunnasAblutions.versets.map((v, i) => (
                <div key={i} className="bg-teal-50 dark:bg-teal-950/30 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {v}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enchaînement */}
        <Card className="rounded-2xl border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-500" />
              {enchainementAblutions.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {enchainementAblutions.contenu}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ===================== PRIERE =====================
  if (activeSection === "priere") {
    return renderDetailPage(
      "priere", 29, priereIntro.titre,
      priereIntro.explicationEnfant,
      <Moon className="w-10 h-10" />,
      <div className="space-y-6">
        {/* Iqama */}
        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-teal-500" />
              {iqama.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-teal-50 dark:bg-teal-950/40 rounded-xl p-4 mb-4 border border-teal-100 dark:border-teal-800">
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-400 mb-2">
                Formule de l&apos;Iqâma :
              </p>
              <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line font-medium">
                {iqama.formule}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                {iqama.sourceNote}
              </p>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="remarques" className="border-0">
                <AccordionTrigger className="text-sm text-teal-600 dark:text-teal-400 hover:no-underline py-2">
                  Remarques importantes
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-teal-50 dark:bg-teal-950/30 rounded-xl p-4">
                    {iqama.remarques}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Fatiha */}
        <Card className="rounded-2xl border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              {fatiha.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ArabicBlock arabe={fatiha.arabe} traduction={fatiha.traduction} />
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-2">{fatiha.remarqueAmîn}</p>
          </CardContent>
        </Card>

        {/* Sourates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{sourateIkhlas.titre}</CardTitle>
            </CardHeader>
            <CardContent>
              <ArabicBlock arabe={sourateIkhlas.arabe} traduction={sourateIkhlas.traduction} />
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{sourateNasr.titre}</CardTitle>
            </CardHeader>
            <CardContent>
              <ArabicBlock arabe={sourateNasr.arabe} traduction={sourateNasr.traduction} />
            </CardContent>
          </Card>
        </div>

        {/* Tashahhud du milieu */}
        <Card className="rounded-2xl border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              {tashahhudMilieu.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ArabicBlock
              arabe={tashahhudMilieu.arabe}
              className="bg-amber-50 dark:bg-amber-950/40 rounded-xl p-4 border border-amber-200 dark:border-amber-800 mb-3"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">{tashahhudMilieu.explication}</p>
          </CardContent>
        </Card>

        {/* Priere d'Abraham */}
        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-teal-500" />
              {priereAbraham.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ArabicBlock arabe={priereAbraham.arabe} traduction={priereAbraham.traduction} />
          </CardContent>
        </Card>

        {/* Tashahhud Final */}
        <Card className="rounded-2xl border-emerald-300 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/20 ring-2 ring-emerald-200 dark:ring-emerald-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {tashahhudFinal.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700">
              Important
            </Badge>
            <ArabicBlock arabe={tashahhudFinal.arabe} />
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 mt-2">
              {tashahhudFinal.explication}
            </div>
          </CardContent>
        </Card>

        {/* Etapes de la prière */}
        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Moon className="w-6 h-6 text-teal-500" />
              {etapesPriere.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{etapesPriere.introduction}</p>

            <div className="mb-6">
              <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-3 flex items-center gap-2">
                <span className="bg-teal-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">1</span>
                {etapesPriere.premiereRaka.titre}
              </h4>
              <div className="space-y-3">
                {etapesPriere.premiereRaka.etapes.map((etape) => (
                  <div key={etape.numero} className="flex gap-3 items-start bg-teal-50/70 dark:bg-teal-950/30 rounded-xl p-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
                      {etape.numero}
                    </div>
                    <div>
                      <h5 className="font-semibold text-teal-800 dark:text-teal-200 text-sm">{etape.titre}</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{etape.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mb-6">
              <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-3 flex items-center gap-2">
                <span className="bg-teal-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">2</span>
                {etapesPriere.deuxiemeRaka.titre}
              </h4>
              <div className="bg-teal-50/70 dark:bg-teal-950/30 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {etapesPriere.deuxiemeRaka.detail}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priere de Dhor */}
        <Card className="rounded-2xl border-2 border-teal-300 dark:border-teal-700 bg-teal-50/20 dark:bg-teal-950/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-teal-800 dark:text-teal-200">
              <Sparkles className="w-6 h-6 text-teal-500" />
              {priereDhor.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChildBubble text={priereDhor.explicationEnfant} />
            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {priereDhor.contenu}
            </div>
            <div className="mt-6 space-y-4">
              {priereDhor.etapesDetaillees.map((rakat) => (
                <div key={rakat.rakat}>
                  <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-2 flex items-center gap-2">
                    <span className="bg-teal-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                      {rakat.rakat}
                    </span>
                    {rakat.titre}
                  </h4>
                  <div className="space-y-2">
                    {rakat.etapes.map((etape, idx) => (
                      <div key={idx} className="flex gap-2 items-start bg-teal-50/70 dark:bg-teal-950/30 rounded-lg p-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{etape}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Les 5 prières */}
        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Sun className="w-6 h-6 text-teal-500" />
              {cinqPrieres.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cinqPrieres.prieres.map((p, idx) => (
                <Accordion key={idx} type="single" collapsible>
                  <AccordionItem value={`priere-${idx}`} className="border rounded-xl px-3">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{p.nom}</span>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{p.rakat}</Badge>
                            <Badge variant="outline" className="text-xs">{p.voix}</Badge>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line pb-2 pl-11">
                        {p.detail}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            <Separator className="my-4" />

            <Accordion type="single" collapsible>
              <AccordionItem value="notes" className="border-0">
                <AccordionTrigger className="text-sm text-teal-600 dark:text-teal-400 hover:no-underline py-2">
                  Notes sur la voix et la position assise
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-teal-50 dark:bg-teal-950/30 rounded-xl p-4">
                    {cinqPrieres.notesVoix}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mt-2">
                    {cinqPrieres.positionAssise}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ===================== ZAKAT =====================
  if (activeSection === "zakat") {
    return renderDetailPage(
      "zakat", 30, zakatIntro.titre,
      zakatIntro.explicationEnfant,
      <HeartHandshake className="w-10 h-10" />,
      <div className="space-y-6">
        <Card className="rounded-2xl border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6">
            <ChildBubble text={zakatIntro.explicationEnfant} />
            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {zakatIntro.contenu}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-500" />
              Le Niçâb (minimum imposable)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {zakatIntro.nisab}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Exemples de calcul
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {zakatIntro.exemplesCalcul}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-purple-500" />
              À qui donner la Zakât ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {zakatIntro.aQuiDonner}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-500" />
              Spécificités de l&apos;école malikite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {zakatIntro.specificsMalikite}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ===================== JEUNE =====================
  if (activeSection === "jeune") {
    return renderDetailPage(
      "jeune", 31, jeuneIntro.titre,
      jeuneIntro.explicationEnfant,
      <Sun className="w-10 h-10" />,
      <div className="space-y-6">
        <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <ChildBubble text={jeuneIntro.explicationEnfant} />
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center">
              Le contenu détaillé sera ajouté progressivement.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
