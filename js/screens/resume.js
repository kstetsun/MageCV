// ======================
// 📄 RESUME SCREEN — js/screens/resume.js
// ======================
// Responsibilities:
//   2.4 — reads daily resume limit from gameMode (not hardcoded)
//   2.5 — correct answers driven by active job card from jobCards.js
//   2.6 — random job card selected on page load, displayed in UI
//   2.7 — checkWin() called after every submitResume()
//   4.1 — NPC spawn check on page load and after submit
//   4.2 — write npcPending to localStorage before redirecting to npc.html
//   5.2 — applyModifiersToScore() called inside calculateResumeScore()
//   5.3 — tickResumeModifiers() called after every successful submitResume()
//   6.1 — job card modal opens automatically on page load and after each submit
//   6.2 — "View card" button in banner re-opens modal at any time
//   6.3 — job card rendered as pure HTML via buildJobCardHTML(), no img tag
// ======================


// ======================
// 📋 ACTIVE JOB CARD
// ======================

let activeJobCard = null;


// ======================
// 6.3 — HTML JOB CARD BUILDER
// Renders the job card as pure HTML — no img tag.
// size: "full" (modal) | "mini" (banner strip)
//
// Card sections:
//   Header  — job title + photo smiley face
//   Body    — plant description mentioning the plant emoji 3 times
//   Footer  — application deadline (driven by correctAnswers.date)
//
// Photo → smiley map:
//   neutral  → 😐
//   smile    → 😊
//   serious  → 🧐
//
// Plant → emoji map:
//   cactus   → 🌵
//   flower   → 🌷
//   fern     → 🌿
//
// Date → deadline label map:
//   correct  → deadline label with a plausible near-future date
//   wrong    → same label but one day off (visually subtle)
// ======================

const PHOTO_EMOJI = {
  neutral: "😐",
  smile:   "😊",
  serious: "🧐"
};

const PLANT_EMOJI = {
  cactus: "🌵",
  flower: "🌷",
  fern:   "🌿"
};

const DATE_LABELS = {
  summer_solstice: "Summer Solstice",
  winter_solstice: "Winter Solstice"
};

function _deadlineLabel(dateOption) {
  const label = DATE_LABELS[dateOption] ?? dateOption;
  return `📅 Apply by ${label}`;
}

function _plantLine(plantType, baseDesc) {
  const desc = baseDesc ? baseDesc.trim() : "A position for a dedicated mage.";
  return desc;
}


