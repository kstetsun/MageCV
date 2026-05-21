// ======================
// ⚡ MODIFIERS SYSTEM
// ======================
// Handles all temporary buff and debuff logic.
// Modifiers are stored in activeModifiers[] in game state + localStorage.
//
// Modifier object shape:
// {
//   id:        string   — unique identifier e.g. "elf_bonus_resume"
//   label:     string   — shown in HUB UI (no score values, name only)
//   type:      string   — effect type (see MODIFIER TYPES below)
//   value:     number   — magnitude of the effect (can be negative)
//   duration:  string   — "instant" | "resume" | "day" | "multiday"
//   remaining: number   — resumes left / days left (ignored for instant)
// }
//
// MODIFIER TYPES:
//   "bonus_per_resume"     — adds flat value to each resume score
//   "penalty_reduction"    — reduces wrong-answer penalty (floors at 0)
//   "extra_resume_slot"    — increases daily resume limit for the day
//   "score_multiplier"     — multiplies final resume score (e.g. 1.5x)
//   "instant_score"        — one-time hidden score addition (applied immediately)
// ======================


// ======================
// APPLY — add a new modifier
// Called from npc.js after a dialogue choice resolves.
// ======================

function applyModifier(modifier) {
  if (modifier.duration === "instant") {
    _resolveInstant(modifier);
    return;
  }

  // Assign a unique id if not provided
  if (!modifier.id) {
    modifier.id = modifier.type + "_" + Date.now();
  }

  activeModifiers.push(modifier);
  saveField("activeModifiers", activeModifiers);

  console.log(`[Modifiers] Applied: ${modifier.label} (${modifier.duration}, ${modifier.remaining} remaining)`);
}


// ======================
// TICK — call after each resume is submitted
// Decrements "resume"-duration modifiers and removes expired ones.
// ======================

function tickResumeModifiers() {
  activeModifiers = activeModifiers
    .map(mod => {
      if (mod.duration === "resume") {
        return { ...mod, remaining: mod.remaining - 1 };
      }
      return mod;
    })
    .filter(mod => {
      if (mod.duration === "resume" && mod.remaining <= 0) {
        console.log(`[Modifiers] Expired: ${mod.label}`);
        return false;
      }
      return true;
    });

  saveField("activeModifiers", activeModifiers);
}


// ======================
// TICK — call at the start of each new day
// Decrements "day" and "multiday" modifiers and removes expired ones.
// Also clears "day"-duration modifiers entirely (they last current day only).
// ======================

function tickDayModifiers() {
  activeModifiers = activeModifiers
    .map(mod => {
      if (mod.duration === "multiday") {
        return { ...mod, remaining: mod.remaining - 1 };
      }
      return mod;
    })
    .filter(mod => {
      if (mod.duration === "day") {
        console.log(`[Modifiers] Expired (end of day): ${mod.label}`);
        return false;
      }
      if (mod.duration === "multiday" && mod.remaining <= 0) {
        console.log(`[Modifiers] Expired (multiday): ${mod.label}`);
        return false;
      }
      return true;
    });

  saveField("activeModifiers", activeModifiers);
}


// ======================
// CALCULATE — apply all active modifiers to a base resume score
// Called inside calculateResumeScore() in resume.js.
// Returns the final modified score (minimum 1 always enforced here).
// ======================

function applyModifiersToScore(baseScore) {
  let score = baseScore;
  let multiplier = 1;

  for (const mod of activeModifiers) {
    switch (mod.type) {
      case "bonus_per_resume":
        score += mod.value;
        break;

      case "penalty_reduction":
        // Reduce how much wrong answers hurt.
        // mod.value = how many penalty points to cancel (e.g. 1 cancels one -1)
        // Applied as a flat offset — cannot push score above ceiling.
        score += mod.value;
        break;

      case "score_multiplier":
        multiplier *= mod.value;
        break;

      case "extra_resume_slot":
        // Not applied to score — handled separately in resume.js
        break;

      case "instant_score":
        // Already resolved at apply time — skip
        break;
    }
  }

  score = Math.round(score * multiplier);

  // Hard floor: every resume always gives at least 1 point
  if (score < 1) score = 1;

  return score;
}


// ======================
// GET EXTRA RESUME SLOTS
// Returns how many extra resumes the player has today from active modifiers.
// Called in resume.js when checking daily limit.
// ======================

function getExtraResumeSlots() {
  return activeModifiers
    .filter(mod => mod.type === "extra_resume_slot")
    .reduce((total, mod) => total + mod.value, 0);
}


