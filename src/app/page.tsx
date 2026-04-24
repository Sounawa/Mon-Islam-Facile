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
  RefreshCw,
  Search,
  X,
  BookMarked,
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
  glossaire,
  quizzes,
  quizVF,
  quizAssociation,
} from "@/lib/content";
import type { QuizQuestion, AssociationPair } from "@/lib/content";

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
// RUBRIQUE COLOR SYSTEM
// ========================================

const rubriqueColors: Record<string, { gradient: string; bg: string; bgLight: string; border: string; text: string; textLight: string; badge: string; iconBg: string; iconText: string; hoverBorder: string; cardBg: string; quizBorder: string; quizBg: string; arabicBg: string; arabicBorder: string }> = {
  statuts: {
    gradient: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    bgLight: "bg-blue-100/50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-600 dark:text-blue-400",
    textLight: "text-blue-500",
    badge: "text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-700",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconText: "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
    cardBg: "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20",
    quizBorder: "border-blue-300 dark:border-blue-700",
    quizBg: "bg-blue-50/50 dark:bg-blue-950/20",
    arabicBg: "bg-blue-50 dark:bg-blue-950/40",
    arabicBorder: "border-blue-200 dark:border-blue-800",
  },
  purification: {
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-50 dark:bg-teal-950/20",
    bgLight: "bg-teal-100/50 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800",
    text: "text-teal-600 dark:text-teal-400",
    textLight: "text-teal-500",
    badge: "text-teal-600 border-teal-200 dark:text-teal-400 dark:border-teal-700",
    iconBg: "bg-teal-100 dark:bg-teal-900",
    iconText: "text-teal-600 dark:text-teal-400",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-700",
    cardBg: "bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-950/20 dark:to-cyan-950/20",
    quizBorder: "border-teal-300 dark:border-teal-700",
    quizBg: "bg-teal-50/50 dark:bg-teal-950/20",
    arabicBg: "bg-teal-50 dark:bg-teal-950/40",
    arabicBorder: "border-teal-200 dark:border-teal-800",
  },
  priere: {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    bgLight: "bg-amber-100/50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-600 dark:text-amber-400",
    textLight: "text-amber-500",
    badge: "text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-700",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    iconText: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    cardBg: "bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20",
    quizBorder: "border-amber-300 dark:border-amber-700",
    quizBg: "bg-amber-50/50 dark:bg-amber-950/20",
    arabicBg: "bg-amber-50 dark:bg-amber-950/40",
    arabicBorder: "border-amber-200 dark:border-amber-800",
  },
  zakat: {
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    bgLight: "bg-rose-100/50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800",
    text: "text-rose-600 dark:text-rose-400",
    textLight: "text-rose-500",
    badge: "text-rose-600 border-rose-200 dark:text-rose-400 dark:border-rose-700",
    iconBg: "bg-rose-100 dark:bg-rose-900",
    iconText: "text-rose-600 dark:text-rose-400",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-700",
    cardBg: "bg-gradient-to-br from-rose-50/50 to-pink-50/50 dark:from-rose-950/20 dark:to-pink-950/20",
    quizBorder: "border-rose-300 dark:border-rose-700",
    quizBg: "bg-rose-50/50 dark:bg-rose-950/20",
    arabicBg: "bg-rose-50 dark:bg-rose-950/40",
    arabicBorder: "border-rose-200 dark:border-rose-800",
  },
  jeune: {
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    bgLight: "bg-orange-100/50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-600 dark:text-orange-400",
    textLight: "text-orange-500",
    badge: "text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-700",
    iconBg: "bg-orange-100 dark:bg-orange-900",
    iconText: "text-orange-600 dark:text-orange-400",
    hoverBorder: "hover:border-orange-300 dark:hover:border-orange-700",
    cardBg: "bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20",
    quizBorder: "border-orange-300 dark:border-orange-700",
    quizBg: "bg-orange-50/50 dark:bg-orange-950/20",
    arabicBg: "bg-orange-50 dark:bg-orange-950/40",
    arabicBorder: "border-orange-200 dark:border-orange-800",
  },
};

// ========================================
// DAILY VERSES DATABASE
// ========================================

