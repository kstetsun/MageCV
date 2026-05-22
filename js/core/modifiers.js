// ======================
// ⚡ MODIFIERS SYSTEM — js/core/modifiers.js
// ======================
// Handles all temporary buff and debuff logic.
// Modifiers are stored in activeModifiers[] (global, game.js) + localStorage.
//
// Modifier object shape:
// {
//   id:        string   — unique identifier e.g. "elf_bonus_resume"
//   label:     string   — shown in HUB UI (name only, no score values)
//   type:      string   — effect type (see MODIFIER TYPES below)
//   value:     number   — magnitude of the effect (can be negative)
//   duration:  string   — "instant" | "resume" | "day" | "multiday"
//   remaining: number   — resumes left / days left (ignored for instant)
// }
//
// MODIFIER TYPES:
//   "bonus_per_resume"   — flat value added to each resume score
//   "penalty_reduction"  — reduces wrong-answer penalty (min 0)
//   "extra_resume_slot"  — increases daily resume limit for the day
//   "score_multiplier"   — multiplies final resume score (e.g. 1.5x)
//   "instant_score"      — one-time hiddenScore addition, applied immediately
// ======================


// ======================
// APPLY — add a new modifier to activeModifiers[]
// Called from npc.js after a dialogue choice resolves.
// "instant" duration modifiers are resolved immediately and not stored.
// ======================

function applyModifier(modifier) {
  if (!modifier) return;

  if (modifier.duration === "instant") {
    _resolveInstant(modifier);
    return;
  }

  // Assign a unique id if not provided
  if (!modifier.id) {
    modifier.id = modifier.type + "_" + Date.now();
  }

  // 4.4 — Push into activeModifiers[] global array
  activeModifiers.push(modifier);
  saveField("activeModifiers", activeModifiers);

  console.log(`[Modifiers] Applied: "${modifier.label}" | type: ${modifier.type} | duration: ${modifier.duration} | remaining: ${modifier.remaining}`);
}


// ======================
// TICK RESUME — call after each resume is submitted
// Decrements "resume"-duration modifiers by 1.
// Removes any whose remaining count hits 0.
// ======================

function tickResumeModifiers() {
  const before = activeModifiers.length;

  activeModifiers = activeModifiers
    .map(mod => {
      if (mod.duration === "resume") {
        return { ...mod, remaining: mod.remaining - 1 };
      }
      return mod;
    })
    .filter(mod => {
      if (mod.duration === "resume" && mod.remaining <= 0) {
        console.log(`[Modifiers] Expired (resume): "${mod.label}"`);
        return false;
      }
      return true;
    });

  if (activeModifiers.length !== before) {
    saveField("activeModifiers", activeModifiers);
  }
}


// ======================
// TICK DAY — call at the start of each new day (advanceDay in game.js)
// "day" duration: removed entirely (they lasted current day only)
// "multiday" duration: decremented by 1, removed at 0
// ======================

function tickDayModifiers() {
  const before = activeModifiers.length;

  activeModifiers = activeModifiers
    .map(mod => {
      if (mod.duration === "multiday") {
        return { ...mod, remaining: mod.remaining - 1 };
      }
      return mod;
    })
    .filter(mod => {
      if (mod.duration === "day") {
        console.log(`[Modifiers] Expired (end of day): "${mod.label}"`);
        return false;
      }
      if (mod.duration === "multiday" && mod.remaining <= 0) {
        console.log(`[Modifiers] Expired (multiday done): "${mod.label}"`);
        return false;
      }
      return true;
    });

  if (activeModifiers.length !== before) {
    saveField("activeModifiers", activeModifiers);
  }
}


// ======================
// CALCULATE — apply all active modifiers to a base resume score
// Called inside calculateResumeScore() in resume.js.
// Returns the final modified score. Hard floor of 1 always enforced.
// ======================

