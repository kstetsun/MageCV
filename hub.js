function updateHubUI() {
  const scoreEl = document.getElementById("score");
  const dayEl = document.getElementById("day");
  const resEl = document.getElementById("resumesToday");

  if (scoreEl) scoreEl.innerText = score;
  if (dayEl) dayEl.innerText = day;
  if (resEl) resEl.innerText = resumesToday;
}

function goToResume() {

  window.location.href = "resume.html";

}

function nextDay() {
  day++;
  resumesToday = 0;

  saveGame();

  const board = document.getElementById("boardText");
  if (board && typeof getRandomBoardMessage === "function") {
    board.innerText = getRandomBoardMessage();
  }

  updateHubUI();

  if (typeof trySpawnNPC === "function") {
    trySpawnNPC();
  }
}

// авто-обновление при входе на HUB
updateHubUI();