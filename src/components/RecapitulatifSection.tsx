"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  RefreshCw,
  Check,
  Sparkles,
  Clock,
  Volume2,
  Sun,
  Sunrise,
  Sunset,
  MoonStar,
  Moon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// ============ TYPES ============

interface PrayerDay {
  date: string;
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

// ============ DATA ============

const iqamaLines = [
  { arabic: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ", phonetic: "Allahu akbar, Allahu akbar", french: "Allah est le plus Grand, Allah est le plus Grand" },
  { arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ", phonetic: "Ashhadu an lâ ilâha illa Allah", french: "J'atteste qu'il n'y a de divinité qu'Allah" },
  { arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ", phonetic: "Ashhadu Anna Muhammadan rasûlu Allah", french: "J'atteste que Muhammad est le Messager d'Allah" },
  { arabic: "حَيَّ عَلَى الصَّلَاةِ", phonetic: "Hayya 'Ala as-salâti", french: "Venez à la prière" },
  { arabic: "حَيَّ عَلَى الْفَلَاحِ", phonetic: "Hayya 'alâ al-falâh", french: "Venez au succès" },
  { arabic: "قَدْ قَامَتِ الصَّلَاةُ", phonetic: "Qad qâmati as-salât", french: "La prière est sur le point de commencer" },
  { arabic: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ", phonetic: "Allahu akbar, Allahu akbar", french: "Allah est le plus Grand, Allah est le plus Grand" },
  { arabic: "لَا إِلَٰهَ إِلَّا اللهُ", phonetic: "Lâ ilâha illa Allah", french: "Il n'y a de divinité qu'Allah" },
];

const fivePrayers = [
  { id: "fajr" as const, num: 1, namePhonetic: "Subh", nameArabic: "الفجر", nameFr: "Prière de l'aube", icon: Sunrise, rakat: "2 Rak'at", voice: "À voix haute", detail: "2 Rak'at à voix haute", color: "from-orange-100 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20", iconColor: "text-orange-500", borderHover: "hover:border-orange-300 dark:hover:border-orange-700" },
  { id: "dhuhr" as const, num: 2, namePhonetic: "Zuhr", nameArabic: "الظهر", nameFr: "Milieu de journée", icon: Sun, rakat: "4 Rak'at", voice: "À voix basse", detail: "4 Rak'at à voix basse. Tashahhud après la 2ème. Les 2 dernières : Fâtiha seule", color: "from-yellow-100 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20", iconColor: "text-yellow-500", borderHover: "hover:border-yellow-300 dark:hover:border-yellow-700" },
  { id: "asr" as const, num: 3, namePhonetic: "'Asr", nameArabic: "العصر", nameFr: "Après-midi", icon: Clock, rakat: "4 Rak'at", voice: "À voix basse", detail: "4 Rak'at à voix basse, exactement comme Zuhr", color: "from-teal-100 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/20", iconColor: "text-teal-500", borderHover: "hover:border-teal-300 dark:hover:border-teal-700" },
  { id: "maghrib" as const, num: 4, namePhonetic: "Maghrib", nameArabic: "المغرب", nameFr: "Coucher du soleil", icon: Sunset, rakat: "3 Rak'at", voice: "Mixte", detail: "2 Rak'at à voix haute, 1 Rak'at à voix basse", color: "from-rose-100 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20", iconColor: "text-rose-500", borderHover: "hover:border-rose-300 dark:hover:border-rose-700" },
  { id: "isha" as const, num: 5, namePhonetic: "'Ishâ", nameArabic: "العشاء", nameFr: "Prière de la nuit", icon: MoonStar, rakat: "4 Rak'at", voice: "Mixte", detail: "2 Rak'at à voix haute, 2 Rak'at à voix basse", color: "from-indigo-100 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/20", iconColor: "text-indigo-500", borderHover: "hover:border-indigo-300 dark:hover:border-indigo-700" },
];

// ============ ANIMATION ============

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// ============ localStorage HELPERS ============

const STORAGE_KEY = "mon-islam-facile-prayers";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function loadTodayPrayers(): PrayerDay {
  const today = getToday();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: PrayerDay = JSON.parse(raw);
      if (data.date === today) return data;
    }
  } catch {
    // ignore
  }
  return { date: today, fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
}

function savePrayers(prayers: PrayerDay) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers));
  } catch {
    // ignore
  }
}

// ============ PRAYER CHECKBOX CARD ============

