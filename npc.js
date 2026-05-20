function trySpawnNPC() {

  if (npcActive) return;
  if (Math.random() > 0.3) return;

  const npc = getRandomNPC();
  const message = getRandomNPCMessage(npc);
  const effect = getRandomEffect(npc.minEffect, npc.maxEffect);

  npcActive = true;

  alert(
    npc.name + "\n\n" +
    message + "\n\n" +
    "Эффект: " + effect
  );

  score += effect;

  saveGame();

  npcActive = false;

  if (typeof updateHubUI === "function") {
    updateHubUI();
  }
}