const dailyVerses = [
  {
    arabe: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.",
    source: "Al-Fâtiha 1:1",
  },
  {
    arabe: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    fr: "Louange à Allah, Seigneur des mondes.",
    source: "Al-Fâtiha 1:2",
  },
  {
    arabe: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    fr: "C'est Toi que nous adorons, et c'est Toi dont nous implorons le secours.",
    source: "Al-Fâtiha 1:5",
  },
  {
    arabe: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    fr: "Dirige-nous vers le sentier droit.",
    source: "Al-Fâtiha 1:6",
  },
  {
    arabe: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    fr: "Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même.",
    source: "Al-Baqara 2:255 (Ayat al-Kursî)",
  },
  {
    arabe: "وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا",
    fr: "Et quiconque craint Allah, Il lui donnera une issue favorable.",
    source: "At-Talâq 65:2",
  },
  {
    arabe: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    fr: "Et quiconque place sa confiance en Allah, Il lui suffit.",
    source: "At-Talâq 65:3",
  },
  {
    arabe: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    fr: "Avec la difficulté vient certes la facilité.",
    source: "Ash-Sharh 94:6",
  },
  {
    arabe: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    fr: "Oui, avec la difficulté vient la facilité.",
    source: "Ash-Sharh 94:6",
  },
  {
    arabe: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
    fr: "Et ton Seigneur te donnera, et tu seras satisfait.",
    source: "Ad-Duha 93:5",
  },
  {
    arabe: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    fr: "Dis : Lui, Allah est Un.",
    source: "Al-Ikhlâs 112:1",
  },
  {
    arabe: "اللَّهُ الصَّمَدُ",
    fr: "Allah, Le Seul à être imploré pour ce que nous désirons.",
    source: "Al-Ikhlâs 112:2",
  },
  {
    arabe: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    fr: "Il n'a pas engendré et Il n'a pas été engendré.",
    source: "Al-Ikhlâs 112:3",
  },
  {
    arabe: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    fr: "Et nul ne Lui est égal.",
    source: "Al-Ikhlâs 112:4",
  },
  {
    arabe: "وَقُلْ رَبِّ زِدْنِي عِلْمًا",
    fr: "Et dis : Ô mon Seigneur, accrois mes connaissances.",
    source: "Tâ-Hâ 20:114",
  },
  {
    arabe: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    fr: "Seigneur, donne-nous le bien ici-bas et dans l'au-delà, et préserve-nous du châtiment du Feu.",
    source: "Al-Baqara 2:201",
  },
  {
    arabe: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ إِلَّا لِيَعْبُدُونِ",
    fr: "Je n'ai créé les djinns et les hommes que pour qu'ils M'adorent.",
    source: "Adh-Dhâriyât 51:56",
  },
  {
    arabe: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    fr: "Certes Allah est avec les patients.",
    source: "Al-Baqara 2:153",
  },
  {
    arabe: "وَأَحْسِنُوا إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
    fr: "Et faites le bien, car Allah aime les bienfaiteurs.",
    source: "Al-Baqara 2:195",
  },
  {
    arabe: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
    fr: "Invoquez-Moi, Je vous répondrai.",
    source: "Ghâfir 40:60",
  },
  {
    arabe: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    fr: "Souvenez-vous de Moi, Je Me souviendrai de vous.",
    source: "Al-Baqara 2:152",
  },
  {
    arabe: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ",
    fr: "La prière empêche les actes indécents et le blâmable.",
    source: "Al-'Ankabût 29:45",
  },
  {
    arabe: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِنْ مُدَّكِرٍ",
    fr: "Nous avons rendu le Coran facile pour le rappel. Y a-t-il donc quelqu'un pour réfléchir ?",
    source: "Al-Qamar 54:17",
  },
  {
    arabe: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    fr: "Béni soit Celui dans la main Duquel est la royauté, et qui est Omnipotent.",
    source: "Al-Mulk 67:1",
  },
  {
    arabe: "وَأَوْصَانِي بِالصَّلَاةِ وَالزَّكَاةِ مَا دُمْتُ حَيًّا",
    fr: "Et il m'a recommandé la prière et la Zakât tant que je serai vivant.",
    source: "Maryam 19:31",
  },
  {
    arabe: "وَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ",
    fr: "Et implorez le pardon de votre Seigneur, puis repentez-vous à Lui.",
    source: "Hûd 11:3",
  },
  {
    arabe: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِنَ الْمُحْسِنِينَ",
    fr: "La miséricorde d'Allah est proche des bienfaisants.",
    source: "Al-A'râf 7:56",
  },
  {
    arabe: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقَوَىٰ",
    fr: "Et entraidez-vous dans l'accomplissement des bonnes œuvres et de la piété.",
    source: "Al-Mâ'ida 5:2",
  },
  {
    arabe: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
    fr: "Ne vous laissez pas abattre, ne vous affligez pas alors que vous êtes les supérieurs, si vous êtes de vrais croyants.",
    source: "Âl 'Imrân 3:139",
  },
  {
    arabe: "شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ",
    fr: "Allah témoigne qu'il n'y a de divinité que Lui.",
    source: "Âl 'Imrân 3:18",
  },
];

function getDailyVerse() {
  // Use UTC date string to be deterministic across server/client
  const today = new Date();
  const dayStr = `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`;
  // Simple hash to get a stable index
  let hash = 0;
  for (let i = 0; i < dayStr.length; i++) {
    hash = (hash * 31 + dayStr.charCodeAt(i)) | 0;
  }
  return dailyVerses[Math.abs(hash) % dailyVerses.length];
}

// ========================================
// UTILITY COMPONENTS
// ========================================

