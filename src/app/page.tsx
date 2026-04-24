"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const iconMap: Record<string, React.ReactNode> = {
  scale: <Scale className="w-8 h-8" />,
  droplets: <Droplets className="w-8 h-8" />,
  moon: <Moon className="w-8 h-8" />,
  "heart-handshake": <HeartHandshake className="w-8 h-8" />,
  sun: <Sun className="w-8 h-8" />,
};

const statutColors: Record<string, string> = {
  obligatoire: "bg-emerald-100 text-emerald-800 border-emerald-300",
  interdit: "bg-red-100 text-red-800 border-red-300",
  recommande: "bg-sky-100 text-sky-800 border-sky-300",
  detestable: "bg-amber-100 text-amber-800 border-amber-300",
  permis: "bg-violet-100 text-violet-800 border-violet-300",
};

const statutIcons: Record<string, React.ReactNode> = {
  obligatoire: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
  interdit: <XCircle className="w-6 h-6 text-red-600" />,
  recommande: <ThumbsUp className="w-6 h-6 text-sky-600" />,
  detestable: <AlertTriangle className="w-6 h-6 text-amber-600" />,
  permis: <Info className="w-6 h-6 text-violet-600" />,
};

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);

  const goHome = () => {
    setActiveSection(null);
    setActiveSubSection(null);
  };

  const goToSection = (id: string) => {
    setActiveSection(id);
    setActiveSubSection(null);
  };

  // ===================== HOME PAGE =====================
  if (activeSection === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-10 h-10 text-yellow-300" />
                  <BookOpen className="w-14 h-14" />
                  <Sparkles className="w-10 h-10 text-yellow-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Mon Islam Facile
                </h1>
                <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto">
                  Bienvenue ! Ici tu vas apprendre les bases de ta religion d&apos;une
                  manière simple et amusante. Tout le contenu vient du site
                  doctrine-malikite.fr.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm px-3 py-1">
                    7-12 ans
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm px-3 py-1">
                    Doctrine Malikite
                  </Badge>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Rubriques Grid */}
          <section className="max-w-5xl mx-auto px-4 py-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Choisis ce que tu veux apprendre
              </h2>
              <p className="text-gray-500">
                Clique sur un sujet pour découvrir son contenu
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rubriques.map((rub, index) => (
                <motion.div
                  key={rub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-emerald-300 group"
                    onClick={() => goToSection(rub.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                          {iconMap[rub.icon]}
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-1 text-emerald-600">
                            Rubrique {rub.rubrique}
                          </Badge>
                          <CardTitle className="text-base leading-tight">
                            {rub.titre}
                          </CardTitle>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">{rub.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>


        </main>
        <Footer />
      </div>
    );
  }

  // ===================== STATUTS LÉGAUX =====================
  if (activeSection === "statuts") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <Button
            variant="ghost"
            onClick={goHome}
            className="mb-6 text-emerald-600 hover:text-emerald-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour à l&apos;accueil
          </Button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionHero
              title={statutsLegauxIntro.titre}
              childExplanation={statutsLegauxIntro.explicationEnfant}
              rubrique={27}
              icon={<Scale className="w-10 h-10" />}
            />

            {/* Intro */}
            <Card className="mb-6 border-emerald-200">
              <CardContent className="pt-6">
                <ChildBubble text={statutsLegauxIntro.explicationEnfant} />
                <div className="mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {statutsLegauxIntro.contenu}
                </div>
              </CardContent>
            </Card>

            {/* L'intention */}
            <Card className="mb-6 border-sky-200 bg-sky-50/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-sky-500" />
                  L&apos;importance de l&apos;intention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {statutsLegauxIntro.intention}
                </div>
              </CardContent>
            </Card>

            {/* 5 statuts */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Les 5 statuts légaux
              </h3>
              <div className="space-y-4">
                {[
                  { data: statutObligation, type: "obligatoire" },
                  { data: statutIllicite, type: "interdit" },
                  { data: statutRecommande, type: "recommande" },
                  { data: statutDetestable, type: "detestable" },
                  { data: statutPermis, type: "permis" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card
                      className={`border-2 ${statutColors[item.type]} overflow-hidden`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          {statutIcons[item.type]}
                          <CardTitle className="text-base">
                            {item.data.titre}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ChildBubble text={item.data.explicationEnfant} />
                        <div className="mt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                          {item.data.contenu}
                        </div>
                        {item.data.resumeCategories && (
                          <Accordion type="single" collapsible className="mt-4">
                            <AccordionItem value="details" className="border-0">
                              <AccordionTrigger className="text-sm text-emerald-600 hover:no-underline py-2">
                                En savoir plus sur les catégories
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
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
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // ===================== PURIFICATION =====================
  if (activeSection === "purification") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <Button
            variant="ghost"
            onClick={goHome}
            className="mb-6 text-emerald-600 hover:text-emerald-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour à l&apos;accueil
          </Button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionHero
              title={purificationIntro.titre}
              childExplanation={purificationIntro.explicationEnfant}
              rubrique={28}
              icon={<Droplets className="w-10 h-10" />}
            />

            {/* Les Ablutions */}
            <Card className="mb-6 border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-blue-500" />
                  {lesAblutions.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChildBubble text={lesAblutions.explicationEnfant} />

                {/* Verset du Coran */}
                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-700 text-sm">
                      Verset du Coran (5:6)
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line italic">
                    {lesAblutions.versetCoran}
                  </p>
                </div>

                {/* Les 9 étapes */}
                <div className="mt-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                      !
                    </span>
                    Les étapes des ablutions
                  </h4>
                  <div className="space-y-3">
                    {lesAblutions.etapes.map((etape) => (
                      <div
                        key={etape.numero}
                        className="flex gap-3 items-start bg-blue-50/70 rounded-lg p-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                          {etape.numero}
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-800 text-sm">
                            {etape.titre}
                          </h5>
                          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
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
                    <AccordionTrigger className="text-sm text-amber-600 hover:no-underline py-2">
                      Remarques importantes
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-amber-50 rounded-lg p-4">
                        {lesAblutions.remarques}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="coran" className="border-0">
                    <AccordionTrigger className="text-sm text-sky-600 hover:no-underline py-2">
                      Toucher et lire le Coran
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-sky-50 rounded-lg p-4">
                        {lesAblutions.remarquesCoran}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Piliers des ablutions */}
            <Card className="mb-6 border-emerald-200">
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
                    <div
                      key={i}
                      className="bg-emerald-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sunnas des ablutions */}
            <Card className="mb-6 border-sky-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-sky-500" />
                  {sunnasAblutions.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChildBubble text={sunnasAblutions.explicationEnfant} />
                <div className="mt-4 space-y-3">
                  {sunnasAblutions.versets.map((v, i) => (
                    <div
                      key={i}
                      className="bg-sky-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enchaînement */}
            <Card className="mb-6 border-violet-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5 text-violet-500" />
                  {enchainementAblutions.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {enchainementAblutions.contenu}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // ===================== PRIÈRE =====================
  if (activeSection === "priere") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <Button
            variant="ghost"
            onClick={goHome}
            className="mb-6 text-emerald-600 hover:text-emerald-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour à l&apos;accueil
          </Button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionHero
              title={priereIntro.titre}
              childExplanation={priereIntro.explicationEnfant}
              rubrique={29}
              icon={<Moon className="w-10 h-10" />}
            />

            {/* L'Iqâma */}
            <Card className="mb-6 border-teal-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-teal-500" />
                  {iqama.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-teal-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-semibold text-teal-700 mb-2">
                    Formule de l&apos;Iqâma :
                  </p>
                  <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line font-medium">
                    {iqama.formule}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    {iqama.sourceNote}
                  </p>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="remarques" className="border-0">
                    <AccordionTrigger className="text-sm text-teal-600 hover:no-underline py-2">
                      Remarques importantes
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-teal-50 rounded-lg p-4">
                        {iqama.remarques}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* La Fâtiha */}
            <Card className="mb-6 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  {fatiha.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-emerald-50 rounded-xl p-4 mb-3">
                  <p className="text-xl text-gray-800 leading-loose text-right font-medium" dir="rtl">
                    {fatiha.arabe}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-2">
                  <p className="text-xs text-gray-500 font-semibold mb-1">
                    Traduction :
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line italic">
                    {fatiha.traduction}
                  </p>
                </div>
                <p className="text-xs text-gray-500 italic">{fatiha.remarqueAmîn}</p>
              </CardContent>
            </Card>

            {/* Sourates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{sourateIkhlas.titre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-lg p-3 mb-2">
                    <p className="text-lg text-gray-800 leading-loose text-right" dir="rtl">
                      {sourateIkhlas.arabe}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line italic">
                    {sourateIkhlas.traduction}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{sourateNasr.titre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-lg p-3 mb-2">
                    <p className="text-lg text-gray-800 leading-loose text-right" dir="rtl">
                      {sourateNasr.arabe}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line italic">
                    {sourateNasr.traduction}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Étapes de la prière */}
            <Card className="mb-6 border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Moon className="w-6 h-6 text-purple-500" />
                  {etapesPriere.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">{etapesPriere.introduction}</p>

                {/* Première Rak'a */}
                <div className="mb-6">
                  <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                      1
                    </span>
                    {etapesPriere.premiereRaka.titre}
                  </h4>
                  <div className="space-y-3">
                    {etapesPriere.premiereRaka.etapes.map((etape) => (
                      <div
                        key={etape.numero}
                        className="flex gap-3 items-start bg-purple-50/70 rounded-lg p-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                          {etape.numero}
                        </div>
                        <div>
                          <h5 className="font-semibold text-purple-800 text-sm">
                            {etape.titre}
                          </h5>
                          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                            {etape.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Deuxième Rak'a */}
                <div className="mb-6">
                  <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                      2
                    </span>
                    {etapesPriere.deuxiemeRaka.titre}
                  </h4>
                  <div className="bg-purple-50/70 rounded-lg p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {etapesPriere.deuxiemeRaka.detail}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TASHAHHUD DU MILIEU */}
            <Card className="mb-6 border-amber-200 bg-amber-50/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  {tashahhudMilieu.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 rounded-xl p-4 mb-3 border border-amber-200">
                  <p className="text-sm font-semibold text-amber-700 mb-2">
                    Tashahhud du milieu (choisi par l&apos;Imâm Mâlik) :
                  </p>
                  <p className="text-xl text-gray-800 leading-loose text-right font-medium" dir="rtl">
                    {tashahhudMilieu.arabe}
                  </p>
                </div>
                <p className="text-xs text-gray-600 italic">{tashahhudMilieu.explication}</p>
              </CardContent>
            </Card>

            {/* PRIÈRE D'ABRAHAM */}
            <Card className="mb-6 border-sky-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-sky-500" />
                  {priereAbraham.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-sky-50 rounded-xl p-4 mb-3">
                  <p className="text-xl text-gray-800 leading-loose text-right font-medium" dir="rtl">
                    {priereAbraham.arabe}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-semibold mb-1">
                    Traduction :
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line italic">
                    {priereAbraham.traduction}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* TASHAHHUD FINAL */}
            <Card className="mb-6 border-emerald-300 bg-emerald-50/30 ring-2 ring-emerald-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  {tashahhudFinal.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-300">
                  Important
                </Badge>
                <div className="bg-emerald-50 rounded-xl p-4 mb-3 border border-emerald-200">
                  <p className="text-sm font-semibold text-emerald-700 mb-2">
                    Le Tashahhud final complet (Tashahhud + Prière sur le Prophète) :
                  </p>
                  <p className="text-xl text-gray-800 leading-loose text-right font-medium" dir="rtl">
                    {tashahhudFinal.arabe}
                  </p>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-emerald-50 rounded-lg p-3">
                  {tashahhudFinal.explication}
                </div>
              </CardContent>
            </Card>

            {/* EXEMPLE : PRIÈRE DE DHOR */}
            <Card className="mb-6 border-2 border-purple-300 bg-purple-50/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-purple-800">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  {priereDhor.titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChildBubble text={priereDhor.explicationEnfant} />

                <div className="mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {priereDhor.contenu}
                </div>

                {/* Étapes détaillées Rak'at par Rak'at */}
                <div className="mt-6 space-y-4">
                  {priereDhor.etapesDetaillees.map((rakat) => (
                    <div key={rakat.rakat}>
                      <h4 className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                        <span className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                          {rakat.rakat}
                        </span>
                        {rakat.titre}
                      </h4>
                      <div className="space-y-2">
                        {rakat.etapes.map((etape, idx) => (
                          <div
                            key={idx}
                            className="flex gap-2 items-start bg-purple-50/70 rounded-lg p-2 text-sm"
                          >
                            <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{etape}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Les 5 prières */}
            <Card className="mb-6 border-teal-200">
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
                      <AccordionItem value={`priere-${idx}`} className="border rounded-lg px-3">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div>
                              <span className="font-semibold text-gray-800">
                                {p.nom}
                              </span>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {p.rakat}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {p.voix}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pb-2 pl-11">
                            {p.detail}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Notes voix */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="notes" className="border-0">
                    <AccordionTrigger className="text-sm text-teal-600 hover:no-underline py-2">
                      Notes importantes sur la voix et la position
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-teal-50 rounded-lg p-4">
                        {cinqPrieres.notesVoix}
                      </div>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 rounded-lg p-4 mt-2">
                        {cinqPrieres.positionAssise}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // ===================== ZAKÂT =====================
  if (activeSection === "zakat") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <Button
            variant="ghost"
            onClick={goHome}
            className="mb-6 text-emerald-600 hover:text-emerald-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour à l&apos;accueil
          </Button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionHero
              title={zakatIntro.titre}
              childExplanation={zakatIntro.explicationEnfant}
              rubrique={30}
              icon={<HeartHandshake className="w-10 h-10" />}
            />

            <Card className="mb-6 border-emerald-200">
              <CardContent className="pt-6">
                <ChildBubble text={zakatIntro.explicationEnfant} />
                <div className="mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {zakatIntro.contenu}
                </div>
              </CardContent>
            </Card>

            {/* Niçâb */}
            <Card className="mb-6 border-sky-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Scale className="w-5 h-5 text-sky-500" />
                  Le Niçâb (minimum imposable)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {zakatIntro.nisab}
                </div>
              </CardContent>
            </Card>

            {/* Exemples de calcul */}
            <Card className="mb-6 border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Exemples de calcul
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {zakatIntro.exemplesCalcul}
                </div>
              </CardContent>
            </Card>

            {/* A qui donner */}
            <Card className="mb-6 border-violet-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-violet-500" />
                  À qui donner la Zakât ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {zakatIntro.aQuiDonner}
                </div>
              </CardContent>
            </Card>

            {/* Spécificités malikites */}
            <Card className="mb-6 border-teal-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-500" />
                  Spécificités de l&apos;école malikite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {zakatIntro.specificsMalikite}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // ===================== JEÛNE =====================
  if (activeSection === "jeune") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <Button
            variant="ghost"
            onClick={goHome}
            className="mb-6 text-emerald-600 hover:text-emerald-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour à l&apos;accueil
          </Button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionHero
              title={jeuneIntro.titre}
              childExplanation={jeuneIntro.explicationEnfant}
              rubrique={31}
              icon={<Sun className="w-10 h-10" />}
            />

            <Card className="mb-6 border-amber-200">
              <CardContent className="pt-6">
                <ChildBubble text={jeuneIntro.explicationEnfant} />
              </CardContent>
            </Card>

            {/* Sub-sections du jeûne */}
            <div className="space-y-4">
              {[
                { titre: "Introduction", description: "Qu'est-ce que le jeûne du Ramadan ?" },
                { titre: "Croyants concernés", description: "Qui doit jeûner ?" },
                { titre: "Quand est-il interdit de jeûner ?", description: "Les moments où le jeûne est interdit" },
                { titre: "Expiation ou seulement rattrapage", description: "Que faire si on rate un jeûne ?" },
                { titre: "Cas de la femme en cessation de menstrues", description: "Règles spécifiques pour les femmes" },
                { titre: "Femme enceinte et le jeûne", description: "Ce que la femme enceinte doit savoir" },
                { titre: "Actes autorisés et tolérés pendant le jeûne", description: "Ce qu'on peut faire pendant le jeûne" },
                { titre: "Cas de pardon", description: "Quand Allah pardonne" },
                { titre: "Ta'jîl al-futûr wa tâkhîr as-suhûr", description: "Casser le jeûne rapidement et retarder le suhûr" },
                { titre: "Mérites du mois de Ramadan", description: "Les grandes récompenses du Ramadan" },
                { titre: "La nuit de la valeur (Laylatu Al-qadr)", description: "La nuit la plus importante du Ramadan" },
                { titre: "Zakât Al-fitr", description: "L'aumône de la fin du Ramadan" },
              ].map((sub, idx) => (
                <Card
                  key={idx}
                  className="border-amber-100 hover:border-amber-300 transition-colors"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                      {sub.titre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500">{sub.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Le contenu détaillé de chaque sous-section sera ajouté progressivement.
                <br />
                Source :{" "}
                <a
                  href="http://www.doctrine-malikite.fr/index.php?action=rubrique&numrub=31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline"
                >
                  doctrine-malikite.fr - Rubrique 31
                </a>
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
}

// ===================== COMPONENTS UTILITAIRES =====================

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-emerald-600" />
          <h1 className="text-lg font-bold text-emerald-700">
            Mon Islam Facile
          </h1>
        </div>
        <Badge
          variant="outline"
          className="text-xs text-emerald-600 border-emerald-200"
        >
          Doctrine Malikite
        </Badge>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-emerald-50 border-t border-emerald-200 py-4 px-4 mt-auto">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-emerald-700 text-sm">
            Mon Islam Facile
          </span>
        </div>
      </div>
    </footer>
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

function ChildBubble({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
          <span className="text-base">💡</span>
        </div>
        <p className="text-sm text-amber-800 leading-relaxed font-medium">
          {text}
        </p>
      </div>
    </div>
  );
}
