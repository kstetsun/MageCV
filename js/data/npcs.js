// ======================
// 🧙 NPC DATA
// ======================

// Depends on: npc-elf.js, npc-dwarf.js, npc-wizard.js (load those first)
 
const npcData = [elfData, dwarfData, wizardData];


// ======================
// 🎲 HELPERS
// ======================

function getRandomNPC() {
  return npcData[Math.floor(Math.random() * npcData.length)];
}

function getRandomNPCMessage(npc) {
  return npc.messages[Math.floor(Math.random() * npc.messages.length)];
}

function getRandomEffect(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns a random dialogue tree from an NPC that has them (i.e. the Elf).
function getRandomDialogue(npc) {
  if (!npc.dialogues || !npc.dialogues.length) return null;
  return npc.dialogues[Math.floor(Math.random() * npc.dialogues.length)];
}

// Given a dialogue and a node id, returns that node object.
function getDialogueNode(dialogue, nodeId) {
  return dialogue.nodes.find(n => n.id === nodeId) || null;
}

// Maps accumulated score from a multi-turn dialogue to a flat outcome string.
// 0–1 → "neutral", 2+ → "positive"
function scoreToOutcome(score) {
  if (score >= 2) return "positive";
  return "neutral";
}

// ======================
// EXPORTS
// ======================

window.getRandomNPC          = getRandomNPC;
window.getRandomNPCMessage   = getRandomNPCMessage;
window.getRandomEffect       = getRandomEffect;
window.getRandomDialogue     = getRandomDialogue;
window.getDialogueNode       = getDialogueNode;
window.scoreToOutcome        = scoreToOutcome;
