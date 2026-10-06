/* Officielle tal — opdater årligt. Ingen estimater uden note. */
window.OEJNE = {
  daily: {
    date: "2026-09-29",
    label: "Indvandrere og efterkommere",
    value: "16,8 %",
    unit: "af befolkningen, 1. jan. 2026",
    text: "I 1980 var andelen 3,0 %. I dag er det 1.011.036 personer. 653.233 har ikke-vestlig oprindelse.",
    source: "Danmarks Statistik / Integrationsbarometeret (FOLK2, IEPCT)",
    sourceUrl: "https://www.dst.dk/da/Statistik/emner/borgere/befolkning/indvandrere-og-efterkommere"
  },
  quiz: [
    {
      id: "fert",
      q: "Hvor mange børn får en kvinde i Danmark i gennemsnit? (samlet fertilitet 2025)",
      choices: ["1,15", "1,51", "1,90", "2,10"],
      answer: 1,
      explain: "1.506 børn pr. 1.000 kvinder — altså 1,51 pr. kvinde. 2,1 kræves for at befolkningen erstatter sig selv uden indvandring. Der blev født 59.443 børn i 2025.",
      source: "Danmarks Statistik, fertilitet 2025",
      sourceUrl: "https://www.dst.dk/da/Statistik/emner/borgere/befolkning/fertilitet"
    },
    {
      id: "herkomst",
      q: "Hvor stor en andel af befolkningen er indvandrere eller efterkommere? (1. jan. 2026)",
      choices: ["8 %", "12 %", "16,8 %", "24 %"],
      answer: 2,
      explain: "16,8 % — 1.011.036 personer. I 1980 var andelen 3,0 %. Ikke-vestlig oprindelse: 653.233 personer.",
      source: "DST / Integrationsbarometeret",
      sourceUrl: "https://integrationsbarometer.dk/tal-og-analyser/INTEGRATION-STATUS-OG-UDVIKLING"
    },
    {
      id: "foedt",
      q: "Hvad var den naturlige befolkningstilvækst i 2025 (fødte minus døde)?",
      choices: ["\u221212.000", "+1.258", "+28.000", "+60.000"],
      answer: 1,
      explain: "59.443 fødte og 58.185 døde. Overskuddet var 1.258. Langt den største del af befolkningstilvæksten kom fra nettoindvandring.",
      source: "Danmarks Statistik, befolkningens bevægelser 2025",
      sourceUrl: "https://www.dst.dk/nyt/52702"
    },
    {
      id: "bistand",
      q: "Hvor mange milliarder kroner er sat af til udviklingsbistand i 2026 (0,7 % af BNI-rammen)?",
      choices: ["ca. 8 mia.", "ca. 15 mia.", "ca. 23 mia.", "ca. 41 mia."],
      answer: 2,
      explain: "Rammen er ca. 23 mia. kr. (0,7 % af BNI). En del af rammen dækker også flygtningemodtagelse og administration i Danmark.",
      source: "Udenrigsministeriet, udviklingspolitiske prioriteter 2026",
      sourceUrl: "https://um.dk/danida/strategi-og-prioriteter"
    },
    {
      id: "pension",
      q: "Hvad bruger staten ca. på folkepension i 2026?",
      choices: ["ca. 40 mia.", "ca. 90 mia.", "ca. 179 mia.", "ca. 320 mia."],
      answer: 2,
      explain: "Ca. 179 mia. kr. til folkepensionister i Danmark (finanslov / Beskæftigelsesministeriet). Det er den største enkelte indkomstoverførsel.",
      source: "Finansloven 2026, §17 folkepension",
      sourceUrl: "https://fm.dk/udgivelser/2026/marts/finanslov-for-finansaaret-2026"
    },
    {
      id: "forsvar",
      q: "Hvor store er Forsvarsministeriets udgifter på finansloven 2026?",
      choices: ["ca. 22 mia.", "ca. 40 mia.", "ca. 94 mia.", "ca. 180 mia."],
      answer: 2,
      explain: "§12 Forsvarsministeriet: ca. 94 mia. kr. NATO-opgørelsen (inkl. Ukrainefond m.m.) ligger højere som andel af BNP.",
      source: "Finansloven 2026, ministeroversigt",
      sourceUrl: "https://fm.dk/udgivelser/2026/marts/finanslov-for-finansaaret-2026"
    },
    {
      id: "erstatning",
      q: "Hvor mange børn skal en generation få i gennemsnit for at befolkningen erstatter sig selv — uden indvandring?",
      choices: ["1,5", "1,8", "2,1", "2,5"],
      answer: 2,
      explain: "Ca. 2,1 børn pr. kvinde. Danmark ligger på 1,51 (2025). Forskellen fyldes i praksis af indvandring og længere levetid.",
      source: "Demografisk standard / DST fertilitet",
      sourceUrl: "https://www.dst.dk/da/Statistik/emner/borgere/befolkning/fertilitet"
    }
  ],
  budget: {
    year: 2026,
    totalNote: "100 kr. = statens udgifter på finansloven 2026 (ca. 1.563 mia. kr.). Afrundet.",
    items: [
      { id: "pension", name: "Folkepension", official: 11, hint: "Indkomstoverførsel til pensionister" },
      { id: "sundhed", name: "Sundhed (statslig del)", official: 18, hint: "Indenrigs- og Sundhedsministeriet" },
      { id: "arbejde", name: "Beskæftigelse & overførsler i øvrigt", official: 21, hint: "Dagpenge, kontanthjælp, fleksjob m.m. minus folkepension" },
      { id: "forsvar", name: "Forsvar", official: 6, hint: "Forsvarsministeriet på finansloven" },
      { id: "uddannelse", name: "Uddannelse & forskning", official: 7, hint: "Uddannelses- + Børne- og Undervisningsministeriet" },
      { id: "bistand", name: "Ulandsbistand (0,7 %-rammen)", official: 1, hint: "Ca. 23 mia. kr." },
      { id: "andet", name: "Resten (trafik, justits, gæld, øvrige)", official: 36, hint: "Alt det, der ikke rammer overskrifterne" }
    ],
    source: "Finansloven 2026 (fm.dk) + UM bistandsramme. Andele afrundet til hele kroner — ikke en fuld kontoplan.",
    sourceUrl: "https://fm.dk/udgivelser/2026/marts/finanslov-for-finansaaret-2026"
  }
};