function applyModifiersToScore(baseScore) {
  let score      = baseScore;
  let multiplier = 1;

  for (const mod of activeModifiers) {
    switch (mod.type) {

      case "bonus_per_resume":
        // Flat addition (positive or negative)
        score += mod.value;
        break;

      case "penalty_reduction":
        // Cancels out wrong-answer penalties
        // mod.value = how many penalty points to absorb
        score += mod.value;
        break;

      case "score_multiplier":
        // Compound multipliers if multiple are active
        multiplier *= mod.value;
        break;

      case "extra_resume_slot":
        // Handled by getExtraResumeSlots() — not a score modifier
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
// EXTRA RESUME SLOTS
// Returns total extra daily resume slots from active modifiers.
// Called in resume.js getDailyResumeLimit().
// ======================

function getExtraResumeSlots() {
  return activeModifiers
    .filter(mod => mod.type === "extra_resume_slot")
    .reduce((total, mod) => total + mod.value, 0);
}


// ======================
// ACTIVE MODIFIER LABELS
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
  if (typeof saveField === "function") {
    saveField("activeModifiers", activeModifiers);
  }
  console.log("[Modifiers] All modifiers cleared.");
}


// ======================
// INTERNAL — resolve instant modifiers immediately on apply
// ======================

function _resolveInstant(modifier) {
  if (modifier.type === "instant_score") {
    if (typeof hiddenScore !== "undefined") {
      hiddenScore += modifier.value;
      if (typeof saveField === "function") {
        saveField("hiddenScore", hiddenScore);
      }
      console.log(`[Modifiers] Instant score: +${modifier.value} → hiddenScore now ${hiddenScore}`);
    }
  }
  console.log(`[Modifiers] Instant resolved: "${modifier.label}"`);
}


// ======================
// MODIFIER TEMPLATES
// Pre-built modifier factory functions for npc.js to call directly.
// Each returns a fresh modifier object — never reuse the same reference.
// ======================

const ModifierTemplates = {

  // --- ELF (positive, supportive) ---

  // +1 to each of the next N resumes
  elfBonusResume: (count = 2) => ({
    id:        "elf_bonus_resume_" + Date.now(),
    label:     "Elf's Blessing",
    type:      "bonus_per_resume",
    value:     1,
    duration:  "resume",
    remaining: count
  }),

  // +1 to all resumes for the rest of today
  elfBonusDay: () => ({
    id:        "elf_bonus_day_" + Date.now(),
    label:     "Elf's Encouragement",
    type:      "bonus_per_resume",
    value:     1,
    duration:  "day",
    remaining: 1
  }),

  // +1 extra resume slot today only
  elfExtraSlot: () => ({
    id:        "elf_extra_slot_" + Date.now(),
    label:     "Elf's Introduction",
    type:      "extra_resume_slot",
    value:     1,
    duration:  "day",
    remaining: 1
  }),

  // Instant +4 to hiddenScore
  elfInstantBonus: () => ({
    id:        "elf_instant_" + Date.now(),
    label:     "Elf's Referral",
    type:      "instant_score",
    value:     4,
    duration:  "instant",
    remaining: 0
  }),


  // --- DWARF (neutral to slightly negative) ---

  // Absorbs 1 penalty point on next resume
  dwarfPenaltyReduction: () => ({
    id:        "dwarf_penalty_" + Date.now(),
    label:     "Dwarf's Blunt Advice",
    type:      "penalty_reduction",
    value:     1,
    duration:  "resume",
    remaining: 1
  }),

  // +1 on next resume only
  dwarfSmallBonus: () => ({
    id:        "dwarf_small_" + Date.now(),
    label:     "Dwarf's Grudging Nod",
    type:      "bonus_per_resume",
    value:     1,
    duration:  "resume",
    remaining: 1
  }),

  // -1 on next 2 resumes
  dwarfDebuff: () => ({
    id:        "dwarf_debuff_" + Date.now(),
    label:     "Dwarf's Criticism",
    type:      "bonus_per_resume",
    value:     -1,
    duration:  "resume",
    remaining: 2
  }),


  // --- WIZARD (chaotic — picked randomly by getRandomWizardModifier) ---

  // 1.5x multiplier on next 2 resumes
  wizardMultiplier: () => ({
    id:        "wizard_mult_" + Date.now(),
    label:     "Wizard's Amplification",
    type:      "score_multiplier",
    value:     1.5,
    duration:  "resume",
    remaining: 2
  }),

  // 0.5x multiplier on next 2 resumes
  wizardDebuffMultiplier: () => ({
    id:        "wizard_debuff_mult_" + Date.now(),
    label:     "Wizard's Disruption",
    type:      "score_multiplier",
    value:     0.5,
    duration:  "resume",
    remaining: 2
  }),

  // Instant large score bonus
  wizardInstantLarge: () => ({
    id:        "wizard_instant_" + Date.now(),
    label:     "Wizard's Fortune",
    type:      "instant_score",
    value:     7,
    duration:  "instant",
    remaining: 0
  }),

  // +1 per resume for next 2 days
  wizardMultiday: () => ({
    id:        "wizard_multiday_" + Date.now(),
    label:     "Wizard's Enchantment",
    type:      "bonus_per_resume",
    value:     1,
    duration:  "multiday",
    remaining: 2
  })
};


// ======================
// RANDOM WIZARD MODIFIER
// Called by npc.js for wizard interactions.
// Player choice is irrelevant — wizard is always chaotic.
// ======================

function getRandomWizardModifier() {
  const options = [
    ModifierTemplates.wizardMultiplier(),
    ModifierTemplates.wizardDebuffMultiplier(),
    ModifierTemplates.wizardInstantLarge(),
    ModifierTemplates.wizardMultiday()
  ];
  return options[Math.floor(Math.random() * options.length)];
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

// Export commonly-used modifier helpers for other scripts
if (typeof ModifierTemplates !== 'undefined') {
  window.ModifierTemplates = ModifierTemplates;
}
if (typeof applyModifier === 'function') {
  window.applyModifier = applyModifier;
}
if (typeof getRandomWizardModifier === 'function') {
  window.getRandomWizardModifier = getRandomWizardModifier;
}