// ======================
// GET ACTIVE LABELS
// Returns array of label strings for HUB UI display.
// Never exposes score values — name only.
// ======================

function getActiveModifierLabels() {
  return activeModifiers.map(mod => mod.label);
}


// ======================
// CLEAR ALL — used on new game / win
// ======================

function clearModifiers() {
  activeModifiers = [];
  saveField("activeModifiers", activeModifiers);
}


// ======================
// INTERNAL — resolve instant modifiers immediately
// ======================

function _resolveInstant(modifier) {
  if (modifier.type === "instant_score") {
    hiddenScore += modifier.value;
    saveField("hiddenScore", hiddenScore);
    console.log(`[Modifiers] Instant score applied: +${modifier.value}`);
  }
  console.log(`[Modifiers] Instant resolved: ${modifier.label}`);
}


// ======================
// MODIFIER TEMPLATES
// Pre-built modifier objects for npc.js to use directly.
// Pass these into applyModifier().
// ======================

const ModifierTemplates = {

  // --- ELF modifiers (positive) ---

  elfBonusResume: (count = 2) => ({
    id: "elf_bonus_resume",
    label: "Elf's Blessing",
    type: "bonus_per_resume",
    value: 1,
    duration: "resume",
    remaining: count
  }),

  elfBonusDay: () => ({
    id: "elf_bonus_day",
    label: "Elf's Encouragement",
    type: "bonus_per_resume",
    value: 1,
    duration: "day",
    remaining: 1
  }),

  elfExtraSlot: () => ({
    id: "elf_extra_slot",
    label: "Elf's Introduction",
    type: "extra_resume_slot",
    value: 1,
    duration: "day",
    remaining: 1
  }),

  elfInstantBonus: () => ({
    id: "elf_instant",
    label: "Elf's Referral",
    type: "instant_score",
    value: 4,
    duration: "instant",
    remaining: 0
  }),

  // --- DWARF modifiers (neutral to slight negative) ---

  dwarfPenaltyReduction: () => ({
    id: "dwarf_penalty_reduction",
    label: "Dwarf's Blunt Advice",
    type: "penalty_reduction",
    value: 1,
    duration: "resume",
    remaining: 1
  }),

  dwarfSmallBonus: () => ({
    id: "dwarf_small_bonus",
    label: "Dwarf's Grudging Nod",
    type: "bonus_per_resume",
    value: 1,
    duration: "resume",
    remaining: 1
  }),

  dwarfDebuff: () => ({
    id: "dwarf_debuff",
    label: "Dwarf's Criticism",
    type: "bonus_per_resume",
    value: -1,
    duration: "resume",
    remaining: 2
  }),

  // --- WIZARD modifiers (chaotic — random pick at runtime) ---

  wizardMultiplier: () => ({
    id: "wizard_multiplier",
    label: "Wizard's Amplification",
    type: "score_multiplier",
    value: 1.5,
    duration: "resume",
    remaining: 2
  }),

  wizardDebuffMultiplier: () => ({
    id: "wizard_debuff_mult",
    label: "Wizard's Disruption",
    type: "score_multiplier",
    value: 0.5,
    duration: "resume",
    remaining: 2
  }),

  wizardInstantLarge: () => ({
    id: "wizard_instant_large",
    label: "Wizard's Fortune",
    type: "instant_score",
    value: 7,
    duration: "instant",
    remaining: 0
  }),

  wizardMultiday: () => ({
    id: "wizard_multiday",
    label: "Wizard's Enchantment",
    type: "bonus_per_resume",
    value: 1,
    duration: "multiday",
    remaining: 2
  })

};


// ======================
// RANDOM WIZARD MODIFIER
// Picks one of the wizard templates at random — used by npc.js
// ======================

function getRandomWizardModifier() {
  const wizardOptions = [
    ModifierTemplates.wizardMultiplier(),
    ModifierTemplates.wizardDebuffMultiplier(),
    ModifierTemplates.wizardInstantLarge(),
    ModifierTemplates.wizardMultiday()
  ];
  return wizardOptions[Math.floor(Math.random() * wizardOptions.length)];
}


// ======================
// EXPORTS
// ======================

window.applyModifier            = applyModifier;
window.tickResumeModifiers      = tickResumeModifiers;
window.tickDayModifiers         = tickDayModifiers;
window.applyModifiersToScore    = applyModifiersToScore;
window.getExtraResumeSlots      = getExtraResumeSlots;
window.getActiveModifierLabels  = getActiveModifierLabels;
window.clearModifiers           = clearModifiers;
window.ModifierTemplates        = ModifierTemplates;
window.getRandomWizardModifier  = getRandomWizardModifier;