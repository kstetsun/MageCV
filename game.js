// ======================
// 🎮 GAME STATE
// ======================

let score = 0;
let day = 1;
let resumesToday = 0;
let npcActive = false;

// ======================
// 💾 SAVE / LOAD
// ======================

function saveGame() {
  localStorage.setItem("score", score);
  localStorage.setItem("day", day);
  localStorage.setItem("resumesToday", resumesToday);
}

function loadGame() {
  score = Number(localStorage.getItem("score")) || 0;
  day = Number(localStorage.getItem("day")) || 1;
  resumesToday = Number(localStorage.getItem("resumesToday")) || 0;
}

// ======================
// 🔁 NAVIGATION
// ======================

function goHub() {
  window.location.href = "index.html";
}

function goResume() {
  window.location.href = "resume.html";
}

// ======================
// 🚀 INIT GAME
// ======================

function initGame() {
  loadGame();
}

// запуск при загрузке
initGame();

window.goHub = goHub;
window.goResume = goResume;