// Types pour les données des leçons
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LessonSection {
  title: string;
  content: string;
  points?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  shortDescription: string;
  colorFrom: string;
  colorTo: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  colorBadge: string;
  sourceUrl: string;
  sections: LessonSection[];
  funFacts: string[];
  quiz: QuizQuestion[];
}

export const LESSONS: Lesson[] = [
  {
    id: "statuts-legaux",
    title: "Les Statuts Légaux en Islam",
    emoji: "🚦",
    shortDescription:
      "Découvre les 5 règles qui dirigent nos actes, comme les feux de signalisation !",
    colorFrom: "#10b981",
    colorTo: "#059669",
    colorBg: "bg-emerald-50",
    colorBorder: "border-emerald-300",
    colorText: "text-emerald-700",
    colorBadge: "bg-emerald-100 text-emerald-800",
    sourceUrl:
      "https://www.doctrine-malikite.fr/Les-statuts-legaux-en-Islam_r27.html",
    sections: [
      {
        title: "Bienvenue dans le monde des statuts ! 🌟",
        content:
          "En Islam, chaque chose qu'on fait a un statut, un peu comme les couleurs d'un feu de signalisation ! Imagine que tu es un conducteur sur la route : le feu vert te dit d'avancer, le rouge de t'arrêter et le orange de faire attention. L'Islam fonctionne de la même manière pour nous guider !",
        points: [
          "Il y a exactement 5 statuts légaux en Islam",
          "Chaque acte que nous faisons rentre dans l'une de ces 5 catégories",
          "Connaître ces statuts nous aide à mieux comprendre notre religion",
        ],
      },
      {
        title: "🟢 L'Obligatoire (Fard) — Ce qu'on DOIT faire",
        content:
          "C'est comme le feu VERT : on DOIT obligatoirement le faire ! Si on ne le fait pas, c'est un péché. Et si on le fait, on a une récompense (hasanat) !",
        points: [
          "La prière (Salât) 5 fois par jour",
          "Le jeûne du Ramadan",
          "La Zakât (donner aux pauvres)",
          "Être gentil avec ses parents",
        ],
      },
      {
        title: "🔴 L'Interdit (Haram) — Ce qu'on NE DOIT PAS faire",
        content:
          "C'est comme le feu ROUGE : on doit ABSOLUMENT s'arrêter ! Si on le fait, c'est un grand péché. Et si on ne le fait pas, on a une récompense !",
        points: [
          "Mentir et dire des mensonges",
          "Faire du mal aux autres",
          "Voler les choses des autres",
          "Manger du porc et boire de l'alcool",
        ],
      },
      {
        title: "🔵 Le Recommandé (Sunna) — Ce qui est BIEN de faire",
        content:
          "C'est un conseil d'Allah et de Son Prophète ﷺ. Si on le fait, on gagne beaucoup de récompenses ! Si on ne le fait pas, ce n'est pas un péché.",
        points: [
          "Sourire aux gens 😊",
          "Aider les autres",
          "Faire des prières supplémentaires",
          "Dire « Bismillah » avant de manger",
        ],
      },
      {
        title: "🟠 Le Détestable (Makruh) — Ce qu'il vaut mieux NE PAS faire",
        content:
          "C'est comme le feu ORANGE : il vaut mieux ne pas le faire ! Ce n'est pas interdit, mais Allah préfère qu'on l'évite.",
        points: [
          "Gaspiller l'eau et la nourriture",
          "Dormir trop tard sans raison",
          "Manger trop (au-delà de sa faim)",
          "Parler pendant la prière",
        ],
      },
      {
        title: "⚪ Le Permis (Moubah) — Ce qu'on PEUT faire librement",
        content:
          "C'est la zone libre ! Tu peux le faire ou pas, ça ne compte ni comme bien ni comme mal. C'est tout simplement permis.",
        points: [
          "Manger ce qu'on aime (halal)",
          "Jouer avec ses amis",
          "Dormir pour se reposer",
          "Faire du sport et se promener",
        ],
      },
    ],
    funFacts: [
      "💡 Le savais-tu ? Le mot « Fard » vient de l'arabe et veut dire « obligatoire ». Chaque jour, tu fais plein de choses qui sont Fard sans même t'en rendre compte !",
      "💡 Le savais-tu ? Le Prophète Muhammad ﷺ a dit que sourire au visage de ton frère est une Sadaqa (une bonne action) !",
      "💡 Le savais-tu ? En Islam, les bonnes intentions comptent beaucoup. Manger pour avoir de l'énergie pour prier transforme un acte permis en acte récompensé !",
    ],
    quiz: [
      {
        id: "sl-q1",
        question: "Combien y a-t-il de statuts légaux en Islam ?",
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
      },
      {
        id: "sl-q2",
        question: "Quel est le statut de la prière (Salât) ?",
        options: [
          "Recommandé (Sunna)",
          "Obligatoire (Fard)",
          "Permis (Moubah)",
          "Détestable (Makruh)",
        ],
        correctIndex: 1,
      },
      {
        id: "sl-q3",
        question:
          "Lequel de ces actes est « Interdit » (Haram) ?",
        options: [
          "Sourire aux gens",
          "Aider ses parents",
          "Mentir",
          "Faire du sport",
        ],
        correctIndex: 2,
      },
      {
        id: "sl-q4",
        question: "Sourire aux gens est un acte...",
        options: [
          "Interdit (Haram)",
          "Détestable (Makruh)",
          "Permis (Moubah)",
          "Recommandé (Sunna)",
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    id: "purification",
    title: "La Purification Rituelle (Tahara)",
    emoji: "💧",
    shortDescription:
      "Apprends comment être propre avant la prière, comme se laver les mains !",
    colorFrom: "#06b6d4",
    colorTo: "#0891b2",
    colorBg: "bg-cyan-50",
    colorBorder: "border-cyan-300",
    colorText: "text-cyan-700",
    colorBadge: "bg-cyan-100 text-cyan-800",
    sourceUrl:
      "https://www.doctrine-malikite.fr/La-purification-proprete-rituelle_r28.html",
    sections: [
      {
        title: "Pourquoi être propre ? ✨",
        content:
          "En Islam, la propreté c'est très important ! Quand on veut prier, il faut être propre physiquement et spirituellement. C'est comme quand tu te laves les mains avant de manger : c'est une règle d'hygiène qui nous protège !",
        points: [
          "La propreté est la moitié de la foi",
          "Allah aime ceux qui sont propres",
          "On ne peut pas prier sans être purifié",
        ],
      },
      {
        title: "🚿 Le petit lavage (Wudu) — Comment faire ?",
        content:
          "Le Wudu (ou ablutions), c'est le lavage qu'on fait avant chaque prière. C'est comme un rituel de purification magique ! Voici les étapes dans l'ordre :",
        points: [
          "1️⃣ Dire « Bismillah » (Au nom d'Allah)",
          "2️⃣ Se laver les mains jusqu'aux poignets (3 fois)",
          "3️⃣ Prendre de l'eau dans la bouche, puis la recracher",
          "4️⃣ Prendre de l'eau dans le nez avec la main droite et se moucher avec la gauche",
          "5️⃣ Se laver tout le visage (3 fois)",
          "6️⃣ Se laver les avant-bras, du coude jusqu'aux doigts (3 fois)",
          "7️⃣ Passer les mains mouillées sur la tête (une fois)",
          "8️⃣ Se laver les pieds jusqu'aux chevilles (3 fois)",
        ],
      },
      {
        title: "🛁 Le grand lavage (Ghusl)",
        content:
          "Le Ghusl, c'est le grand lavage complet du corps. On le fait quand on a besoin d'une grande purification, par exemple :",
        points: [
          "Après un grand lavage complet, on est complètement purifié",
          "On commence par se laver comme pour le Wudu d'abord",
          "Ensuite, on verse de l'eau sur tout le corps 3 fois",
          "On fait couler l'eau dans tous les recoins du corps",
        ],
      },
      {
        title: "🏜️ Le Tayammum — Quand il n'y a pas d'eau",
        content:
          "Le Tayammum, c'est une purification spéciale quand on n'a pas d'eau ou qu'on est malade. On utilise de la terre propre à la place de l'eau !",
        points: [
          "On frappe la terre propre avec les deux mains",
          "On souffle légèrement dessus",
          "On passe les mains sur le visage",
          "On passe les mains sur les avant-bras",
          "C'est un cadeau d'Allah pour nous faciliter la vie !",
        ],
      },
    ],
    funFacts: [
      "💡 Le savais-tu ? Le Prophète ﷺ a dit : « Si ce n'était pas une charge pour ma communauté, j'aurais ordonné de se brosser les dents avant chaque prière ! »",
      "💡 Le savais-tu ? Le Wudu enlève non seulement la saleté du corps, mais aussi les péchés. Chaque goutte d'eau qui tombe emporte un petit péché !",
      "💡 Le savais-tu ? Les anges aiment ceux qui sont toujours propres. Garde-toi toujours bien propre !",
    ],
    quiz: [
      {
        id: "pu-q1",
        question: "Comment s'appelle la petite ablution ?",
        options: ["Ghusl", "Tayammum", "Wudu", "Salât"],
        correctIndex: 2,
      },
      {
        id: "pu-q2",
        question:
          "Que dit-on avant de commencer les ablutions (Wudu) ?",
        options: [
          "Alhamdoulillah",
          "Allahou Akbar",
          "Bismillah",
          "SubhanAllah",
        ],
        correctIndex: 2,
      },
      {
        id: "pu-q3",
        question:
          "Combien de fois par jour minimum doit-on faire les ablutions ?",
        options: ["1 fois", "3 fois", "4 fois", "5 fois"],
        correctIndex: 3,
      },
      {
        id: "pu-q4",
        question:
          "Qu'est-ce qu'on fait quand il n'y a pas d'eau pour les ablutions ?",
        options: [
          "On ne prie pas",
          "Le Tayammum avec de la terre propre",
          "On attend qu'il pleuve",
          "On utilise du sable mouillé",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "priere",
    title: "La Prière Canonique (Salât)",
    emoji: "🕌",
    shortDescription:
      "Découvre les 5 prières quotidiennes et comment accomplir la prière !",
    colorFrom: "#f59e0b",
    colorTo: "#d97706",
    colorBg: "bg-amber-50",
    colorBorder: "border-amber-300",
    colorText: "text-amber-700",
    colorBadge: "bg-amber-100 text-amber-800",
    sourceUrl:
      "https://www.doctrine-malikite.fr/La-priere-canonique_r29.html",
    sections: [
      {
        title: "La prière, le 2ème pilier de l'Islam 🌟",
        content:
          "La Salât (la prière) est le DEUXIÈME pilier de l'Islam après la Shahada. C'est le moment où on parle directement avec Allah ! Imagine que tu as un meilleur ami et que tu lui parles 5 fois par jour — c'est comme ça avec Allah !",
        points: [
          "C'est le lien direct entre nous et Allah",
          "Le Prophète ﷺ a dit que la prière est le pilier de la religion",
          "Celui qui laisse la prière a détruit sa religion",
        ],
      },
      {
        title: "🕐 Les 5 prières quotidiennes",
        content:
          "Chaque jour, un musulman doit faire 5 prières à des moments précis. Voici les 5 prières avec leurs noms en arabe et en français :",
        points: [
          "🌅 Fajr (l'Aube) — 2 rak'at — Quand le soleil commence à poindre",
          "☀️ Dhuhr (Midi) — 4 rak'at — Quand le soleil est au plus haut puis commence à descendre",
          "🌤️ Asr (Après-midi) — 4 rak'at — Au milieu de l'après-midi",
          "🌇 Maghrib (Coucher du soleil) — 3 rak'at — Juste après que le soleil se couche",
          "🌙 Isha (Nuit) — 4 rak'at — Quand la nuit est tombée et qu'il fait tout noir",
        ],
      },
      {
        title: "🙏 Les étapes de la prière",
        content:
          "Chaque prière est composée de « rak'at » (unités de prière). Voici comment faire une rak'at :",
        points: [
          "1️⃣ L'intention (Niyya) : dire dans son cœur ce qu'on va prier",
          "2️⃣ Takbir : lever les mains et dire « Allahou Akbar » (Allah est le plus Grand)",
          "3️⃣ Récitation : lire la Fatiha et une autre sourate",
          "4️⃣ Ruku' (Inclinaison) : se pencher et dire « Subhana Rabbiyal Adhim »",
          "5️⃣ Sujud (Prosternation) : mettre le front par terre et dire « Subhana Rabbiyal A'la » — 2 fois !",
          "6️⃣ Tashahud : s'asseoir et réciter la prière du Tashahud",
          "7️⃣ Salam final : tourner la tête à droite et à gauche en disant « Assalamou Alaikoum »",
        ],
      },
      {
        title: "🧭 La direction de la prière (Qibla)",
        content:
          "Quand on prie, on doit se tourner vers la Ka'ba, la maison sacrée à La Mecque, en Arabie Saoudite. La Ka'ba a été construite par le Prophète Ibrahim (Abraham) et son fils Ismaïl !",
        points: [
          "La Ka'ba est le centre spirituel de l'Islam",
          "Tous les musulmans du monde prient dans la même direction",
          "Cela nous rappelle l'unité de la communauté musulmane (Oumma)",
        ],
      },
    ],
    funFacts: [
      "💡 Le savais-tu ? La première chose qu'Allah nous demandera le Jour du Jugement, c'est la prière !",
      "💡 Le savais-tu ? Le Prophète ﷺ adorait tellement la prière qu'il disait : « Le délice de mes yeux a été mis dans la prière ! »",
      "💡 Le savais-tu ? Pendant la prosternation (Sujud), on est le plus proche possible d'Allah. C'est le meilleur moment pour faire des dou'as (invocations) !",
    ],
    quiz: [
      {
        id: "pr-q1",
        question: "Combien de prières obligatoires par jour ?",
        options: ["3", "4", "5", "7"],
        correctIndex: 2,
      },
      {
        id: "pr-q2",
        question: "Quelle est la prière de l'aube ?",
        options: ["Dhuhr", "Fajr", "Asr", "Maghrib"],
        correctIndex: 1,
      },
      {
        id: "pr-q3",
        question: "Vers quelle direction prie-t-on ?",
        options: [
          "Vers le Nord",
          "Vers le soleil",
          "La Ka'ba à La Mecque",
          "Vers Jérusalem",
        ],
        correctIndex: 2,
      },
      {
        id: "pr-q4",
        question: "Combien de rak'at a la prière du Maghrib ?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "zakat",
    title: "La Zakât",
    emoji: "💝",
    shortDescription:
      "Apprends à partager et donner aux autres — le 3ème pilier de l'Islam !",
    colorFrom: "#f43f5e",
    colorTo: "#e11d48",
    colorBg: "bg-rose-50",
    colorBorder: "border-rose-300",
    colorText: "text-rose-700",
    colorBadge: "bg-rose-100 text-rose-800",
    sourceUrl: "https://www.doctrine-malikite.fr/La-Zakat_r30.html",
    sections: [
      {
        title: "La Zakât, le 3ème pilier de l'Islam 💎",
        content:
          "La Zakât est le TROISIÈME pilier de l'Islam. En arabe, Zakât veut dire « purification ». C'est comme nettoyer son argent en en donnant une petite partie aux pauvres ! Imagine que tu as beaucoup de bonbons et que tu en donnes quelques-uns aux enfants qui n'en n'ont pas — ça rend ton cœur heureux !",
        points: [
          "Zakât = Purification en arabe",
          "C'est obligatoire pour ceux qui ont assez d'argent",
          "Elle purifie l'âme et l'argent",
          "Allah promet une grande récompense à ceux qui la donnent",
        ],
      },
      {
        title: "📊 C'est combien ?",
        content:
          "La Zakât, c'est 2,5% de tes économies gardées pendant une année entière. C'est tout petit ! Pour 100€ économisés pendant un an, tu donnes seulement 2,50€. C'est peu pour toi mais beaucoup pour quelqu'un dans le besoin !",
        points: [
          "Le montant est de 2,5% (c'est-à-dire 2,5 sur 100)",
          "On la donne une fois par an",
          "On compte les économies qui ont été gardées pendant 1 an complet",
          "Les enfants ne sont pas obligés de la payer — mais ils peuvent toujours donner !",
        ],
      },
      {
        title: "👥 Qui reçoit la Zakât ?",
        content:
          "Le Coran nous dit qu'il y a 8 catégories de personnes qui peuvent recevoir la Zakât. Ce sont des gens qui en ont vraiment besoin :",
        points: [
          "🥺 Les pauvres qui n'ont pas assez pour manger",
          "👶 Les orphelins sans parents",
          "🧓 Les personnes âgées seules",
          "🚶 Les voyageurs perdus ou sans argent",
          "📚 Ceux qui étudient l'Islam",
          "🤝 Ceux qui aident à collecter la Zakât",
          "⛓️ Ceux qui veulent se libérer de l'esclavage",
          "❤️ Ceux dont le cœur doit être apaisé",
        ],
      },
      {
        title: "🎁 Zakât vs Sadaqa",
        content:
          "Il y a deux types de dons en Islam. La Zakât est OBLIGATOIRE, c'est comme un devoir. La Sadaqa est VOLONTAIRE, c'est comme un cadeau du cœur. Les deux sont très importants !",
        points: [
          "Zakât : obligatoire, montant fixe (2,5%), donne sur les économies",
          "Sadaqa : volontaire, montant libre, peut être n'importe quoi",
          "Le Prophète ﷺ disait que même un sourire est une Sadaqa !",
          "Allah multiplie la récompense de chaque bon geste",
        ],
      },
    ],
    funFacts: [
      "💡 Le savais-tu ? La Zakât protège ton argent ! Le Prophète ﷺ a dit que la Zakât est une protection pour les biens.",
      "💡 Le savais-tu ? Allah dit dans le Coran que ce que tu donnes en charité ne diminue jamais ta richesse — au contraire, elle augmente !",
      "💡 Le savais-tu ? Si tout le monde dans le monde donnait la Zakât, il n'y aurait plus de pauvreté sur Terre !",
    ],
    quiz: [
      {
        id: "zk-q1",
        question: "La Zakât est le quel pilier de l'Islam ?",
        options: ["1er", "2ème", "3ème", "4ème"],
        correctIndex: 2,
      },
      {
        id: "zk-q2",
        question: "Que signifie le mot Zakât ?",
        options: [
          "Richesse",
          "Purification",
          "Prière",
          "Charité",
        ],
        correctIndex: 1,
      },
      {
        id: "zk-q3",
        question: "C'est combien de pourcent des économies ?",
        options: ["1%", "2.5%", "5%", "10%"],
        correctIndex: 1,
      },
      {
        id: "zk-q4",
        question:
          "Quelle est la différence entre Zakât et Sadaqa ?",
        options: [
          "La Zakât est plus grande",
          "La Sadaqa est obligatoire",
          "La Zakât est obligatoire, la Sadaqa est volontaire",
          "Il n'y a pas de différence",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "ramadan",
    title: "Le Jeûne du Ramadan",
    emoji: "🌙",
    shortDescription:
      "Découvre le jeûne du Ramadan — le 4ème pilier de l'Islam !",
    colorFrom: "#8b5cf6",
    colorTo: "#7c3aed",
    colorBg: "bg-violet-50",
    colorBorder: "border-violet-300",
    colorText: "text-violet-700",
    colorBadge: "bg-violet-100 text-violet-800",
    sourceUrl:
      "https://www.doctrine-malikite.fr/Jeune-du-mois-de-Ramadan_r31.html",
    sections: [
      {
        title: "Le Ramadan, le 4ème pilier de l'Islam 🌙",
        content:
          "Le Ramadan est le MOIS le plus spécial pour les musulmans ! C'est le 9ème mois du calendrier lunaire. Pendant ce mois, les musulmans jeûnent du lever au coucher du soleil. Jeûner, ça veut dire ne pas manger, ne pas boire, et ne pas se disputer pendant la journée.",
        points: [
          "C'est le 4ème pilier de l'Islam",
          "Le Ramadan est le mois où le Coran a été révélé",
          "C'est un mois de patience, de prière et de solidarité",
        ],
      },
      {
        title: "🍽️ Les repas du Ramadan",
        content:
          "Pendant le Ramadan, on mange à deux moments spéciaux :",
        points: [
          "🌅 Le Suhur : le repas qu'on prend AVANT l'aube, très tôt le matin, avant que le soleil ne se lève",
          "🌇 L'Iftar : le repas pour ROMPRE le jeûne au coucher du soleil. On commence souvent par des dattes et de l'eau, comme le faisait le Prophète ﷺ",
          "On peut manger et boire normalement entre l'Iftar et le Suhur",
          "La table de l'Iftar est un moment de partage en famille et avec les amis",
        ],
      },
      {
        title: "⭐ La Nuit du Destin (Laylatul Qadr)",
        content:
          "Parmi les 10 derniers jours du Ramadan, il y a une nuit TOUT SPÉCIALE appelée « Laylatul Qadr » (la Nuit du Destin). C'est la meilleure nuit de toute l'année !",
        points: [
          "Elle vaut mieux que 1000 mois ! (environ 83 ans !)",
          "Personne ne sait exactement quelle nuit c'est",
          "On la cherche dans les nuits impaires des 10 derniers jours",
          "Le Prophète ﷺ faisait encore plus d'efforts pendant ces 10 jours",
        ],
      },
      {
        title: "🤲 Les prières de nuit (Tarawih)",
        content:
          "Pendant le Ramadan, on prie des prières spéciales la nuit appelées « Tarawih ». Elles sont priées après la prière d'Isha, à la mosquée ou à la maison.",
        points: [
          "Ce sont des prières supplémentaires",
          "On les prie chaque nuit du Ramadan",
          "C'est un moment de paix et de recueillement",
          "Beaucoup de mosquées finissent le Coran entier pendant le Ramadan",
        ],
      },
      {
        title: "❓ Qui est dispensé du jeûne ?",
        content:
          "Allah est Miséricordieux ! Certaines personnes n'ont pas besoin de jeûner :",
        points: [
          "👶 Les jeunes enfants (pas encore pubères)",
          "🤒 Les malades qui ne peuvent pas supporter le jeûne",
          "✈️ Les voyageurs (ils rattrapent plus tard)",
          "🤰 Les femmes enceintes ou qui allaitent",
          "👴 Les personnes très âgées et fragiles",
        ],
      },
      {
        title: "🎓 Ce que le jeûne nous apprend",
        content:
          "Le jeûne n'est pas juste ne pas manger ! C'est une école de vie qui nous apprend plein de choses :",
        points: [
          "🤲 La patience : on apprend à être patient quand on a faim",
          "🙏 La gratitude : on réalise la chance qu'on a d'avoir à manger",
          "❤️ La solidarité : on comprend comment se sentent les pauvres",
          "💪 La maîtrise de soi : on apprend à se contrôler",
          "🌟 La proximité avec Allah : on fait plus de prières et de bonnes actions",
        ],
      },
    ],
    funFacts: [
      "💡 Le savais-tu ? Le Prophète ﷺ a dit : « Celui qui jeûne le Ramadan avec foi et en espérant la récompense, tous ses péchés passés seront pardonnés ! »",
      "💡 Le savais-tu ? À la fin du Ramadan, il y a la fête de l'Aïd al-Fitr ! On donne la Zakât al-Fitr (une aumône spéciale) avant la prière de la fête pour que les pauvres puissent aussi fêter !",
      "💡 Le savais-tu ? Pendant le Ramadan, les portes du Paradis sont ouvertes, les portes de l'Enfer sont fermées et les démons sont enchaînés !",
    ],
    quiz: [
      {
        id: "rm-q1",
        question: "Le jeûne est le quel pilier de l'Islam ?",
        options: ["2ème", "3ème", "4ème", "5ème"],
        correctIndex: 2,
      },
      {
        id: "rm-q2",
        question:
          "Comment s'appelle le repas avant l'aube pendant le Ramadan ?",
        options: ["Iftar", "Suhur", "Tarawih", "Fajr"],
        correctIndex: 1,
      },
      {
        id: "rm-q3",
        question:
          "Dans quels 10 jours se trouve la Nuit du Destin ?",
        options: [
          "Les 10 premiers jours",
          "Les 10 jours du milieu",
          "Les 10 derniers jours",
          "Le dernier jour seulement",
        ],
        correctIndex: 2,
      },
      {
        id: "rm-q4",
        question:
          "La Nuit du Destin vaut mieux que combien de mois ?",
        options: ["100", "500", "1000", "2000"],
        correctIndex: 2,
      },
    ],
  },
];

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  totalStars: number;
}

export function getProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { completedLessons: [], quizScores: {}, totalStars: 0 };
  }
  try {
    const data = localStorage.getItem("mon-islam-facile-progress");
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // ignore
  }
  return { completedLessons: [], quizScores: {}, totalStars: 0 };
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("mon-islam-facile-progress", JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function calculateStars(score: number, totalQuestions: number): number {
  const percentage = (score / totalQuestions) * 100;
  if (percentage >= 90) return 3;
  if (percentage >= 60) return 2;
  if (percentage > 0) return 1;
  return 0;
}

export function getEncouragingMessage(
  score: number,
  totalQuestions: number
): string {
  const percentage = (score / totalQuestions) * 100;
  if (percentage === 100) return "Masha'Allah ! Parfait ! Tu es un champion ! 🏆";
  if (percentage >= 75) return "Bravo ! C'est très bien ! Continue comme ça ! 🌟";
  if (percentage >= 50) return "Bien joué ! Tu progresses ! Réessaie pour être encore meilleur ! 💪";
  return "Pas grave ! Relis la leçon et réessaie, tu vas y arriver ! 📖";
}
