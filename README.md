# MageCV

A browser-based fantasy career simulator. You play a mage applying for magical jobs by assembling résumés — picking the right **plant**, **photo expression**, and **seasonal application date** to match each posting. Clues are hidden inside the job description's flavor text, so you have to read carefully. Hit a hidden target score before you run out of momentum, and you win.

Pure vanilla HTML/CSS/JavaScript — no build step, no frameworks, no dependencies. State persists between sessions via `localStorage`.

## Gameplay

- **Read the job card.** Each posting describes the role in-character. The correct plant, the desired photo tone (neutral 😐 / smile 😊 / serious 🧐), and the right season (summer or winter solstice) are woven into the wording.
- **Build your résumé.** Choose one plant, one photo, and one date. Each correct pick is +1, each wrong pick is −1 (minimum score of 1 per résumé). Active modifiers can then boost or scale the result.
- **Score is hidden.** Neither your running total nor the win target is ever shown — you play by feel. The target is fixed in Demo mode and randomized in Long mode.
- **Daily limits.** You can only send so many résumés per day before heading back to the HUB to advance to the next day.
- **NPC encounters.** As you send résumés, NPCs (Elf, Dwarf, Wizard) appear on a spread-out schedule. Their dialogue choices grant temporary buffs or debuffs — bonus points per résumé, score multipliers, extra daily résumé slots, reduced penalties, or one-time instant score.

### Modes

| Mode | Résumés/day | NPCs/day | Win target |
|------|-------------|----------|------------|
| Demo | 5 | 2 (fixed) | 10 (fixed) |
| Long | 10 | 2–3 (random) | 30–60 (random, hidden) |

## Screens

- **Start** — pick a mode and begin a new game.
- **HUB** — the home base: shows the day, résumé counts, NPC interactions, and active modifiers; advance to the next day from here.
- **Résumé** — the core loop: read the job card and submit applications.
- **NPC** — dialogue encounters that apply modifiers.
- **Rules** — how to play.
- **Win** — the victory screen once the hidden target is reached.

## Tech notes

- No modules — all scripts share the global `window` scope and load via `<script>` tags. Load order matters (e.g. NPC data files before `npcs.js`, `storage.js` before screen logic).
- Job card descriptions embed `<strong>` tags around the answer clues, so they're rendered with `innerHTML`.
- All game state (mode, hidden score, day, counters, active modifiers) is saved to and loaded from `localStorage` on every page.

## Project structure

```
/main
│
├── index.html                  ← App entry point (redirects to start)
│
├── pages/                      ← All HTML screens
│   ├── start.html
│   ├── hub.html
│   ├── resume.html
│   ├── rules.html
│   ├── npc.html
│   └── win.html
│
├── styles/                     ← All CSS
│   ├── main.css                ← Shared base styles, variables, fonts
│   ├── hub.css
│   ├── resume.css
│   ├── npc.css
│   ├── start.css
│   ├── rules.css
│   └── win.css
│
├── js/
│   ├── core/                   ← Engine-level logic
│   │   ├── game.js             ← Global state, mode config, navigation, win check
│   │   ├── storage.js          ← localStorage save/load/clear
│   │   └── modifiers.js        ← Buff/debuff system logic
│   │
│   ├── screens/                ← Per-screen logic
│   │   ├── start.js
│   │   ├── hub.js
│   │   ├── resume.js
│   │   ├── npc.js
│   │   ├── rules.js
│   │   └── win.js
│   │
│   └── data/                   ← Static content, no logic
│       ├── jobCards.js         ← 25 job card definitions + correct answers
│       ├── npcs.js             ← NPC registry + helpers
│       ├── elf.js              ← Elf dialogue tree
│       ├── dwarf.js            ← Dwarf dialogue tree
│       ├── wizard.js           ← Wizard dialogue tree
│       └── messages.js         ← HUB flavor text, event messages, UI strings
│
└── media/
    ├── jobcards/               ← Job card images
    ├── photos/                 ← Profile photo PNGs
    ├── plants/                 ← Plant PNGs
    ├── backgrounds/
    └── audio/                  ← Background music track(s)
```

## Running

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```