function DailyVerseCard() {
  const [verse, setVerse] = useState(dailyVerses[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Set the daily verse on client mount to avoid hydration mismatch
  useEffect(() => {
    setVerse(getDailyVerse()); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const refreshVerse = () => {
    setIsAnimating(true);
    setTimeout(() => {
      let next;
      do {
        next = dailyVerses[Math.floor(Math.random() * dailyVerses.length)];
      } while (next.source === verse.source && dailyVerses.length > 1);
      setVerse(next);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="border-0 shadow-lg shadow-emerald-100/50 dark:shadow-emerald-950/20 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <CardTitle className="text-base font-semibold">
                🕌 Verset du jour
              </CardTitle>
            </div>
            <button
              onClick={refreshVerse}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Autre verset"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={verse.source}
              initial={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 10 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-6 mb-3 border border-emerald-100 dark:border-emerald-800">
                <p
                  className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 leading-loose text-right font-medium"
                  dir="rtl"
                >
                  {verse.arabe}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  {verse.fr}
                </p>
                <p className="text-xs text-emerald-500 dark:text-emerald-400 font-semibold mt-2">
                  {verse.source}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Changer de thème"
      suppressHydrationWarning
    >
      {!mounted ? (
        <div className="w-5 h-5" />
      ) : resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}

function Header({ onHome, onGlossary }: { onHome?: () => void; onGlossary?: () => void }) {
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
          <button
            onClick={onGlossary}
            className="p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors text-emerald-600 dark:text-emerald-400"
            aria-label="Glossaire"
          >
            <BookMarked className="w-5 h-5" />
          </button>
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
  colorId = "statuts",
}: {
  title: string;
  childExplanation: string;
  rubrique: number;
  icon: React.ReactNode;
  colorId?: string;
}) {
  const c = rubriqueColors[colorId] || rubriqueColors.statuts;
  return (
    <div className="mb-8">
      <div className={`bg-gradient-to-r ${c.gradient} text-white rounded-2xl p-6 mb-4`}>
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
            <p className="text-sm text-white/90 leading-relaxed">
              {childExplanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArabicBlock({ arabe, traduction, className = "", colorId = "statuts" }: { arabe: string; traduction?: string; className?: string; colorId?: string }) {
  const c = rubriqueColors[colorId] || rubriqueColors.statuts;
  return (
    <div className={className}>
      <div className={`${c.arabicBg} rounded-2xl p-5 mb-3 border-l-4 ${c.arabicBorder} shadow-sm`}>
        <p
          className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 leading-loose text-right font-bold"
          dir="rtl"
        >
          {arabe}
        </p>
      </div>
      {traduction && (
        <div className={`${c.bgLight} rounded-xl p-3`}>
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

function ShortText({ short, full }: { short: string; full: string }) {
  return (
    <div>
      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
        {short}
      </div>
      <Accordion type="single" collapsible className="mt-3">
        <AccordionItem value="full" className="border-0">
          <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
            📖 Texte complet
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
              {full}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// ========================================
// GLOSSARY MODAL
// ========================================

function GlossaryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = glossaire.filter(
    (item) =>
      item.terme.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg max-h-[80vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-emerald-200 dark:border-emerald-800 z-[101] overflow-hidden flex flex-col"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Glossaire</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200" />
                <input
                  type="text"
                  placeholder="Chercher un terme..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder:text-emerald-100 text-sm outline-none focus:ring-2 focus:ring-white/30"
                  autoFocus
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-3">
              {filtered.length === 0 ? (
                <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
                  Aucun terme trouvé
                </p>
              ) : (
                filtered.map((item, idx) => (
                  <motion.div
                    key={item.terme}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800"
                  >
                    <h3 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-1" dir="rtl">
                      {item.terme}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.definition}
                    </p>
                    <div className="mt-2 flex items-start gap-1.5 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-2 border border-amber-100 dark:border-amber-800">
                      <span className="text-xs">💡</span>
                      <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed italic">
                        {item.exemple}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ========================================
// MINI QUIZ COMPONENT
// ========================================

function MiniQuiz({ sectionId }: { sectionId: string }) {
  const quizData = quizzes[sectionId];
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  if (!quizData) return null;

  const questions = quizData.questions;
  const question: QuizQuestion = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  const percent = (score / questions.length) * 100;
  const stars = percent >= 100 ? 3 : percent >= 75 ? 2 : percent >= 50 ? 1 : 0;

  return (
    <Card className="rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-500" />
          {quizData.titre}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!finished ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Question {currentQ + 1} / {questions.length}
              </span>
              <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2 w-24" />
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
              {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((opt, idx) => {
                let btnClass = "border-2 rounded-xl p-3 text-sm text-left transition-all w-full ";
                if (!answered) {
                  btnClass += "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 cursor-pointer";
                } else if (idx === question.correctIndex) {
                  btnClass += "border-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200";
                } else if (idx === selected) {
                  btnClass += "border-red-400 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200";
                } else {
                  btnClass += "border-gray-200 dark:border-gray-700 opacity-50";
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={btnClass}
                    disabled={answered}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                      {answered && idx === question.correctIndex && (
                        <span className="ml-auto">✅</span>
                      )}
                      {answered && idx === selected && idx !== question.correctIndex && (
                        <span className="ml-auto">❌</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-3"
              >
                <div className={`text-sm p-3 rounded-xl ${selected === question.correctIndex ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800" : "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800"}`}>
                  {selected === question.correctIndex
                    ? ` Bravo ! ${question.explication || ""}`
                    : `La bonne réponse était : ${question.options[question.correctIndex]}. ${question.explication || ""}`}
                </div>
                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                >
                  {currentQ < questions.length - 1 ? "Question suivante →" : "Voir le résultat 🏆"}
                </Button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4 space-y-4"
          >
            <div className="text-4xl">
              {"⭐".repeat(stars)}{"☆".repeat(3 - stars)}
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {score} / {questions.length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stars === 3
                  ? "Parfait ! Tu maîtrises ce sujet ! 🎉"
                  : stars === 2
                    ? "Très bien ! Continue comme ça ! 💪"
                    : stars === 1
                      ? "Pas mal ! Relis la leçon et réessaie 📖"
                      : "Essaie encore après avoir relu le cours ! 📚"}
              </p>
            </div>
            <Button
              onClick={handleRestart}
              variant="outline"
              className="border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Recommencer
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

// ========================================
// VRAI/FAUX QUIZ COMPONENT
// ========================================

function VraiFauxQuiz({ sectionId }: { sectionId: string }) {
  const data = quizVF?.[sectionId];
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!data) return null;

  const question = data.questions[currentQ];
  const handleAnswer = (reponse: boolean) => {
    if (answered) return;
    setSelected(reponse);
    setAnswered(true);
    if (reponse === question.reponse) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < data.questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setSelected(null); setScore(0); setFinished(false); setAnswered(false);
  };

  const percent = (score / data.questions.length) * 100;
  const stars = percent >= 100 ? 3 : percent >= 75 ? 2 : percent >= 50 ? 1 : 0;

  return (
    <Card className="rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-700 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-500" />
          {data.titre}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!finished ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Question {currentQ + 1} / {data.questions.length}
              </span>
              <Progress value={((currentQ + 1) / data.questions.length) * 100} className="h-2 w-24" />
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
              {question.affirmation}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAnswer(true)}
                disabled={answered}
                className={`p-4 rounded-xl text-sm font-bold transition-all border-2 ${
                  !answered ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer text-emerald-700 dark:text-emerald-300"
                  : answered && question.reponse === true ? "border-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-400"
                  : "border-gray-200 dark:border-gray-700 opacity-50"
                }`}
              >
                ✓ Vrai
              </button>
              <button
                onClick={() => handleAnswer(false)}
                disabled={answered}
                className={`p-4 rounded-xl text-sm font-bold transition-all border-2 ${
                  !answered ? "border-red-300 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 cursor-pointer text-red-700 dark:text-red-300"
                  : answered && question.reponse === false ? "border-red-400 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 ring-2 ring-red-400"
                  : "border-gray-200 dark:border-gray-700 opacity-50"
                }`}
              >
                ✗ Faux
              </button>
            </div>
            {answered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
                <div className={`text-sm p-3 rounded-xl ${selected === question.reponse ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800" : "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800"}`}>
                  {selected === question.reponse ? `Bravo ! ${question.explication}` : `Faux ! ${question.explication}`}
                </div>
                <Button onClick={handleNext} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                  {currentQ < data.questions.length - 1 ? "Question suivante →" : "Voir le résultat 🏆"}
                </Button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4 space-y-4">
            <div className="text-4xl">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score} / {data.questions.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stars === 3 ? "Parfait ! Tu maîtrises ce sujet ! 🎉" : stars === 2 ? "Très bien ! Continue comme ça ! 💪" : stars === 1 ? "Pas mal ! Relis la leçon et réessaie 📖" : "Essaie encore après avoir relu le cours ! 📚"}
              </p>
            </div>
            <Button onClick={handleRestart} variant="outline" className="border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400">
              <RefreshCw className="w-4 h-4 mr-1" /> Recommencer
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

// ========================================
// ASSOCIATION QUIZ COMPONENT
// ========================================

function AssociationQuiz() {
  const { titre, paires } = quizAssociation;
  const pairesList = paires as AssociationPair[];

  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>(() =>
    pairesList.map((p) => p.definition)
  );
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [selectedTerme, setSelectedTerme] = useState<string | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  // Shuffle only on client after mount to avoid hydration mismatch
  useEffect(() => {
    const shuffled = [...pairesList.map((p) => p.definition)].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShuffledDefinitions(shuffled);
  }, []);

  if (pairesList.length === 0) return null;

  const handleTermeClick = (terme: string) => {
    if (matched[terme]) return;
    setSelectedTerme(terme);
    setErrors((prev) => { const next = new Set(prev); next.delete(terme); return next; });
  };

  const handleDefClick = (def: string) => {
    if (!selectedTerme) return;
    const correct = pairesList.find((p) => p.terme === selectedTerme);
    if (correct && correct.definition === def) {
      setMatched((prev) => ({ ...prev, [selectedTerme]: def }));
    } else {
      setErrors((prev) => new Set(prev).add(selectedTerme));
    }
    setSelectedTerme(null);
  };

  const restart = () => {
    const defs = [...pairesList.map((p) => p.definition)].sort(() => Math.random() - 0.5);
    setShuffledDefinitions(defs);
    setMatched({});
    setSelectedTerme(null);
    setErrors(new Set());
  };

  const isComplete = Object.keys(matched).length === pairesList.length;

  return (
    <Card className="rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-700 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-purple-500" />
          {titre}
        </CardTitle>
        <p className="text-xs text-gray-500 dark:text-gray-400">Clique sur un terme, puis clique sur sa définition</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isComplete ? (
          <>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Termes arabes</p>
              <div className="flex flex-wrap gap-2">
                {pairesList.map((p) => {
                  const isMatched = !!matched[p.terme];
                  const isSelected = selectedTerme === p.terme;
                  const isError = errors.has(p.terme);
                  return (
                    <button
                      key={p.terme}
                      onClick={() => handleTermeClick(p.terme)}
                      disabled={isMatched}
                      className={`px-3 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                        isMatched ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 opacity-60"
                        : isSelected ? "bg-purple-100 dark:bg-purple-900/50 border-purple-400 dark:border-purple-600 text-purple-700 dark:text-purple-300 ring-2 ring-purple-400"
                        : isError ? "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 animate-pulse"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {p.terme}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Définitions</p>
              <div className="flex flex-wrap gap-2">
                {shuffledDefinitions.map((def) => {
                  const isMatched = Object.values(matched).includes(def);
                  return (
                    <button
                      key={def}
                      onClick={() => handleDefClick(def)}
                      disabled={isMatched}
                      className={`px-3 py-2 rounded-xl text-sm transition-all border-2 ${
                        isMatched ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 opacity-60"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {def}
                    </button>
                  );
                })}
              </div>
            </div>
            <Button onClick={restart} variant="outline" className="w-full border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400">
              <RefreshCw className="w-4 h-4 mr-1" /> Recommencer
            </Button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4 space-y-4">
            <div className="text-4xl">🏆</div>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">Bravo ! Tu as tout associé !</p>
            <Button onClick={restart} variant="outline" className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400">
              <RefreshCw className="w-4 h-4 mr-1" /> Recommencer
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

// ========================================
// MAIN PAGE COMPONENT
// ========================================

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [revisionMode, setRevisionMode] = useState(false);
  const [activeBilan, setActiveBilan] = useState(false);

  // Load progress from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("islam-facile-progress");
      if (saved) {
        setCompletedSections(JSON.parse(saved)); // eslint-disable-line react-hooks/set-state-in-effect
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("islam-facile-progress", JSON.stringify(completedSections));
    } catch {
      // ignore
    }
  }, [completedSections]);

  const goHome = () => {
    setActiveSection(null);
    setActiveBilan(false);
    setRevisionMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (id: string) => {
    setActiveSection(id);
    setActiveBilan(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleComplete = (id: string) => {
    setCompletedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const progressPercent = (completedSections.length / rubriques.length) * 100;

  // ===================== HOME PAGE =====================
  if (activeSection === null && !activeBilan) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Header onHome={goHome} onGlossary={() => setGlossaryOpen(true)} />
        <GlossaryModal open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
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
                  Découvre les bases de ta religion selon
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
            <DailyVerseCard />

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
                        <GraduationCap className="w-7 h-7 text-teal-600 dark:text-teal-400" />
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

            {/* Quiz Bilan Card */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <Card
                className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-amber-300 dark:hover:border-amber-700 group rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20"
                onClick={() => setActiveBilan(true)}
              >
                <CardContent className="pt-5 pb-5 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Quiz Bilan</CardTitle>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Teste toutes tes connaissances sur les 5 rubriques !</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Association Quiz on Home */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.57 }}>
              <AssociationQuiz />
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
                  const rc = rubriqueColors[rub.id];
                  return (
                    <motion.div
                      key={rub.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card
                        className={`cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 border-transparent ${rc?.hoverBorder || "hover:border-emerald-300 dark:hover:border-emerald-700"} group rounded-2xl ${rc?.cardBg || ""}`}
                        onClick={() => goToSection(rub.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${rc?.iconBg || "bg-emerald-100 dark:bg-emerald-900"} ${rc?.iconText || "text-emerald-600 dark:text-emerald-400"} group-hover:opacity-80 transition-colors`}>
                              {iconMap[rub.icon]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className={`text-sm leading-tight ${rc?.text || "group-hover:text-emerald-600 dark:group-hover:text-emerald-400"} transition-colors`}>
                                {rub.titre}
                              </CardTitle>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {isCompleted && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              )}
                              <ChevronRight className={`w-5 h-5 text-gray-300 dark:text-gray-600 ${rc?.text || "group-hover:text-emerald-500"} transition-colors`} />
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
                              className={`text-xs ${rc?.badge || "border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400"} group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 transition-colors`}
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

  // ===================== BILAN QUIZ VIEW =====================
  if (activeBilan) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Header onHome={goHome} onGlossary={() => setGlossaryOpen(true)} />
        <GlossaryModal open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <button onClick={() => setActiveBilan(false)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-4">
              <ChevronLeft className="w-4 h-4" /> Retour
            </button>
            <MiniQuiz sectionId="bilan" />
          </motion.div>
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
    colorId: string,
    content: React.ReactNode
  ) => {
    const isCompleted = completedSections.includes(sectionId);
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Header onHome={goHome} onGlossary={() => setGlossaryOpen(true)} />
        <GlossaryModal open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <button onClick={goHome} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <ChevronLeft className="w-4 h-4" />
              Retour
            </button>
            <button
              onClick={() => setRevisionMode(!revisionMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${revisionMode ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-700" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700"}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {revisionMode ? "Mode complet" : "Mode révision"}
            </button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionHero
              title={title}
              childExplanation={childExp}
              rubrique={rubriqueNum}
              icon={icon}
              colorId={colorId}
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
      "statuts",
      <div className="space-y-6">
        {/* Intro */}
        <Card className="rounded-2xl border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <ChildBubble text={statutsLegauxIntro.explicationEnfant} />
            {!revisionMode && (
              <div className="mt-4">
                <ShortText short={statutsLegauxIntro.resumeEnfant} full={statutsLegauxIntro.contenu} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* L'intention */}
        <Card className="rounded-2xl border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              L&apos;importance de l&apos;intention
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!revisionMode && (
              <ShortText short={statutsLegauxIntro.resumeIntention} full={statutsLegauxIntro.intention} />
            )}
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
                    {!revisionMode && (
                      <div className="mt-3">
                        <ShortText short={item.data.resumeEnfant} full={item.data.contenu} />
                      </div>
                    )}
                    {!revisionMode && item.data.resumeCategories && (
                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value="details" className="border-0">
                          <AccordionTrigger className="text-sm text-blue-600 dark:text-blue-400 hover:no-underline py-2">
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
        <div className="mt-8 space-y-6">
          <VraiFauxQuiz sectionId="statuts" />
          <MiniQuiz sectionId="statuts" />
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
      "purification",
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
            {!revisionMode && (
              <div className="mt-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  <span className="font-semibold text-teal-700 dark:text-teal-400 text-sm">
                    Verset du Coran (5:6)
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line italic">
                  {lesAblutions.versetCoran}
                </p>
              </div>
            )}

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
                        {etape.detailCourt || etape.detail}
                      </p>
                      {!revisionMode && etape.detail && etape.detailCourt && etape.detail !== etape.detailCourt && (
                        <Accordion type="single" collapsible className="mt-1">
                          <AccordionItem value="full" className="border-0">
                            <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                              Détails
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                                {etape.detail}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remarques */}
            {!revisionMode && (
              <div className="mt-6 space-y-3">
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {lesAblutions.resumeRemarques}
                  </div>
                  <Accordion type="single" collapsible className="mt-2">
                    <AccordionItem value="remarques-full" className="border-0">
                      <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                        📖 Texte complet
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                          {lesAblutions.remarques}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="bg-teal-50 dark:bg-teal-950/30 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {lesAblutions.resumeRemarquesCoran}
                  </div>
                  <Accordion type="single" collapsible className="mt-2">
                    <AccordionItem value="coran-full" className="border-0">
                      <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                        📖 Texte complet
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                          {lesAblutions.remarquesCoran}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Piliers des ablutions */}
        <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-500" />
              {piliersAblutions.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChildBubble text={piliersAblutions.explicationEnfant} />
            {!revisionMode && (
              <div className="mt-4">
                <ShortText short={piliersAblutions.resumeEnfant} full={piliersAblutions.versets.join('\n\n')} />
              </div>
            )}
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
            {!revisionMode && (
              <div className="mt-4">
                <ShortText short={sunnasAblutions.resumeEnfant} full={sunnasAblutions.versets.join('\n\n')} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enchaînement */}
        {!revisionMode && (
          <Card className="rounded-2xl border-teal-200 dark:border-teal-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-teal-500" />
                {enchainementAblutions.titre}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ShortText short={enchainementAblutions.resumeEnfant} full={enchainementAblutions.contenu} />
            </CardContent>
          </Card>
        )}
        <div className="mt-8 space-y-6">
          <VraiFauxQuiz sectionId="purification" />
          <MiniQuiz sectionId="purification" />
        </div>
      </div>
    );
  }

  // ===================== PRIERE =====================
  if (activeSection === "priere") {
    return renderDetailPage(
      "priere", 29, priereIntro.titre,
      priereIntro.explicationEnfant,
      <Moon className="w-10 h-10" />,
      "priere",
      <div className="space-y-6">
        {/* Iqama */}
        <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-amber-500" />
              {iqama.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 dark:bg-amber-950/40 rounded-xl p-4 mb-4 border border-amber-100 dark:border-amber-800">
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
                Formule de l&apos;Iqâma :
              </p>
              <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line font-medium">
                {iqama.formule}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                {iqama.sourceNote}
              </p>
            </div>
            <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-xl p-4">
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {iqama.resumeEnfant}
              </div>
              {!revisionMode && (
                <Accordion type="single" collapsible className="mt-2">
                  <AccordionItem value="remarques" className="border-0">
                    <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                      📖 Texte complet
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                        {iqama.remarques}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fatiha */}
        <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              {fatiha.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ArabicBlock arabe={fatiha.arabe} traduction={fatiha.traduction} colorId="priere" />
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-2">{fatiha.remarqueAmîn}</p>
          </CardContent>
        </Card>

        {/* Sourates */}
        {!revisionMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{sourateIkhlas.titre}</CardTitle>
              </CardHeader>
              <CardContent>
                <ArabicBlock arabe={sourateIkhlas.arabe} traduction={sourateIkhlas.traduction} colorId="priere" />
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{sourateNasr.titre}</CardTitle>
              </CardHeader>
              <CardContent>
                <ArabicBlock arabe={sourateNasr.arabe} traduction={sourateNasr.traduction} colorId="priere" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tashahhud du milieu */}
        {!revisionMode && (
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
                colorId="priere"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">{tashahhudMilieu.explication}</p>
            </CardContent>
          </Card>
        )}

        {/* Priere d'Abraham */}
        {!revisionMode && (
          <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-amber-500" />
                {priereAbraham.titre}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ArabicBlock arabe={priereAbraham.arabe} traduction={priereAbraham.traduction} colorId="priere" />
            </CardContent>
          </Card>
        )}

        {/* Tashahhud Final */}
        {!revisionMode && (
          <Card className="rounded-2xl border-amber-300 dark:border-amber-700 bg-amber-50/30 dark:bg-amber-950/20 ring-2 ring-amber-200 dark:ring-amber-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                {tashahhudFinal.titre}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="mb-3 bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700">
                Important
              </Badge>
              <ArabicBlock arabe={tashahhudFinal.arabe} colorId="priere" />
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3 mt-2">
                {tashahhudFinal.explication}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Etapes de la prière */}
        <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Moon className="w-6 h-6 text-amber-500" />
              {etapesPriere.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{etapesPriere.introduction}</p>

            <div className="mb-6">
              <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                <span className="bg-amber-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">1</span>
                {etapesPriere.premiereRaka.titre}
              </h4>
              <div className="space-y-3">
                {etapesPriere.premiereRaka.etapes.map((etape) => (
                  <div key={etape.numero} className="flex gap-3 items-start bg-amber-50/70 dark:bg-amber-950/30 rounded-xl p-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                      {etape.numero}
                    </div>
                    <div>
                      <h5 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">{etape.titre}</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{etape.detailCourt || etape.detail}</p>
                      {!revisionMode && etape.detail && etape.detailCourt && etape.detail !== etape.detailCourt && (
                        <Accordion type="single" collapsible className="mt-1">
                          <AccordionItem value="full" className="border-0">
                            <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                              Détails
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                                {etape.detail}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!revisionMode && (
              <>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                <div className="mb-6">
                  <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <span className="bg-amber-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">2</span>
                    {etapesPriere.deuxiemeRaka.titre}
                  </h4>
                  <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-xl p-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {etapesPriere.deuxiemeRaka.detailCourt || etapesPriere.deuxiemeRaka.detail}
                    </p>
                    {etapesPriere.deuxiemeRaka.detail && etapesPriere.deuxiemeRaka.detailCourt && etapesPriere.deuxiemeRaka.detail !== etapesPriere.deuxiemeRaka.detailCourt && (
                      <Accordion type="single" collapsible className="mt-2">
                        <AccordionItem value="full" className="border-0">
                          <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                            Détails
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                              {etapesPriere.deuxiemeRaka.detail}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Priere de Dhor */}
        <Card className="rounded-2xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50/20 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <Sparkles className="w-6 h-6 text-amber-500" />
              {priereDhor.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChildBubble text={priereDhor.explicationEnfant} />
            {!revisionMode && (
              <div className="mt-4">
                <ShortText short={priereDhor.resumeEnfant} full={priereDhor.contenu} />
              </div>
            )}
            {!revisionMode && (priereDhor as Record<string, unknown>).exemplesEnfant && (
              <div className="mt-4">
                <ChildBubble text={(priereDhor as Record<string, unknown>).exemplesEnfant as string} />
              </div>
            )}
            {!revisionMode && (
              <div className="mt-6 space-y-4">
                {priereDhor.etapesDetaillees.map((rakat) => (
                  <div key={rakat.rakat}>
                    <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                      <span className="bg-amber-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                        {rakat.rakat}
                      </span>
                      {rakat.titre}
                    </h4>
                    <div className="space-y-2">
                      {rakat.etapes.map((etape, idx) => (
                        <div key={idx} className="flex gap-2 items-start bg-amber-50/70 dark:bg-amber-950/30 rounded-lg p-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{etape}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Les 5 prières */}
        <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" />
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
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm flex-shrink-0">
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
                        {p.detailCourt || p.detail}
                      </div>
                      {!revisionMode && p.detail && p.detailCourt && p.detail !== p.detailCourt && (
                        <Accordion type="single" collapsible className="pl-11">
                          <AccordionItem value="full" className="border-0">
                            <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                              📖 Texte complet
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                                {p.detail}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            {!revisionMode && (
              <div className="my-4 space-y-3">
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {cinqPrieres.resumeVoix}
                  </div>
                  <Accordion type="single" collapsible className="mt-2">
                    <AccordionItem value="voix-full" className="border-0">
                      <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                        📖 Texte complet
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                          {cinqPrieres.notesVoix}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {cinqPrieres.resumePosition}
                  </div>
                  <Accordion type="single" collapsible className="mt-2">
                    <AccordionItem value="position-full" className="border-0">
                      <AccordionTrigger className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:no-underline py-1">
                        📖 Texte complet
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                          {cinqPrieres.positionAssise}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="mt-8 space-y-6">
          <VraiFauxQuiz sectionId="priere" />
          <MiniQuiz sectionId="priere" />
        </div>
      </div>
    );
  }

  // ===================== ZAKAT =====================
  if (activeSection === "zakat") {
    return renderDetailPage(
      "zakat", 30, zakatIntro.titre,
      zakatIntro.explicationEnfant,
      <HeartHandshake className="w-10 h-10" />,
      "zakat",
      <div className="space-y-6">
        <Card className="rounded-2xl border-rose-200 dark:border-rose-800">
          <CardContent className="pt-6">
            <ChildBubble text={zakatIntro.explicationEnfant} />
            {!revisionMode && (
              <div className="mt-4">
                <ShortText short={zakatIntro.resumeEnfant} full={zakatIntro.contenu} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-rose-200 dark:border-rose-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="w-5 h-5 text-rose-500" />
              Le Niçâb (minimum imposable)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!revisionMode && (
              <ShortText short={zakatIntro.resumeNisab} full={zakatIntro.nisab} />
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-rose-200 dark:border-rose-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-rose-500" />
              Exemples de calcul
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!revisionMode && (
              <ShortText short={zakatIntro.resumeExemplesCalcul} full={zakatIntro.exemplesCalcul} />
            )}
          </CardContent>
        </Card>

        {!revisionMode && (zakatIntro as Record<string, unknown>).exemplesEnfant && (
          <ChildBubble text={(zakatIntro as Record<string, unknown>).exemplesEnfant as string} />
        )}

        <Card className="rounded-2xl border-rose-200 dark:border-rose-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-rose-500" />
              À qui donner la Zakât ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!revisionMode && (
              <ShortText short={zakatIntro.resumeAQuiDonner} full={zakatIntro.aQuiDonner} />
            )}
          </CardContent>
        </Card>

        {!revisionMode && (
          <Card className="rounded-2xl border-rose-200 dark:border-rose-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-rose-500" />
                Spécificités de l&apos;école malikite
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ShortText short={zakatIntro.resumeSpecificsMalikite} full={zakatIntro.specificsMalikite} />
            </CardContent>
          </Card>
        )}
        <div className="mt-8 space-y-6">
          <VraiFauxQuiz sectionId="zakat" />
          <MiniQuiz sectionId="zakat" />
        </div>
      </div>
    );
  }

  // ===================== JEUNE =====================
  if (activeSection === "jeune") {
    return renderDetailPage(
      "jeune", 31, jeuneIntro.titre,
      jeuneIntro.explicationEnfant,
      <Sun className="w-10 h-10" />,
      "jeune",
      <div className="space-y-6">
        <Card className="rounded-2xl border-orange-200 dark:border-orange-800">
          <CardContent className="pt-6">
            <ChildBubble text={jeuneIntro.explicationEnfant} />
            {!revisionMode && (
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                Le contenu détaillé sera ajouté progressivement.
              </div>
            )}
          </CardContent>
        </Card>

        {!revisionMode && (jeuneIntro as Record<string, unknown>).exemplesEnfant && (
          <ChildBubble text={(jeuneIntro as Record<string, unknown>).exemplesEnfant as string} />
        )}
        <div className="mt-8 space-y-6">
          <VraiFauxQuiz sectionId="jeune" />
          <MiniQuiz sectionId="jeune" />
        </div>
      </div>
    );
  }

  return null;
}
