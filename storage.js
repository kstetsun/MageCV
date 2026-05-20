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