function PrayerCard({ prayer, completed, onToggle }: { prayer: (typeof fivePrayers)[0]; completed: boolean; onToggle: () => void }) {
  const IconComp = prayer.icon;
  return (
    <motion.div
      variants={fadeInUp}
      className={`relative rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
        completed
          ? "border-emerald-400 dark:border-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 shadow-md shadow-emerald-100/50 dark:shadow-emerald-950/30"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md " + prayer.borderHover
      }`}
      onClick={onToggle}
    >
      {completed && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <Check className="w-4 h-4" />
          </div>
        </div>
      )}
      <div className="p-4 flex items-center gap-3">
        <div className={`p-3 rounded-xl flex-shrink-0 transition-all ${completed ? "bg-emerald-200 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300" : `bg-gradient-to-br ${prayer.color} ${prayer.iconColor}`}`}>
          <IconComp className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-lg font-bold text-gray-800 dark:text-gray-100" dir="rtl">{prayer.nameArabic}</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{prayer.namePhonetic}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{prayer.nameFr}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{prayer.rakat}</Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{prayer.voice}</Badge>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Checkbox
            checked={completed}
            onCheckedChange={onToggle}
            className="w-6 h-6 rounded-md border-2 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <AnimatePresence>
        {completed && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-3 pt-0">
              <Separator className="mb-2 opacity-50" />
              <p className="text-xs text-emerald-600 dark:text-emerald-400 leading-relaxed">📖 {prayer.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============

export default function RecapitulatifSection() {
  const [prayers, setPrayers] = useState<PrayerDay>(loadTodayPrayers);

  useEffect(() => {
    setPrayers(loadTodayPrayers());
  }, []);

  const togglePrayer = (id: keyof PrayerDay) => {
    if (id === "date") return;
    setPrayers((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      savePrayers(updated);
      const name = fivePrayers.find((p) => p.id === id)?.namePhonetic || id;
      if (!prev[id]) {
        toast.success(`✅ ${name} prière effectuée !`, { description: "Masha'Allah, continue comme ça !" });
      } else {
        toast.info(`${name} décochée`, { description: "N'oublie pas de faire ta prière !" });
      }
      return updated;
    });
  };

  const resetPrayers = () => {
    const empty: PrayerDay = { date: getToday(), fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
    setPrayers(empty);
    savePrayers(empty);
    toast.info("Prières réinitialisées pour aujourd'hui");
  };

  const completedCount = [prayers.fajr, prayers.dhuhr, prayers.asr, prayers.maghrib, prayers.isha].filter(Boolean).length;
  const allDone = completedCount === 5;

  return (
    <div className="space-y-8">
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">🕌 Récapitulatif — Mes prières du jour</h2>
          </div>
          <div className="flex items-center gap-2">
            {allDone && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                Complètes !
              </motion.div>
            )}
            <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onClick={resetPrayers}>
              <RefreshCw className="w-3 h-3 mr-1" />
              Réinitialiser
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Progress value={(completedCount / 5) * 100} className="h-3 flex-1" />
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 min-w-[3ch] text-right">{completedCount}/5</span>
        </div>

        <AnimatePresence>
          {allDone && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-5 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 text-center">
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400">🎉 Masha&apos;Allah ! 🎉</p>
              <p className="text-sm text-amber-500 dark:text-amber-400 mt-1">Tu as fait toutes tes prières aujourd&apos;hui ! Allah récompense ta constance !</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fivePrayers.map((prayer) => (
            <PrayerCard key={prayer.id} prayer={prayer} completed={prayers[prayer.id] as boolean} onToggle={() => togglePrayer(prayer.id)} />
          ))}
        </motion.div>
      </motion.div>

      <Separator className="opacity-20" />

      {/* TABLEAU DES 5 PRIÈRES */}
      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Moon className="w-5 h-5 text-amber-500" />
          Les cinq prières obligatoires
        </h2>
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <th className="text-left p-3 text-sm font-semibold">N°</th>
                  <th className="text-left p-3 text-sm font-semibold">Prière</th>
                  <th className="text-left p-3 text-sm font-semibold">Phonétique</th>
                  <th className="text-left p-3 text-sm font-semibold hidden sm:table-cell">Arabe</th>
                  <th className="text-left p-3 text-sm font-semibold">Rak&apos;at</th>
                  <th className="text-left p-3 text-sm font-semibold">Voix</th>
                </tr>
              </thead>
              <tbody>
                {fivePrayers.map((prayer, index) => (
                  <motion.tr key={prayer.id} variants={fadeInUp} className={`border-b border-gray-100 dark:border-gray-800 last:border-b-0 ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"} hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors`}>
                    <td className="p-3 text-sm font-bold text-gray-400">{prayer.num}</td>
                    <td className="p-3 text-sm font-medium text-gray-700 dark:text-gray-300">{prayer.nameFr}</td>
                    <td className="p-3 text-sm font-semibold text-gray-800 dark:text-gray-100">{prayer.namePhonetic}</td>
                    <td className="p-3 text-sm font-medium text-gray-600 dark:text-gray-400 hidden sm:table-cell" dir="rtl">{prayer.nameArabic}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{prayer.rakat}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{prayer.voice}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <Separator className="opacity-20" />

      {/* L'IQÂMA */}
      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-emerald-500" />
          L&apos;Iqâma (l&apos;appel à la prière intérieur)
        </h2>

        {/* Phonétique */}
        <Card className="border-0 shadow-lg shadow-emerald-100/50 dark:shadow-emerald-950/20 rounded-2xl overflow-hidden mb-6">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white pb-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              <CardTitle className="text-base font-semibold text-white">En phonétique</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-2">
              {iqamaLines.map((line, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">{index + 1}</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{line.phonetic}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Arabe */}
        <Card className="border-0 shadow-md rounded-2xl overflow-hidden mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-lg">🕌</span>
              <CardTitle className="text-base font-semibold text-gray-700 dark:text-gray-300">En arabe</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="space-y-3">
                {iqamaLines.map((line, index) => (
                  <p key={index} className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 text-right leading-loose font-medium" dir="rtl">{line.arabic}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Français */}
        <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-lg">📖</span>
              <CardTitle className="text-base font-semibold text-gray-700 dark:text-gray-300">En français</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
              <div className="space-y-2">
                {iqamaLines.map((line, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">{index + 1}</div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{line.french}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