function buildJobCardHTML(card, size) {
  if (!card) return "<p>No card loaded.</p>";

  const desc      = card.description ? card.description.trim() : "A position for a dedicated mage.";
  const sizeClass = size === "mini" ? "jc jc--mini" : "jc jc--full";

  if (size === "mini") {
    return `
      <div class="${sizeClass}">
        <div class="jc__header">
          <span class="jc__title">${_esc(card.title)}</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="${sizeClass}">
      <div class="jc__header">
        <span class="jc__title">${_esc(card.title)}</span>
      </div>
      <div class="jc__body">
        <p class="jc__desc">${desc}</p>
      </div>
    </div>
  `;
}

// Minimal HTML escape — prevents title/desc injecting markup.
function _esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


// ======================
// 6.1 / 6.2 — JOB CARD MODAL
// ======================

function openJobCardModal() {
  const modal = document.getElementById("jobCardModal");
  if (!modal) return;
  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
}

function closeJobCardModal() {
  const modal = document.getElementById("jobCardModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
}

// Closes modal only when the dark backdrop itself is clicked.
function handleModalOverlayClick(event) {
  if (event.target === document.getElementById("jobCardModal")) {
    closeJobCardModal();
  }
}

// Render the card into both mount points and open the modal.
function _renderJobCard(card) {
  const modalSlot = document.getElementById("jobCardRenderModal");
  const stripSlot = document.getElementById("jobCardRenderStrip");

  if (!modalSlot) {
    console.error("[Resume] Modal render slot not found.");
    return;
  }

  modalSlot.innerHTML = buildJobCardHTML(card, "full");
  if (stripSlot) stripSlot.innerHTML = buildJobCardHTML(card, "mini");  // optional now
}

// ======================
// 2.6 — LOAD & DISPLAY JOB CARD
// ======================

function loadJobCard() {
  console.log("[Resume] loadJobCard() called");
  console.log("[Resume] jobCards available:", typeof jobCards !== "undefined" ? jobCards.length : "NOT DEFINED");

  if (!jobCards || jobCards.length === 0) {
    console.error("[Resume] No job cards found in jobCards.js");
    return;
  }

  activeJobCard = jobCards[Math.floor(Math.random() * jobCards.length)];
  console.log("[Resume] Loaded random job card:", activeJobCard.title);

  // 6.3 — Render HTML card into both slots (but DO NOT auto-open modal)
  _renderJobCard(activeJobCard);
  
  console.log(`[Resume] Job card loaded: ${activeJobCard.title}`);
}


// ======================
// 📄 RESUME STATE
// ======================

let resume = {
  plant: null,
  photo: null,
  date:  null
};


// ======================
// SELECTION HANDLERS
// ======================

function clearSelection(group) {
  document.querySelectorAll(`[data-group="${group}"]`)
    .forEach(btn => btn.classList.remove("selected"));
}

function selectPlant(type, btn) {
  resume.plant = type;
  clearSelection("plant");
  btn.classList.add("selected");
  updateSummaryChip("summaryPlant", btn.querySelector("span").textContent);
}
 
function selectPhoto(type, btn) {
  resume.photo = type;
  clearSelection("photo");
  btn.classList.add("selected");
  updateSummaryChip("summaryPhoto", btn.querySelector("span").textContent);
}
 
function selectDate(type, btn) {
  resume.date = type;
  clearSelection("date");
  btn.classList.add("selected");
  updateSummaryChip("summaryDate", btn.querySelector("span:last-child").textContent);
}
 
function updateSummaryChip(id, label) {
  const el = document.getElementById(id);
  if (!el) return;   // summary bar removed — guard against null
  el.textContent = label;
  el.classList.remove("summary-chip--empty");
}
 


// ======================
// 2.5 + 5.2 — SCORE CALCULATION
// ======================

function calculateResumeScore() {
  if (!activeJobCard) {
    console.warn("[Resume] No active job card — returning minimum score 1.");
    return 1;
  }

  const correct = activeJobCard.correctAnswers;
  let base = 0;

  if (resume.plant !== null) {
    const hit = resume.plant === correct.plant;
    base += hit ? 1 : -1;
    console.log(`[Resume] Plant "${resume.plant}" → ${hit ? "+1 ✓" : "-1 ✗"}`);
  }

  if (resume.photo !== null) {
    const hit = resume.photo === correct.photo;
    base += hit ? 1 : -1;
    console.log(`[Resume] Photo "${resume.photo}" → ${hit ? "+1 ✓" : "-1 ✗"}`);
  }

  if (resume.date !== null) {
    const hit = resume.date === correct.date;
    base += hit ? 1 : -1;
    console.log(`[Resume] Date "${resume.date}" → ${hit ? "+1 ✓" : "-1 ✗"}`);
  }

  if (base < 1) base = 1;

  const finalScore = (typeof applyModifiersToScore === "function")
    ? applyModifiersToScore(base)
    : base;

  console.log(`[Resume] Score: base=${base} → after modifiers=${finalScore}`);
  return finalScore;
}


// ======================
// 2.4 — DAILY RESUME LIMIT
// ======================

function getDailyResumeLimit() {
  const base = (typeof getConfig === "function")
    ? getConfig().resumesPerDay
    : 5;

  const extra = (typeof getExtraResumeSlots === "function")
    ? getExtraResumeSlots()
    : 0;

  return base + extra;
}

function isResumeLimitReached() {
  return resumesToday >= getDailyResumeLimit();
}


// ======================
// 📨 SUBMIT RESUME
// ======================

function submitResume() {

  if (typeof saveGame !== "function" || typeof goHub !== "function") {
    alert("Core game scripts not loaded. Please reload the page.");
    return;
  }

  if (!resume.plant || !resume.photo || !resume.date) {
    showResumeMessage("Please select all resume components before submitting.");
    return;
  }

  if (isResumeLimitReached()) {
    showResumeMessage("You've reached today's resume limit. Head back to the HUB!");
    return;
  }

  const gained = calculateResumeScore();

  hiddenScore      += gained;
  resumesToday     += 1;
  resumesSentTotal += 1;

  if (typeof tickResumeModifiers === "function") {
    tickResumeModifiers();
  }

  saveGame({
    hiddenScore,
    resumesSentToday: resumesToday,
    resumesSentTotal,
    activeModifiers
  });

  showResumeMessage(getSubmitFeedback(gained));

  resume = { plant: null, photo: null, date: null };
  clearAllSelections();
  updateResumeCounter();

  if (typeof checkWin === "function" && checkWin()) return;

  if (isResumeLimitReached()) {
    showDailyLimitReached();
    return;
  }

  trySpawnNPCFromResume();

  // loadJobCard renders the new card and auto-opens the modal (6.1 / 6.3)
  loadJobCard();
}


// ======================
// 4.1 — NPC SPAWN TRIGGER (Resume Room)
// ======================

function trySpawnNPCFromResume() {
  if (typeof npcInteractionsToday === "undefined" ||
      typeof npcInteractionsLimit === "undefined") return;

  if (npcInteractionsToday >= npcInteractionsLimit) return;

  const save = (typeof loadRaw === "function") ? loadRaw() : {};
  if (save.npcPending) return;

  // ── NPC spawn eligibility by mode ────────────────────────────────────────
  const isFirstNPCToday = npcInteractionsToday === 0;

  if (mode === "demo") {
    // 1st NPC: guaranteed on resume 1 or 2 (50% on 1, 100% on 2 if missed)
    // 2nd NPC: guaranteed on resume 4 or 5 (50% on 4, 100% on 5 if missed)
    if (isFirstNPCToday) {
      if (resumesSentTotal === 1)      { if (Math.random() > 0.50) return; }
      else if (resumesSentTotal === 2) { /* guaranteed */ }
      else return;
    } else {
      if (resumesSentTotal === 4)      { if (Math.random() > 0.50) return; }
      else if (resumesSentTotal === 5) { /* guaranteed */ }
      else return;
    }
  } else {
    // long mode — evenly spread across day, min 2 guaranteed per day
    // Divide 10 resumes into npcInteractionsLimit equal slots.
    // Within each slot: 50% chance per resume, 100% on last resume of slot.
    // No NPC before first resume of the day.
    if (resumesToday < 1) return;

    const resumesPerDay = getConfig().resumesPerDay;
    const slotSize      = Math.floor(resumesPerDay / npcInteractionsLimit);
    const currentSlot   = Math.floor((resumesToday - 1) / slotSize);

    // Past all slots → no more NPCs
    if (currentSlot >= npcInteractionsLimit) return;

    // This slot belongs to a different NPC index → not our turn yet
    if (currentSlot !== npcInteractionsToday) return;

    const posInSlot = ((resumesToday - 1) % slotSize) + 1;
    const isLastInSlot = posInSlot >= slotSize;

    if (!isLastInSlot && Math.random() > 0.50) return;
    // isLastInSlot → guaranteed, no random check
  }
  // ─────────────────────────────────────────────────────────────────────────

  const npc = (typeof getRandomNPC === "function") ? getRandomNPC() : null;
  if (!npc) return;

  console.log(`[Resume] NPC spawned: ${npc.name}`);
  spawnNPCEventFromResume(npc.id);
}


// ======================
// 4.2 — WRITE npcPending + REDIRECT
// ======================

function spawnNPCEventFromResume(npcId) {
  if (typeof saveField !== "function") {
    console.warn("[Resume] saveField() not available — cannot spawn NPC.");
    return;
  }

  saveField("npcPending", {
    npcId:        npcId,
    originScreen: "resume.html"
  });

  console.log(`[Resume] npcPending saved: ${npcId} → return to resume.html`);

  setTimeout(() => {
    window.location.href = "npc.html";
  }, 1200);
}


// ======================
// UI HELPERS
// ======================

function clearAllSelections() {
  ["plant", "photo", "date"].forEach(group => clearSelection(group));
}

let _resumeMsgTimer = null;
 
function showResumeMessage(text) {
  const el = document.getElementById("resumeMessage");
  if (el) {
    el.innerText = text;
    el.classList.add("is-visible");
    clearTimeout(_resumeMsgTimer);
    _resumeMsgTimer = setTimeout(() => {
      el.classList.remove("is-visible");
    }, 3000);
  } else {
    console.log("[Resume Message]", text);
  }
}
 
function showDailyLimitReached() {
  const el = document.getElementById("resumeMessage");
  if (el) {
    clearTimeout(_resumeMsgTimer);          // stays up, no auto-hide
    el.innerText = "All resumes sent for today. Head back to the HUB!";
    el.classList.add("is-visible");
  }
  const btn = document.getElementById("submitResumeBtn");
  if (btn) btn.disabled = true;
}

function getSubmitFeedback(score) {
  if (score >= 3) return "Excellent resume! The employer seems very interested.";
  if (score === 2) return "Good resume. Solid choices.";
  if (score === 1) return "Resume sent. Room for improvement, but it counts.";
  return "Resume sent. Keep trying!";
}

function updateResumeCounter() {
  const limit = getDailyResumeLimit();
  const el    = document.getElementById("resumesTodayDisplay");
  if (el) el.innerText = `${resumesToday} / ${limit}`;
}

function updateModifierDisplay() {
  const el = document.getElementById("activeModifiersResume");
  if (!el) return;
  const labels = (typeof getActiveModifierLabels === "function")
    ? getActiveModifierLabels()
    : [];
  if (labels.length === 0) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = labels
    .map(label => `<span class="modifier-tag">✦ ${label}</span>`)
    .join(" ");
}


// ======================
// 🚀 PAGE INIT
// ======================

function initResumePage() {
  if (typeof loadGame === "function") loadGame();

  if (typeof hasSave === "function" && !hasSave()) {
    window.location.href = "start.html";
    return;
  }

  loadJobCard();        // renders HTML card into both slots + opens modal
  updateResumeCounter();
  updateModifierDisplay();

  if (isResumeLimitReached()) {
    showDailyLimitReached();
    return;
  }

  trySpawnNPCFromResume();

  console.log(`[Resume] Page ready. Day: ${day} | Resumes today: ${resumesToday}/${getDailyResumeLimit()} | Active modifiers: ${activeModifiers.length}`);
}

// Ensure DOM is ready before init
if (document.readyState === "loading") {
  console.log("[Resume] DOM still loading, waiting for DOMContentLoaded...");
  document.addEventListener("DOMContentLoaded", () => {
    console.log("[Resume] DOMContentLoaded fired ✓");
    initResumePage();
  });
} else {
  console.log("[Resume] DOM already ready, calling initResumePage directly");
  initResumePage();
}


// ======================
// EXPORTS
// ======================

window.selectPlant             = selectPlant;
window.selectPhoto             = selectPhoto;
window.selectDate              = selectDate;
window.submitResume            = submitResume;
window.loadJobCard             = loadJobCard;
window.buildJobCardHTML        = buildJobCardHTML;
window.openJobCardModal        = openJobCardModal;
window.closeJobCardModal       = closeJobCardModal;
window.handleModalOverlayClick = handleModalOverlayClick;
window.trySpawnNPCFromResume   = trySpawnNPCFromResume;
window.initResumePage          = initResumePage;