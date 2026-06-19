const dwarfData = {
    id: "dwarf",
    name: "Dwarf",
    minEffect: 0,
    maxEffect: 2,
    dialogues: [
// here would be a part of double-checked dialog, which i already rewrote myself
      {id: "gnome_referee",
        nodes: [
          {
            id: "d1_1",
            line: "We lost to the Land Dwarves again this Saturday. 3-1. The referee was a dwarf. I'm not saying anything, but...",
            choices: [
              { label: "That does sound suspicious.", score: 1, next: "d1_2" },
              { label: "Maybe your team just lost.", score: 0, next: "d1_2" },
              { label: "Gnomes can be good referees.", score: 0, next: "d1_2" }
            ]
          },
          {
            id: "d1_2",
            line: "He called three fouls on Borgrim. Three. Borgrim barely moved, that's the whole point of Borgrim.",
            choices: [
              { label: "What is Borgrim's role exactly?", score: 1, next: "d1_3" },
              { label: "Maybe Borgrim fouled three times.", score: 0, next: "d1_3" },
              { label: "Fouls are fouls.", score: 0, next: "d1_3" }
            ]
          },
          {
            id: "d1_3",
            line: "Borgrim stands in front of the goal. That's his position. It is very effective. Well... it was very effective.",
            choices: [
              { label: "So now what?", score: 1, next: "d1_4" },
              { label: "That's not really a position.", score: 0, next: "d1_4" },
              { label: "Sounds like a penalty area problem.", score: 0, next: "d1_4" }
            ]
          },
          {
            id: "d1_4",
            line: "Now Borgrim is suspended for two games, and we have no one to stand there. I've filed a complaint.",
            choices: [
              { label: "Did anyone respond?", score: 1, next: "d1_5" },
              { label: "You'll find someone else.", score: 0, next: "d1_5" },
              { label: "Maybe try a different strategy.", score: 0, next: "d1_5" }
            ]
          },
          {
            id: "d1_5",
            line: "The league responded three weeks later. They said Borgrim was 'standing too aggressively.' They declined further comment.",
            terminal: true
          }
        ]
      },

      {id: "season_opened_early",
        nodes: [
          {
            id: "d2_1",
            line: "Rabbit hunting season opened on Monday. Two weeks earlier than last year. And the year before! I think I was the only one who didn't know.",
            choices: [
              { label: "How did you find out?", score: 1, next: "d2_2" },
              { label: "You should check the calendar more.", score: 0, next: "d2_2" },
              { label: "Two weeks isn't that much.", score: 0, next: "d2_2" }
            ]
          },
          {
            id: "d2_2",
            line: "My neighbor came back with four rabbits. That's how I found out. He giggled sarcastically as he passed my fence.",
            choices: [
              { label: "That must have been frustrating.", score: 1, next: "d2_3" },
              { label: "Your neighbor was just faster.", score: 0, next: "d2_3" },
              { label: "Four rabbits is not that many.", score: 0, next: "d2_3" }
            ]
          },
          {
            id: "d2_3",
            line: "My boots were at the repair shop. My bag had a hole in it. My dog was at my mother's place.",
            choices: [
              { label: "Everything at once.", score: 1, next: "d2_4" },
              { label: "You could have gone anyway.", score: 0, next: "d2_4" },
              { label: "Maybe next weekend.", score: 0, next: "d2_4" }
            ]
          },
          {
            id: "d2_4",
            line: "I went anyway. And came back empty-handed. I only saw three rabbits the whole time. They giggled almost as sarcastically as my neighbor.",
            choices: [
              { label: "That's actually painful.", score: 1, next: "d2_5" },
              { label: "At least you went.", score: 0, next: "d2_5" },
              { label: "Maybe the rabbits were not good ones.", score: 0, next: "d2_5" }
            ]
          },
          {
            id: "d2_5",
            line: "I'll set reminders for next year. Twelve of them. One per month. Already bought the calendar.",
            terminal: true
          }
        ]
      },

      {id: "elven_theater_cooling",
        nodes: [
          {
            id: "d3_1",
            line: "It was cold again this morning. Third week in a row. And last month too, now that I think about it. I assure you, this isn't a normal cold. Something has changed.",
            choices: [
              { label: "What do you think is causing it?", score: 1, next: "d3_2" },
              { label: "It's just winter.", score: 0, next: "d3_2" },
              { label: "Cold is cold.", score: 0, next: "d3_2" }
            ]
          },
          {
            id: "d3_2",
            line: "The elves built a new theater in the north. Massive thing. I think someone is compensating for their insecurities... And of course, they decided to put it where a warm wind used to come from. That's when the cold started.",
            choices: [
              { label: "You think the theater is blocking the wind?", score: 1, next: "d3_3" },
              { label: "That's probably not related.", score: 0, next: "d3_3" },
              { label: "Theaters don't affect weather.", score: 0, next: "d3_3" }
            ]
          },
          {
            id: "d3_3",
            line: "Not blocking. Redirecting it. There's a difference. Spent three days on the map. The angles are very clear.",
            choices: [
              { label: "Can I see the map?", score: 1, next: "d3_4" },
              { label: "I don't think angles work like that.", score: 0, next: "d3_4" },
              { label: "This sounds like a big claim.", score: 0, next: "d3_4" }
            ]
          },
          {
            id: "d3_4",
            line: "I sent the map to the Ministry of Climate. They responded two days later with a simple 'thank you'.",
            choices: [
              { label: "That's not a real answer.", score: 1, next: "d3_5" },
              { label: "At least they replied.", score: 0, next: "d3_5" },
              { label: "Maybe they are looking into it.", score: 0, next: "d3_5" }
            ]
          },
          {
            id: "d3_5",
            line: "Exactly. So I sent another one. With the second map. More angles. Same 'thank you.' Sent the third one yesterday. I'll send the fourth one this week and continue to do so until I get a proper response.",
            terminal: true
          }
        ]
      },

      {id: "record_applications",
        nodes: [
          {
            id: "d4_1",
            line: "I sent 47 applications today. A new personal record. I even timed myself.",
            choices: [
              { label: "That's a lot of work.", score: 1, next: "d4_2" },
              { label: "Quality matters more than quantity.", score: 0, next: "d4_2" },
              { label: "Did you check them before sending?", score: 0, next: "d4_2" }
            ]
          },
          {
            id: "d4_2",
            line: "Each one took 4 minutes. Some took 3 if I got the template right. But the fastest ones seem the worst to me. Rushing always shows.",
            choices: [
              { label: "Did anything come back ?", score: 1, next: "d4_3" },
              { label: "Four minutes is quite fast.", score: 0, next: "d4_3" },
              { label: "Maybe slow down a little.", score: 0, next: "d4_3" }
            ]
          },
          {
            id: "d4_3",
            line: "Nothing. Not a single one replied. I checked my email six times by noon. Then seven more. Then I stopped because counting was making it worse.",
            choices: [
              { label: "That's genuinely discouraging.", score: 1, next: "d4_4" },
              { label: "It takes time. Keep going.", score: 0, next: "d4_4" },
              { label: "Maybe your inbox has a problem.", score: 0, next: "d4_4" }
            ]
          },
          {
            id: "d4_4",
            line: "I'll send 50 tomorrow. The template is ready. I changed the font to something bigger. Makes them look more confident.",
            choices: [
              { label: "Does the font help?", score: 1, next: "d4_5" },
              { label: "Font won't make a difference.", score: 0, next: "d4_5" },
              { label: "50 is a lot for one day.", score: 0, next: "d4_5" }
            ]
          },
          {
            id: "d4_5",
            line: "I don't know if it even matters. But at some point, the odds have to shift. Statistically, after a thousand applications, I'll get hired.",
            terminal: true
          }
        ]
      },

      {id: "doves_went_east",
        nodes: [
          {
            id: "d5_1",
            line: "The orange doves went east this year. East! I checked twice. They've always gone south. Always. For 2 000 years, nothing but south.",
            choices: [
              { label: "That is a big change.", score: 1, next: "d5_2" },
              { label: "Maybe you remembered wrong.", score: 0, next: "d5_2" },
              { label: "Birds change routes sometimes.", score: 0, next: "d5_2" }
            ]
          },
          {
            id: "d5_2",
            line: "I have a spot on the south side of the hill. It has a really good observation point. I've been going there since I was 12. That's... 35 years. And the doves always come there. Every time.",
            choices: [
              { label: "And now the spot is useless?", score: 1, next: "d5_3" },
              { label: "Just find a new spot.", score: 0, next: "d5_3" },
              { label: "East side isn't that far.", score: 0, next: "d5_3" }
            ]
          },
          {
            id: "d5_3",
            line: "Well, this time I had to go east. There wasn't a good spot there. My dog and I had to stand there for 2 hours because there was nowhere to sit.",
            choices: [
              { label: "Nothing at all?", score: 1, next: "d5_4" },
              { label: "At least you tried.", score: 0, next: "d5_4" },
              { label: "The dog probably had a good time.", score: 0, next: "d5_4" }
            ]
          },
          {
            id: "d5_4",
            line: "In all that time, I only saw 3 doves. And even then, they were very high and flying very fast. It wasn't worth it.",
            choices: [
              { label: "Smart dog.", score: 1, next: "d5_5" },
              { label: "Three is still something.", score: 0, next: "d5_5" },
              { label: "Maybe next time bring better equipment.", score: 0, next: "d5_5" }
            ]
          },
          {
            id: "d5_5",
            line: "Now I don't know where to go next year. I can't be in two places at once! Have you heard anything about magic balls that transmit images in real time?",
            terminal: true
          }
        ]
      },
// part to continue re-checking
      {
        id: "stolen_lunch",
        nodes: [
          {
            id: "d6_1",
            line: "Someone took my lunch on Tuesday. Full box. Meat pie and two potatoes. Gone.",
            choices: [
              { label: "Did you see who took it?", score: 1, next: "d6_2" },
              { label: "Maybe you left it somewhere else.", score: 0, next: "d6_2" },
              { label: "It happens sometimes.", score: 0, next: "d6_2" }
            ]
          },
          {
            id: "d6_2",
            line: "I did not see. But the box was mine. My name was on it. In capital letters. With a border.",
            choices: [
              { label: "A border seems very clear.", score: 1, next: "d6_3" },
              { label: "Names don't always stop people.", score: 0, next: "d6_3" },
              { label: "Maybe the border wasn't visible enough.", score: 0, next: "d6_3" }
            ]
          },
          {
            id: "d6_3",
            line: "I filed a report with HR. Two pages. Detailed. I included a drawing of the box.",
            choices: [
              { label: "What did HR say?", score: 1, next: "d6_4" },
              { label: "Two pages for a lunch seems like a lot.", score: 0, next: "d6_4" },
              { label: "HR won't do much about lunch.", score: 0, next: "d6_4" }
            ]
          },
          {
            id: "d6_4",
            line: "HR said they would look into it. That was nine days ago. My box is still gone. HR is still looking.",
            choices: [
              { label: "Still no answer at all?", score: 1, next: "d6_5" },
              { label: "Nine days is not that long.", score: 0, next: "d6_5" },
              { label: "At least they didn't ignore you.", score: 0, next: "d6_5" }
            ]
          },
          {
            id: "d6_5",
            line: "I made a second box. Bigger name. Bigger border. Small lock. We'll see.",
            terminal: true
          }
        ]
      },

      {
        id: "magic_football",
        nodes: [
          {
            id: "d7_1",
            line: "The league changed the rules. Magic is allowed now. During the game. On the field.",
            choices: [
              { label: "How do you feel about that?", score: 1, next: "d7_2" },
              { label: "Magic could make it more exciting.", score: 0, next: "d7_2" },
              { label: "Sounds like a natural evolution.", score: 0, next: "d7_2" }
            ]
          },
          {
            id: "d7_2",
            line: "Borgrim got lifted off the ground in the last game. Just lifted. Floated for a bit. Then put down. That's legal now.",
            choices: [
              { label: "That does seem unfair.", score: 1, next: "d7_3" },
              { label: "Borgrim should learn to counter it.", score: 0, next: "d7_3" },
              { label: "If it's in the rules it's fine.", score: 0, next: "d7_3" }
            ]
          },
          {
            id: "d7_3",
            line: "Football is a ground sport. The whole point is the ground. You stand on it. You run on it. You stay on it.",
            choices: [
              { label: "Hard to argue with that.", score: 1, next: "d7_4" },
              { label: "The rules changed. That's the ground now.", score: 0, next: "d7_4" },
              { label: "Maybe Borgrim should float back.", score: 0, next: "d7_4" }
            ]
          },
          {
            id: "d7_4",
            line: "I filed a complaint with the league. They said magic adds strategy. I said Borgrim adds strategy. Nobody agreed.",
            choices: [
              { label: "Poor Borgrim.", score: 1, next: "d7_5" },
              { label: "The league has the final word.", score: 0, next: "d7_5" },
              { label: "Maybe magic is the strategy now.", score: 0, next: "d7_5" }
            ]
          },
          {
            id: "d7_5",
            line: "We're teaching Borgrim to hold onto things. Poles, fences, other players. Whatever works. Adaptation.",
            terminal: true
          }
        ]
      },

      {
        id: "wrong_size_boots",
        nodes: [
          {
            id: "d8_1",
            line: "I bought new boots for the season. Good ones. Expensive. Too small.",
            choices: [
              { label: "Can you return them?", score: 1, next: "d8_2" },
              { label: "You should have tried them on.", score: 0, next: "d8_2" },
              { label: "Maybe they'll stretch with time.", score: 0, next: "d8_2" }
            ]
          },
          {
            id: "d8_2",
            line: "Non-refundable. It says so at the bottom of the receipt. Very small text. Very bottom.",
            choices: [
              { label: "That's a frustrating place to put it.", score: 1, next: "d8_3" },
              { label: "You should always read the receipt.", score: 0, next: "d8_3" },
              { label: "Small text is still text.", score: 0, next: "d8_3" }
            ]
          },
          {
            id: "d8_3",
            line: "I wore them anyway. First day out. One hour. My left foot is still angry about it.",
            choices: [
              { label: "How bad was it?", score: 1, next: "d8_4" },
              { label: "You should have stopped earlier.", score: 0, next: "d8_4" },
              { label: "Pain means they're breaking in.", score: 0, next: "d8_4" }
            ]
          },
          {
            id: "d8_4",
            line: "I got nothing that day. Hard to focus on hunting when your foot is sending you messages every step.",
            choices: [
              { label: "What kind of messages?", score: 1, next: "d8_5" },
              { label: "Focus is a skill you can train.", score: 0, next: "d8_5" },
              { label: "Maybe hunt sitting down next time.", score: 0, next: "d8_5" }
            ]
          },
          {
            id: "d8_5",
            line: "Bad ones. I'm giving the boots to my cousin. He has smaller feet. He also hunts badly so it balances out.",
            terminal: true
          }
        ]
      },

      {
        id: "automated_reply",
        nodes: [
          {
            id: "d9_1",
            line: "I got a reply today. First one this week. Possibly this month.",
            choices: [
              { label: "That's something. What did it say?", score: 1, next: "d9_2" },
              { label: "Just one?", score: 0, next: "d9_2" },
              { label: "What did you apply for?", score: 0, next: "d9_2" }
            ]
          },
          {
            id: "d9_2",
            line: "Thank you for your application. We will be in touch. Signed, The Hiring Team. No names. No date.",
            choices: [
              { label: "That sounds automated.", score: 1, next: "d9_3" },
              { label: "At least they acknowledged you.", score: 0, next: "d9_3" },
              { label: "That's a normal reply.", score: 0, next: "d9_3" }
            ]
          },
          {
            id: "d9_3",
            line: "It was automated. Sent at 3am. I know because I was awake. Also applying. We were both up.",
            choices: [
              { label: "You and the automated system.", score: 1, next: "d9_4" },
              { label: "You should sleep more.", score: 0, next: "d9_4" },
              { label: "3am applications might not be your best work.", score: 0, next: "d9_4" }
            ]
          },
          {
            id: "d9_4",
            line: "I replied anyway. Thanked them. Asked about the timeline. Wished them a good week. Kept it professional.",
            choices: [
              { label: "Did anything come back?", score: 1, next: "d9_5" },
              { label: "Replying to automated emails won't help.", score: 0, next: "d9_5" },
              { label: "That was probably unnecessary.", score: 0, next: "d9_5" }
            ]
          },
          {
            id: "d9_5",
            line: "Another automated reply. Faster this time. I think we're building something.",
            terminal: true
          }
        ]
      },

      {
        id: "frozen_carrots",
        nodes: [
          {
            id: "d10_1",
            line: "My carrots are dead. All of them. Frozen. In the ground. Still there.",
            choices: [
              { label: "When did it happen?", score: 1, next: "d10_2" },
              { label: "Carrots can handle cold usually.", score: 0, next: "d10_2" },
              { label: "Maybe plant them later next year.", score: 0, next: "d10_2" }
            ]
          },
          {
            id: "d10_2",
            line: "Last week. Overnight. No warning. The Ministry of Weather sent a notice the next morning. Very helpful timing.",
            choices: [
              { label: "The day after is too late.", score: 1, next: "d10_3" },
              { label: "At least they sent something.", score: 0, next: "d10_3" },
              { label: "Weather is hard to predict.", score: 0, next: "d10_3" }
            ]
          },
          {
            id: "d10_3",
            line: "The notice said to protect sensitive plants. My carrots were sensitive. Past tense now.",
            choices: [
              { label: "Did you write to them about it?", score: 1, next: "d10_4" },
              { label: "Carrots are quite resilient normally.", score: 0, next: "d10_4" },
              { label: "Next time cover them at night.", score: 0, next: "d10_4" }
            ]
          },
          {
            id: "d10_4",
            line: "I wrote a letter. Three paragraphs. Included the carrots as evidence. Dried them first. Very professional.",
            choices: [
              { label: "You sent dried carrots with the letter?", score: 1, next: "d10_5" },
              { label: "Letters rarely change weather policy.", score: 0, next: "d10_5" },
              { label: "That seems like a lot of effort.", score: 0, next: "d10_5" }
            ]
          },
          {
            id: "d10_5",
            line: "No reply yet. But I have more carrots. And more envelopes. We'll see who runs out first.",
            terminal: true
          }
        ]
      },

      {
        id: "elf_team",
        nodes: [
          {
            id: "d11_1",
            line: "The league added an Elf team this season. Official. Uniform and everything.",
            choices: [
              { label: "How do you feel about that?", score: 1, next: "d11_2" },
              { label: "More teams means more games.", score: 0, next: "d11_2" },
              { label: "Elves can play football too.", score: 0, next: "d11_2" }
            ]
          },
          {
            id: "d11_2",
            line: "They're very tall. The average dwarven goalkeeper comes up to their knee. This is a known fact.",
            choices: [
              { label: "That does sound like a structural problem.", score: 1, next: "d11_3" },
              { label: "Height isn't everything in football.", score: 0, next: "d11_3" },
              { label: "Adapt the strategy.", score: 0, next: "d11_3" }
            ]
          },
          {
            id: "d11_3",
            line: "We played them last Thursday. They didn't run much. Just walked. Long steps. Very calm. Won 4 to 0.",
            choices: [
              { label: "Did anyone complain officially?", score: 1, next: "d11_4" },
              { label: "Maybe your team needs more training.", score: 0, next: "d11_4" },
              { label: "Walking and winning is still winning.", score: 0, next: "d11_4" }
            ]
          },
          {
            id: "d11_4",
            line: "I filed a complaint about the step length. The league said step length is not a regulated measurement. I checked. They're right. Unfortunately.",
            choices: [
              { label: "So there's nothing to be done?", score: 1, next: "d11_5" },
              { label: "Then you have to adapt.", score: 0, next: "d11_5" },
              { label: "Maybe measure it anyway.", score: 0, next: "d11_5" }
            ]
          },
          {
            id: "d11_5",
            line: "We're working on a new formation. Everyone moves together. Like a wall. A short, determined wall.",
            terminal: true
          }
        ]
      },

      {
        id: "wrong_garden",
        nodes: [
          {
            id: "d12_1",
            line: "I found a new hunting spot. Good trees. Good angle. Slightly east. Turned out to be someone's garden.",
            choices: [
              { label: "How did you find out?", score: 1, next: "d12_2" },
              { label: "You should check maps before going.", score: 0, next: "d12_2" },
              { label: "Gardens and forests can look similar.", score: 0, next: "d12_2" }
            ]
          },
          {
            id: "d12_2",
            line: "The owner told me. Loudly. From the window. While I was setting up. My dog was already comfortable.",
            choices: [
              { label: "That must have been awkward.", score: 1, next: "d12_3" },
              { label: "You should have left immediately.", score: 0, next: "d12_3" },
              { label: "At least he warned you before you started.", score: 0, next: "d12_3" }
            ]
          },
          {
            id: "d12_3",
            line: "I left. Politely. Then received a formal letter two days later. Three pages. Very detailed. Official stamp.",
            choices: [
              { label: "What did the letter say?", score: 1, next: "d12_4" },
              { label: "Three pages for a garden visit.", score: 0, next: "d12_4" },
              { label: "An official stamp means it's serious.", score: 0, next: "d12_4" }
            ]
          },
          {
            id: "d12_4",
            line: "Trespassing. Disturbing the peace. One count of dog-related lawn damage. That last one surprised me.",
            choices: [
              { label: "What did your dog do exactly?", score: 1, next: "d12_5" },
              { label: "All three sound manageable.", score: 0, next: "d12_5" },
              { label: "The lawn damage is the one to worry about.", score: 0, next: "d12_5" }
            ]
          },
          {
            id: "d12_5",
            line: "He sat down. That's all. He just sat. The lawn was apparently very delicate. I paid the fine. Small one. Worth it for the story.",
            terminal: true
          }
        ]
      },

      {
        id: "cv_gap",
        nodes: [
          {
            id: "d13_1",
            line: "My CV has a gap. One full year. Right in the middle. Very visible.",
            choices: [
              { label: "What were you doing that year?", score: 1, next: "d13_2" },
              { label: "Gaps aren't always a problem.", score: 0, next: "d13_2" },
              { label: "Just leave it out.", score: 0, next: "d13_2" }
            ]
          },
          {
            id: "d13_2",
            line: "Hunting. Mostly. Some football. A small legal situation in spring. Nothing major.",
            choices: [
              { label: "That's hard to put on a CV.", score: 1, next: "d13_3" },
              { label: "Hunting shows outdoor skills.", score: 0, next: "d13_3" },
              { label: "Just say personal development.", score: 0, next: "d13_3" }
            ]
          },
          {
            id: "d13_3",
            line: "I tried personal development. Then self-directed growth. Then independent field research. All rejected so far.",
            choices: [
              { label: "What kind of jobs are you applying for?", score: 1, next: "d13_4" },
              { label: "Keep trying different wording.", score: 0, next: "d13_4" },
              { label: "Maybe just be honest about it.", score: 0, next: "d13_4" }
            ]
          },
          {
            id: "d13_4",
            line: "Ministry positions mostly. They ask about the gap in every interview. Every single one. They always find it.",
            choices: [
              { label: "Maybe address it before they ask.", score: 1, next: "d13_5" },
              { label: "Ministry jobs have strict requirements.", score: 0, next: "d13_5" },
              { label: "Perhaps try a different type of job.", score: 0, next: "d13_5" }
            ]
          },
          {
            id: "d13_5",
            line: "I'm writing a cover letter that explains the gap in the first sentence. Very bold. Terrifying. Almost finished.",
            terminal: true
          }
        ]
      },

      {
        id: "dove_protected",
        nodes: [
          {
            id: "d14_1",
            line: "The orange dove is protected now. As of last Monday. Official government notice.",
            choices: [
              { label: "Did you know before the season started?", score: 1, next: "d14_2" },
              { label: "Protected species rules exist for good reasons.", score: 0, next: "d14_2" },
              { label: "That changes your whole season.", score: 0, next: "d14_2" }
            ]
          },
          {
            id: "d14_2",
            line: "I found out in the field. A ranger appeared from behind a tree. Very sudden. Very official hat.",
            choices: [
              { label: "That sounds like bad timing.", score: 1, next: "d14_3" },
              { label: "Rangers do their job well it seems.", score: 0, next: "d14_3" },
              { label: "You should check regulations before going out.", score: 0, next: "d14_3" }
            ]
          },
          {
            id: "d14_3",
            line: "I had not caught anything yet. Lucky. The ranger checked my bag. Found my lunch. Seemed disappointed.",
            choices: [
              { label: "So you were fine in the end?", score: 1, next: "d14_4" },
              { label: "The ranger was just doing their job.", score: 0, next: "d14_4" },
              { label: "Always good to have lunch as backup.", score: 0, next: "d14_4" }
            ]
          },
          {
            id: "d14_4",
            line: "Fine legally. Not fine emotionally. I've been hunting orange doves for 40 years. They were my thing.",
            choices: [
              { label: "That's a real loss.", score: 1, next: "d14_5" },
              { label: "Find a new bird.", score: 0, next: "d14_5" },
              { label: "Regulations change. People adapt.", score: 0, next: "d14_5" }
            ]
          },
          {
            id: "d14_5",
            line: "I'm looking into grey pigeons now. Not the same. Nobody is pretending it's the same. But here we are.",
            terminal: true
          }
        ]
      },

      {
        id: "support_group",
        nodes: [
          {
            id: "d15_1",
            line: "I joined a job support group. Tuesdays. Small room. Six dwarves and one very tired gnome.",
            choices: [
              { label: "How is it going?", score: 1, next: "d15_2" },
              { label: "Support groups can really help.", score: 0, next: "d15_2" },
              { label: "Is it useful?", score: 0, next: "d15_2" }
            ]
          },
          {
            id: "d15_2",
            line: "First session we were supposed to share our goals. Ended up sharing our worst rejection letters. Took three hours.",
            choices: [
              { label: "Three hours of rejection letters.", score: 1, next: "d15_3" },
              { label: "Goals are hard to talk about sometimes.", score: 0, next: "d15_3" },
              { label: "That doesn't sound very productive.", score: 0, next: "d15_3" }
            ]
          },
          {
            id: "d15_3",
            line: "Mine was the shortest. One line. Just: no. They said it showed confidence. From the employer side.",
            choices: [
              { label: "One word rejection is somehow worse.", score: 1, next: "d15_4" },
              { label: "Short rejections are at least quick to read.", score: 0, next: "d15_4" },
              { label: "The group sounds supportive at least.", score: 0, next: "d15_4" }
            ]
          },
          {
            id: "d15_4",
            line: "We meet again Tuesday. Someone is bringing their full application history. Printed. It's a lot of pages apparently.",
            choices: [
              { label: "How many pages?", score: 1, next: "d15_5" },
              { label: "Printed seems excessive.", score: 0, next: "d15_5" },
              { label: "That person needs the most help.", score: 0, next: "d15_5" }
            ]
          },
          {
            id: "d15_5",
            line: "He said 340. We moved to a bigger room. The gnome looked relieved. I think he needed this too.",
            terminal: true
          }
        ]
      }
    ],
    choices: []
};