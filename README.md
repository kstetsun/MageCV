# MageCV

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
│   │   ├── game.js             ← Global state, mode, navigation
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
│       ├── npcs.js             ← NPC types, modifier templates
│       ├── elf.js             ← dialogue tree
│       ├── dwarf.js             ← dialogue tree
│       ├── wizard.js             ← dialogue tree
│       └── messages.js         ← HUB flavor text, event messages, UI strings
│
└── media/
    ├── jobcards/               ← 25 PNG job card images
    ├── photos/                 ← 3 profile photo PNGs
    ├── plants/                 ← 3 plant PNGs
    ├── backgrounds/            
    └── audio/                  ← Background music track(s)
```
