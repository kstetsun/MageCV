// ======================
// JOB CARDS DATA
// ======================

// Minimal sample job cards for MageCV — each card includes correctAnswers
// used by resume.js. This file intentionally small for testing purposes.
//
// NOTE: description fields contain <strong> tags marking the 3 answer clues
// (plant / photo-tone / season). Render with element.innerHTML, not textContent.

const jobCards = [
  {
    id: "job_001",
    title: "Potion Master's Research Assistant",
    description: "This demanding role has <strong>no room for error</strong>: you will document every growth stage of our <strong>cactus</strong> collection with strict precision. Daily care peaks during <strong>high summer</strong>, when arid conditions test even seasoned assistants. We expect unwavering attention, and nothing less.",
    correctAnswers: { plant: "cactus", photo: "serious", date: "summer_solstice" }
  },
  {
    id: "job_002",
    title: "Royal Garden Coordinator",
    description: "We seek a <strong>warm, people-oriented team-player</strong> to brighten the castle grounds through <strong>deep winter</strong>. You will welcome visitors with genuine cheer while tending our prized <strong>flower</strong> beds in the enchanted greenhouse. Yes, the greenhouse is heated; no, you may not move in.",
    correctAnswers: { plant: "flower", photo: "smile", date: "winter_solstice" }
  },
  {
    id: "job_003",
    title: "Enchanted Forest Restoration Warden",
    description: "A <strong>rigorous, exacting</strong> role for someone who works well under pressure during the <strong>longest days of the year</strong>. You will oversee the recovery of our ancient <strong>fern</strong> groves with <strong>zero tolerance</strong> for missed data. The forest does not accept excuses, and neither do we.",
    correctAnswers: { plant: "fern", photo: "serious", date: "summer_solstice" }
  },
  {
    id: "job_004",
    title: "Drought-Resistant Crop Specialist",
    description: "Our research runs through the <strong>frost season</strong> and demands <strong>meticulous, exacting</strong> attention at every stage. Each <strong>cactus</strong> in the collection must be tracked with absolute precision — there is <strong>no room for error</strong> when results must be perfect.",
    correctAnswers: { plant: "cactus", photo: "serious", date: "winter_solstice" }
  },
  {
    id: "job_005",
    title: "Herbalist for the Crown",
    description: "We need <strong>calm, impartial judgment</strong> through our <strong>peak midsummer</strong> harvest. Every <strong>flower</strong> entering the apothecary is assessed with <strong>measured fairness</strong>, and our records must stay consistent. Personal favorites are noted, then politely ignored.",
    correctAnswers: { plant: "flower", photo: "neutral", date: "summer_solstice" }
  },
  {
    id: "job_006",
    title: "Whimsical Herb Garden Maestro",
    description: "We need an enthusiastic <strong>team-player</strong> with <strong>genuine warmth</strong> to host visitors during our <strong>midwinter</strong> open days. Your cheerful energy will make our shade-loving <strong>fern</strong> displays feel alive and welcoming. If guests leave without adopting a houseplant, we have questions.",
    correctAnswers: { plant: "fern", photo: "smile", date: "winter_solstice" }
  },
  {
    id: "job_007",
    title: "Desert Botanist for Hire",
    description: "This field expedition runs through the <strong>longest days of the year</strong> and calls for <strong>real enthusiasm</strong> in challenging terrain. You will nurture each <strong>cactus</strong> with <strong>joyful dedication</strong>, and your positive, collaborative energy will carry the whole team. Gloves provided; optimism is not.",
    correctAnswers: { plant: "cactus", photo: "smile", date: "summer_solstice" }
  },
  {
    id: "job_008",
    title: "Ceremonial Floral Arranger Supreme",
    description: "A demanding, high-stakes position running through <strong>deep winter</strong> with absolutely <strong>no room for error</strong>. Every <strong>flower</strong> must be placed with <strong>strict precision</strong>, as our arrangements reflect the uncompromising standards of the Crown. Meticulous candidates only.",
    correctAnswers: { plant: "flower", photo: "serious", date: "winter_solstice" }
  },
  {
    id: "job_009",
    title: "Mystical Forest Keeper",
    description: "We need <strong>fair, balanced judgment</strong> through the warm <strong>midsummer</strong> season to oversee our most precious woodland program. Each <strong>fern</strong> is logged with <strong>measured objectivity</strong>, and our records must stay consistent and impartial.",
    correctAnswers: { plant: "fern", photo: "neutral", date: "summer_solstice" }
  },
  {
    id: "job_010",
    title: "Desert Oasis Maintenance Supervisor",
    description: "Our facility operates through <strong>deep winter</strong> and requires steady, professional composure at all times. Every <strong>cactus</strong> in the collection is assessed with <strong>calm, objective observation</strong> and recorded without bias. Your measured approach keeps our standards consistent.",
    correctAnswers: { plant: "cactus", photo: "neutral", date: "winter_solstice" }
  },
  {
    id: "job_011",
    title: "Bloom Festival Organizer",
    description: "We are looking for a <strong>warm, people-oriented</strong> candidate to lead our grand festival during the <strong>longest days of the year</strong>. You will arrange <strong>flower</strong> displays with <strong>genuine enthusiasm and infectious cheer</strong>, and the crowds will love you for it.",
    correctAnswers: { plant: "flower", photo: "smile", date: "summer_solstice" }
  },
  {
    id: "job_012",
    title: "Ancient Woodland Archivist",
    description: "This role runs through the <strong>frost season</strong> and demands <strong>strict, unwavering discipline</strong> in every record we keep. Our ancient <strong>fern</strong> archive is irreplaceable, and each entry is documented with <strong>zero tolerance</strong> for mistakes. A demanding position for truly exacting standards.",
    correctAnswers: { plant: "fern", photo: "serious", date: "winter_solstice" }
  },
  {
    id: "job_013",
    title: "Succulent Garden Director",
    description: "Leading our <strong>midsummer</strong> expansion requires <strong>meticulous planning and rigorous standards</strong> across the entire arid wing. Every <strong>cactus</strong> must reach absolute perfection under your exacting supervision — <strong>no room for error</strong> at this level.",
    correctAnswers: { plant: "cactus", photo: "serious", date: "summer_solstice" }
  },
  {
    id: "job_014",
    title: "Seasonal Botanist",
    description: "Our <strong>deep winter</strong> observation program calls for <strong>calm, impartial judgment</strong> and a consistent, professional approach. Each <strong>flower</strong> is evaluated with <strong>measured fairness</strong> and logged without personal bias at every stage. Your balanced assessments keep our records trustworthy.",
    correctAnswers: { plant: "flower", photo: "neutral", date: "winter_solstice" }
  },
  {
    id: "job_015",
    title: "Enchantment Grove Specialist",
    description: "During the <strong>longest, warmest days of the year</strong>, our enchanted grove needs someone with <strong>genuine warmth and a welcoming presence</strong>. Visitors love seeing each <strong>fern</strong> tended by someone who truly enjoys the work — and it shows.",
    correctAnswers: { plant: "fern", photo: "smile", date: "summer_solstice" }
  },
  {
    id: "job_016",
    title: "Arid Climate Researcher",
    description: "Our field team heads out through <strong>deep winter</strong> and needs <strong>real enthusiasm</strong> for tough conditions. You will nurture every <strong>cactus</strong> with <strong>positive energy and a collaborative spirit</strong> that lifts the whole expedition. Pack warm; enthusiasm is mandatory.",
    correctAnswers: { plant: "cactus", photo: "smile", date: "winter_solstice" }
  },
  {
    id: "job_017",
    title: "Royal Floral Authority",
    description: "This prestigious <strong>midsummer</strong> appointment demands <strong>exacting standards and zero tolerance</strong> for anything less than perfection. Every <strong>flower</strong> represents the Crown and must be handled with meticulous, unwavering discipline. Rigorous candidates will feel at home here.",
    correctAnswers: { plant: "flower", photo: "serious", date: "summer_solstice" }
  },
  {
    id: "job_018",
    title: "Mystical Fern Cultivator",
    description: "Running through the <strong>frost season</strong>, this role demands <strong>strict focus</strong> and absolutely <strong>no room for error</strong> in our most delicate program. Each <strong>fern</strong> must meet our rigorous benchmarks without exception. Only the most disciplined candidates should apply.",
    correctAnswers: { plant: "fern", photo: "serious", date: "winter_solstice" }
  },
  {
    id: "job_019",
    title: "Greenhouse Operations Manager",
    description: "Our <strong>midsummer</strong> operations require <strong>calm, fair management</strong> across the entire arid collection. Each <strong>cactus</strong> is assessed with <strong>measured objectivity</strong> in every quarterly review and evaluated without bias. Consistent, professional judgment is the backbone of this role.",
    correctAnswers: { plant: "cactus", photo: "neutral", date: "summer_solstice" }
  },
  {
    id: "job_020",
    title: "Festive Petal Arrangement Artist",
    description: "Our <strong>deep winter</strong> celebrations need someone with <strong>infectious enthusiasm and a warm, welcoming presence</strong>. You will create stunning <strong>flower</strong> displays with joyful, people-oriented energy that makes every arrangement feel like a gift.",
    correctAnswers: { plant: "flower", photo: "smile", date: "winter_solstice" }
  },
  {
    id: "job_021",
    title: "Wilderness Preservation Officer",
    description: "During the <strong>longest days of the year</strong>, our conservation mission needs <strong>genuine warmth and collaborative energy</strong>. Your <strong>welcoming, people-oriented</strong> approach makes protecting every <strong>fern</strong> feel like a celebration rather than a chore.",
    correctAnswers: { plant: "fern", photo: "smile", date: "summer_solstice" }
  },
  {
    id: "job_022",
    title: "Cactus Hybridization Technician",
    description: "Our most exciting breeding program runs through <strong>deep winter</strong> and calls for <strong>real, infectious enthusiasm</strong>. Your <strong>cheerful, collaborative spirit</strong> makes <strong>cactus</strong> development genuinely inspiring — yes, we said inspiring, and we meant it.",
    correctAnswers: { plant: "cactus", photo: "smile", date: "winter_solstice" }
  },
  {
    id: "job_023",
    title: "Botanical Assessment Officer",
    description: "We need <strong>steady, impartial judgment</strong> during our <strong>peak midsummer</strong> review cycle. Every <strong>flower</strong> is assessed with <strong>measured objectivity</strong> and recorded fairly at each stage. A calm, professional approach keeps our records trustworthy.",
    correctAnswers: { plant: "flower", photo: "neutral", date: "summer_solstice" }
  },
  {
    id: "job_024",
    title: "Primordial Fern Recovery Specialist",
    description: "This critical program runs through the <strong>frost season</strong> and demands <strong>unwavering focus and zero tolerance</strong> for mistakes. Each <strong>fern</strong> faces harsh recovery conditions and must be monitored with <strong>strict, exacting discipline</strong> every single day. The most demanding role we have ever posted.",
    correctAnswers: { plant: "fern", photo: "serious", date: "winter_solstice" }
  },
  {
    id: "job_025",
    title: "Castle Grounds Keeper",
    description: "Our prestigious estate needs <strong>calm, objective management</strong> during the warm <strong>midsummer</strong> season. Each <strong>cactus</strong> on the grounds is assessed with <strong>measured fairness</strong> in every monthly inspection, and your impartial, professional approach keeps everything looking its finest.",
    correctAnswers: { plant: "cactus", photo: "neutral", date: "summer_solstice" }
  }
];

// Make available on window for legacy scripts
window.jobCards = jobCards;