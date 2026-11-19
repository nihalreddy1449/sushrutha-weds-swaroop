/*
  ============================================================
  EVERYTHING YOU MIGHT WANT TO CHANGE LIVES IN THIS FILE.
  Edit the text between the quotes, save (commit), and the
  website updates by itself in about a minute.
  Every text has "en" (English) and "te" (Telugu).
  ============================================================
*/
window.SITE = {

  /* ---------- The wedding ---------- */
  // Date/time of the muhurtham. Format: YYYY-MM-DDTHH:MM:SS+05:30
  muhurtham: "2026-11-25T20:35:00+05:30",
  // Used only for the "Add to Calendar" entry (covers muhurtham + dinner)
  calendarEnd: "2026-11-25T23:00:00+05:30",

  bride: {
    first:  { en: "Sushrutha", te: "సుశ్రుత" },
    full:   { en: "Venkata Sai Sushrutha", te: "వెంకట సాయి సుశ్రుత" },
    title:  { en: "Chi. La. Sou.", te: "చి॥ల॥సౌ॥" }
  },
  groom: {
    first:  { en: "Swaroop", te: "స్వరూప్" },
    full:   { en: "Naga Sundara Swaroop", te: "నాగ సుందర స్వరూప్" },
    title:  { en: "Chi.", te: "చి॥" }
  },

  /* ---------- Top of the page ---------- */
  blessingsTop: [
    { en: "Srirasthu", te: "శ్రీరస్తు" },
    { en: "Shubhamasthu", te: "శుభమస్తు" },
    { en: "Avighnamasthu", te: "అవిఘ్నమస్తు" }
  ],
  heroLine: {
    en: "Somu's Wedding Invitation",
    te: "సోము వారి వివాహ మహోత్సవ ఆహ్వాన పత్రిక"
  },

  /* ---------- Invocation ---------- */
  invocationLines: [
    { en: "Sree Seetha Ramachandra Parabrahmane Namah", te: "శ్రీ సీతారామచంద్ర పరబ్రహ్మణే నమః" },
    { en: "With the blessings of Bhadradri Sri Rama",    te: "భద్రాద్రి రాముని దివ్య ఆశీస్సులతో" }
  ],
  // Telugu verse as printed on the card (shown in both languages)
  sloka: [
    "జానక్యాః కమలామలాంజలి పుటేయాః పద్మరాగాయితాః",
    "న్యస్తా రాఘవ మస్తకేచ విలసత్కుంద ప్రసూనాయితాః ।",
    "స్రస్తాశ్యామల కాయకాంతి కలితా యా ఇంద్రనీలాయితాః",
    "ముక్తాస్తాశ్శుభదాభవంతు భవతాం శ్రీరామ వైవాహికాః ॥"
  ],

  /* ---------- Invitation ---------- */
  inviteIntro: {
    en: "We solicit your gracious presence with family & friends on the auspicious occasion of the marriage of our elder daughter",
    te: "శ్రీ సీతారామచంద్ర పరబ్రహ్మణే నమః. భద్రాద్రి రాముని దివ్య ఆశీస్సులతో, మా జ్యేష్ఠ పుత్రిక వివాహ మహోత్సవానికి మీరు సకుటుంబ సపరివార సమేతంగా విచ్చేయ ప్రార్థన."
  },
  tithiLine: {
    en: "Karthika Bahula Padyami · Sri Parabhava Nama Samvatsaram",
    te: "స్వస్తిశ్రీ చాంద్రమానేన శ్రీ పరాభవ నామ సంవత్సర కార్తిక బహుళ పాడ్యమి తత్కాల విదియ"
  },
  brideSide: {
    parents:  { en: "Sri Somu Bhaskara Reddy & Smt. Somu Venkata Ramani", te: "శ్రీ సోము భాస్కర రెడ్డి మరియు శ్రీమతి సోము వెంకట రమణి" },
    relation: { en: "elder daughter of", te: "గార్ల జ్యేష్ఠ పుత్రిక" }
  },
  groomSide: {
    homeLine: { en: "A.T. Agraharam, Guntur Dist.", te: "గుంటూరు జిల్లా, గుంటూరు నగరం, ఎ.టి.అగ్రహారం వాస్తవ్యులు" },
    // NOTE: the English card says "(Late)" after the mother's name; the Telugu card does not.
    // Please confirm and change here if needed.
    parents:  { en: "Sri Goli Hanumath Sastry & Smt. Goli Vijaya Lakshmi (Late)", te: "శ్రీ గోలి హనుమత్ శాస్త్రి మరియు శ్రీమతి గోలి విజయలక్ష్మి" },
    relation: { en: "younger son of", te: "గార్ల కనిష్ఠ పుత్రుడు" }
  },
  inviteOutro: {
    en: "The auspicious hour has been fixed in the presence of elders. We humbly request you to bless the newly-weds and accept our hospitality.",
    te: "ఇచ్చి వివాహము జరుపుటకు పెద్దల సమక్షమునందు సుముహూర్తము నిర్ణయించబడినది. కావున తామెల్లరు సకుటుంబ సపరివార సమేతముగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించి మా ఆతిథ్యమును స్వీకరించ ప్రార్థన."
  },

  /* ---------- Events (add/remove blocks freely) ---------- */
  venue: {
    name:    { en: "Kalyani Community Hall", te: "కళ్యాణి కమ్యూనిటీ హాల్" },
    address: { en: "Near ITC PSPD Plant, Sarapaka", te: "ITC PSPD ప్లాంట్ దగ్గర, సారపాక" },
    mapQuery: "Kalyani Community Hall, Near ITC PSPD Plant, Sarapaka"
  },
  events: [
    {
      key: "muhurtham",
      name:  { en: "Sumuhurtham", te: "సుముహూర్తం" },
      day:   { en: "Wednesday, 25 November 2026", te: "బుధవారం, 25 నవంబర్ 2026" },
      time:  { en: "08:35 PM", te: "రాత్రి 8:35 ని॥లకు" },
      note:  { en: "Mithuna Lagnam", te: "మిథున లగ్న పుష్కరాంశమందు" }
    },
    {
      key: "dinner",
      name:  { en: "Dinner", te: "విందు" },
      day:   { en: "Wednesday, 25 November 2026", te: "బుధవారం, 25 నవంబర్ 2026" },
      time:  { en: "From 09:00 PM", te: "రాత్రి 09:00 గం॥ నుండి" },
      note:  { en: "At the marriage venue", te: "కళ్యాణి కమ్యూనిటీ హాల్ నందు" }
    }
  ],

  /* ---------- Family ---------- */
  hosts: {
    heading: { en: "With warm regards", te: "మీ ఆగమనాభిలాషులు" },
    names: [
      { en: "Sri Somu Bhaskara Reddy", te: "శ్రీ సోము భాస్కర రెడ్డి" },
      { en: "Smt. Somu Venkata Ramani", te: "శ్రీమతి సోము వెంకట రమణి" }
    ]
  },
  /* ---------- Contact ---------- */
  contact: {
    phone: "+917989578107",      // used for the tap-to-call link
    display: "+91 7989578107",   // how the number is shown
    label: { en: "For any assistance", te: "ఏదైనా సహాయం కోసం" }
  },

  /* ---------- Gallery (placeholders until you add photos) ----------
     1) Upload photos into the assets/photos folder on GitHub.
     2) Add a line below for each, e.g.
        { src: "assets/photos/one.jpg", alt: { en: "The couple", te: "వధూవరులు" } },
  */
  gallery: [],

  /* ---------- Music ---------- */
  music: "assets/audio/mangala-vadyam.mp3"
};
