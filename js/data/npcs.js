// ======================
// 🧙 NPC DATA
// ======================

const npcData = [
  {
    id: "elf",
    name: "Elf ☕",
    description: "Friendly networker, believes in people",
    minEffect: 2,
    maxEffect: 5,

    // Multi-turn dialogue trees.
    // Each dialogue is an array of "nodes". Each node:
    //   id        — unique string within this dialogue
    //   line      — what the Elf says
    //   choices[] — { label, score, next }
    //                 score: points added to accumulated total (0 or +1)
    //                 next:  id of the next node, or null for terminal
    //   terminal  — (optional) true marks the final Elf line with no choices
    //
    // On terminal node: accumulated score is mapped to an outcome:
    //   0–1  → "neutral"
    //   2–3  → "positive"
    //   4+   → "positive"  (same modifier, extra score is cosmetic)
    //
    // dialogues[] — each entry is one possible conversation.
    // A random dialogue is picked when the NPC spawns.

    dialogues: [
      {
        id: "hope_management",
        nodes: [
          {
            id: "h1",
            line: "I think hope should be managed carefully.",
            choices: [
              { label: "What does that mean?",  score: 0, next: "h2" },
              { label: "Hope is hope.",          score: 0, next: "h2" },
              { label: "Why manage it?",         score: 1, next: "h2" }
            ]
          },
          {
            id: "h2",
            line: "Too much hope hurts when rejected.",
            choices: [
              { label: "That's pessimistic.",       score: 0, next: "h3" },
              { label: "So what's the alternative?", score: 0, next: "h3" },
              { label: "Controlled hope?",           score: 1, next: "h3" }
            ]
          },
          {
            id: "h3",
            line: "Yes. Small, steady hope.",
            choices: [
              { label: "That sounds safe.",    score: 0, next: "h4" },
              { label: "Kind of sad though.",  score: 0, next: "h4" },
              { label: "I think I understand.", score: 1, next: "h4" }
            ]
          },
          {
            id: "h4",
            line: "It lasts longer that way.",
            choices: [
              { label: "Maybe that's enough.", score: 0, next: "h5" },
              { label: "I'll try it.",          score: 0, next: "h5" },
              { label: "Thanks, I needed that.", score: 1, next: "h5" }
            ]
          },
          {
            id: "h5",
            line: "Good. That's enough for today.",
            terminal: true
          }
        ]
      },

      {
        id: "elven_art_crisis",
        nodes: [
          {
            id: "a1",
            line: "Another elven studio closed today.",
            choices: [
              { label: "What happened?",      score: 0, next: "a2" },
              { label: "That's sad.",          score: 0, next: "a2" },
              { label: "Was it due to AI?",    score: 1, next: "a2" }
            ]
          },
          {
            id: "a2",
            line: "Yes. Image crystals again.",
            choices: [
              { label: "That's becoming common.",       score: 0, next: "a3" },
              { label: "Do artists still work there?",  score: 0, next: "a3" },
              { label: "What do they do now?",           score: 1, next: "a3" }
            ]
          },
          {
            id: "a3",
            line: "Some moved into \"aesthetic consulting.\"",
            choices: [
              { label: "That sounds vague.",  score: 0, next: "a4" },
              { label: "Is that real work?",  score: 0, next: "a4" },
              { label: "Do they like it?",    score: 1, next: "a4" }
            ]
          },
          {
            id: "a4",
            line: "They say it feels like pretending to be important.",
            choices: [
              { label: "That's bleak.",          score: 0, next: "a5" },
              { label: "I understand.",           score: 0, next: "a5" },
              { label: "Do they get paid well?",  score: 1, next: "a5" }
            ]
          },
          {
            id: "a5",
            line: "Barely. But they smile in meetings.",
            terminal: true
          }
        ]
      }
    ],

    // Legacy flat choices kept for non-elf NPCs that still use the old flow.
    // Elf ignores these — npc.js checks for npc.dialogues first.
    choices: []
  },

  {
    id: "dwarf",
    name: "Dwarf HR",
    description: "Weary realist, knows how things work",
    minEffect: -3,
    maxEffect: 2,
    messages: [
      "The resume is okay. But the market right now... you know.",
      "I'd tell you the truth, but you're not ready.",
      "Try applying another 200 times, then we'll talk.",
      "Stone doors open only for the persistent.",
      "Not every gem shines on the first polish."
    ],
    choices: [
      { label: "You're right. I'll reconsider my approach.", outcome: "positive" },
      { label: "Thanks for the feedback.",                   outcome: "neutral"  },
      { label: "That's not helpful at all.",                 outcome: "negative" }
    ]
  },

  {
    id: "wizard",
    name: "Chaos Wizard",
    description: "Unpredictable, loves experiments",
    minEffect: -5,
    maxEffect: 6,
    messages: [
      "I amplified your fate. Or broke it. It's unclear for now.",
      "Career energy is unstable. Excellent!",
      "Try not to think about the results. Or think too hard.",
      "The stars are whispering about your next interview.",
      "Reality bends for those who dare to dream."
    ],
    choices: [
      { label: "I embrace the chaos willingly.",    outcome: "positive" },
      { label: "I stare back in silence.",          outcome: "neutral"  },
      { label: "Please stop speaking in riddles.",  outcome: "negative" }
    ]
  }
];


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
