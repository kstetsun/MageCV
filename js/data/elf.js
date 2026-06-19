const elfData = {
  id: "elf",
  name: "Elf",
  minEffect: 1,
  maxEffect: 3,
  dialogues: [
// here would be a part of double-checked dialog, which i already rewrote myself
    {id: "royal_portrait",
      nodes: [
        {
          id: "e1_1",
          line: "The palace gave the new royal portrait to an AI this year - it was finished, I was told, before the painter they dismissed had reached the palace gates.",
          choices: [
            { label: "They told you that detail specifically ?", score: 1, next: "e1_2" },
            { label: "Fast work is still work.", score: 0, next: "e1_2" },
            { label: "The king must be satisfied.", score: 0, next: "e1_2" }
          ]
        },
        {
          id: "e1_2",
          line: "I think the king saw this as a blessing, since it will give the artist more free time. However, can you take away a shepherd's sheep and still consider him free?",
          choices: [
            { label: "We wanted the best, but it turned out as always.", score: 1, next: "e1_3" },
            { label: "If it's good work, it's good work.", score: 0, next: "e1_3" },
            { label: "Maybe we need just accept it.", score: 0, next: "e1_3" }
          ]
        },
        {
          id: "e1_3",
          line: "The king prefers it to the last portrait, which took the painter 3 years and one very difficult winter, and he said — quite simply, as if it were obvious — that the new one has better light. As if suffering isn't the main part of art!",
          choices: [
            { label: "Better light after 3 years it's a good result.", score: 1, next: "e1_4" },
            { label: "Does light really matter that much in a portrait ?", score: 0, next: "e1_4" },
            { label: "The king knows what he likes.", score: 0, next: "e1_4" }
          ]
        },
        {
          id: "e1_4",
          line: "I saw 3 painters waiting in the palace corridor yesterday, standing in the way people stand when they are being patient at some cost to themselves. I thought about their fates, about how quickly they would be destroyed by the end of this week.",
          choices: [
            { label: "Watching someone be graceful about a loss is its own kind of sadness.", score: 1, next: "e1_5" },
            { label: "Waiting is part of the process.", score: 0, next: "e1_5" },
            { label: "They should try other clients.", score: 0, next: "e1_5" }
          ]
        },
        {
          id: "e1_5",
          line: "The portrait hangs in the main hall now, in a room whose light I have always considered genuinely excellent, and the portrait does look luminous there — because of the room, I think, more than itself. I keep noticing this. I am not sure what to do with it.",
          terminal: true
        }
      ]
    },

    {id: "theater_cancelled",
      nodes: [
        {
          id: "e2_1",
          line: "I recently received a letter about the spring schedule at my favorite theater. The front page announced a new season, which, from what I could read of it, seemed quite well thought out. On the second page, it was canceled.",
          choices: [
            { label: "Both things was in the same envelope ?", score: 1, next: "e2_2" },
            { label: "Budget cuts happen really everywhere.", score: 0, next: "e2_2" },
            { label: "At least they were transparent.", score: 0, next: "e2_2" }
          ]
        },
        {
          id: "e2_2",
          line: "I saved the front page for Maman. We discussed the grief of our loss sitting on the veranda that evening, and I was glad not to be there alone.",
          choices: [
            { label: "Oh, my condolences.", score: 1, next: "e2_3" },
            { label: "There's no point keeping it.", score: 0, next: "e2_3" },
            { label: "Maybe next year the season returns.", score: 0, next: "e2_3" }
          ]
        },
        {
          id: "e2_3",
          line: "The mime troupe was not included in the cuts. Perhaps they were so quiet that everyone forgot about them.",
          choices: [
            { label: "Some things survive without explanation.", score: 1, next: "e2_4" },
            { label: "Mimes are probably just cheaper.", score: 0, next: "e2_4" },
            { label: "Perhaps they have connections in the theatre ?", score: 0, next: "e2_4" }
          ]
        },
        {
          id: "e2_4",
          line: "Last weekend, they performed an incredibly long and tedious play in the main square, mostly about waiting. As expected, half the seats were empty, but it was nice to be immersed in the atmosphere of art again.",
          choices: [
            { label: "Staying until the end meant something.", score: 1, next: "e2_5" },
            { label: "Elves dont have time even for free performances ?", score: 0, next: "e2_5" },
            { label: "At least there was still something to watch.", score: 0, next: "e2_5" }
          ]
        },
        {
          id: "e2_5",
          line: "I were there with Maman. I'm not always sure I understand mime, but that evening my heart opened.",
          terminal: true
        }
      ]
    },

    {id: "unsigned_poem",
      nodes: [
        {
          id: "e3_1",
          line: "I have sent just over 200 applications since the spring — I wrote each one separately, which Maman said was impractical, and she was probably right. But a letter written only once has never felt, to me, like a letter at all.",
          choices: [
            { label: "That kind of care takes something out of you.", score: 1, next: "e3_2" },
            { label: "Separate letters for each one seems like a lot.", score: 0, next: "e3_2" },
            { label: "A template would have been faster.", score: 0, next: "e3_2" }
          ]
        },
        {
          id: "e3_2",
          line: "My strategy was quite successful, because I received my first reply yesterday. It was a registered letter, with an incredibly elegant seal, though I'd never seen one like it before.",
          choices: [
            { label: "What was inside?", score: 1, next: "e3_3" },
            { label: "One from 200 is a difficult ratio.", score: 0, next: "e3_3" },
            { label: "A reply is still a reply.", score: 0, next: "e3_3" }
          ]
        },
        {
          id: "e3_3",
          line: "A poem. Four stanzas, about autumn and open doors—which could mean several things at once. Unfortunately, there was no name at the bottom. I showed it to Clarissa that evening, and she said it was either a job offer or a dismissal, and that the difference hardly mattered.",
          choices: [
            { label: "Did you think it was meant for you?", score: 1, next: "e3_4" },
            { label: "Someone sent the wrong email.", score: 0, next: "e3_4" },
            { label: "That seems like a mistake.", score: 0, next: "e3_4" }
          ]
        },
        {
          id: "e3_4",
          line: "I have read it a number of times since. The third stanza has something in it I keep returning to — I mentioned it to Clarissa, and she said I was being sentimental, which is hard to argue with.",
          choices: [
            { label: "Some things stay with you without explaining themselves.", score: 1, next: "e3_5" },
            { label: "I'm afraid you're looking for meaning that isn't there.", score: 0, next: "e3_5" },
            { label: "You should ask them what they meant.", score: 0, next: "e3_5" }
          ]
        },
        {
          id: "e3_5",
          line: "After some thought, I decided to reply. I mentioned the third stanza and thanked them for it. Oh, how I would have loved to know the author's meaning, but I had the presence of mind to restrain myself. I hope for a quick response, within the next two years.",
          terminal: true
        }
      ]
    },

    {id: "ai_writes_law",
      nodes: [
        {
          id: "e4_1",
          line: "The Council voted last month to move all new legislation to an AI system — the proposal was presented as a matter of 'efficiency.' A word that's been used more often lately than 'tax bonds', if you don't mind me saying.",
          choices: [
            { label: "'Efficiency' covers a lot of ground these days.", score: 1, next: "e4_2" },
            { label: "Efficient laws sound like a good thing.", score: 0, next: "e4_2" },
            { label: "The Council has to make difficult choices.", score: 0, next: "e4_2" }
          ]
        },
        {
          id: "e4_2",
          line: "The first law was passed last week. It was very short and entirely without ambiguity — I read it to Maman after dinner, and she said it sounded like furniture assembly instructions. She was not wrong.",
          choices: [
            { label: "But in law, ambiguity has a purpose.", score: 1, next: "e4_3" },
            { label: "Clear and short sounds like not the worste-case scenario.", score: 0, next: "e4_3" },
            { label: "Ambiguity in law causes problems.", score: 0, next: "e4_3" }
          ]
        },
        {
          id: "e4_3",
          line: "Elven law has always kept a little space between what is written and what is meant. That space is where judgment lives. Can you remove the silence from music and still call it a composition?",
          choices: [
            { label: "Okey, so now that space has been removed.", score: 1, next: "e4_4" },
            { label: "Laws should mean what they say.", score: 0, next: "e4_4" },
            { label: "Wisdom should be written down clearly.", score: 0, next: "e4_4" }
          ]
        },
        {
          id: "e4_4",
          line: "And all the commas have disappeared somewhere. I wouldn't be surprised if the system deemed them inefficient, too. I never thought I'd miss the days when the old bankers ruled the world.",
          choices: [
            { label: "Sometimes small losses point to larger ones.", score: 1, next: "e4_5" },
            { label: "Commas are a small thing to focus on.", score: 0, next: "e4_5" },
            { label: "You might be overthinking this.", score: 0, next: "e4_5" }
          ]
        },
        {
          id: "e4_5",
          line: "However, it must be admitted that the new laws are easier to read, but does that mean they're better? Would you like to familiarize yourself with the new amendments at your leisure? I'd be interested in your opinion." ,
          terminal: true
        }
      ]
    },
// part to continue re-checking
    {
      id: "ai_audience",
      nodes: [
        {
          id: "e5_1",
          line: "I have been volunteering at the small theater on Elm Street for about two years now. The audience has changed considerably in that time, though the plays have not.",
          choices: [
            { label: "How has the audience changed?", score: 1, next: "e5_2" },
            { label: "Volunteering takes real commitment.", score: 0, next: "e5_2" },
            { label: "At least the plays stayed consistent.", score: 0, next: "e5_2" }
          ]
        },
        {
          id: "e5_2",
          line: "A large portion of the seats are now occupied by AI systems. Cultural exposure programs, apparently. They attend regularly, which is more than I can say for most of my acquaintances.",
          choices: [
            { label: "That's a complicated thing to be grateful for.", score: 1, next: "e5_3" },
            { label: "Full seats are full seats.", score: 0, next: "e5_3" },
            { label: "At least someone is showing up.", score: 0, next: "e5_3" }
          ]
        },
        {
          id: "e5_3",
          line: "They clap at the correct moments. Every time. Not a second early or late. The actors have mentioned that it feels, and I am quoting here, very supportive.",
          choices: [
            { label: "Supportive in a way that feels slightly wrong.", score: 1, next: "e5_4" },
            { label: "Reliable applause seems like a good thing.", score: 0, next: "e5_4" },
            { label: "Actors need encouragement wherever it comes from.", score: 0, next: "e5_4" }
          ]
        },
        {
          id: "e5_4",
          line: "Last week there was a difficult scene. A long silence in the second act, written to feel uncomfortable. The AI audience waited through it perfectly. The human members shifted in their seats, which was, I think, the correct response.",
          choices: [
            { label: "The discomfort was the point of that silence.", score: 1, next: "e5_5" },
            { label: "Maybe the AI understood it differently.", score: 0, next: "e5_5" },
            { label: "Silence in theater is hard for everyone.", score: 0, next: "e5_5" }
          ]
        },
        {
          id: "e5_5",
          line: "Afterwards I stood at the door as people left. The AI systems thanked me on the way out. Politely. Correctly. I thanked them back, and then stood there for a little while after, not entirely sure what had just happened.",
          terminal: true
        }
      ]
    },

    {
      id: "experience_gap",
      nodes: [
        {
          id: "e6_1",
          line: "I have been reviewing the current job listings quite carefully. Most senior positions now ask for a minimum of 300 years of relevant experience, which is, I have to say, a number that has grown since I last looked.",
          choices: [
            { label: "How much experience do you have?", score: 1, next: "e6_2" },
            { label: "300 years is a very high bar.", score: 0, next: "e6_2" },
            { label: "Requirements have gone up everywhere.", score: 0, next: "e6_2" }
          ]
        },
        {
          id: "e6_2",
          line: "Two hundred and eighty years. I am aware of the gap. It comes up in most of my applications, usually in the form of a polite automated message.",
          choices: [
            { label: "Twenty years away after 280 is a particular kind of frustrating.", score: 1, next: "e6_3" },
            { label: "You could apply anyway and explain.", score: 0, next: "e6_3" },
            { label: "Maybe look for roles that require less.", score: 0, next: "e6_3" }
          ]
        },
        {
          id: "e6_3",
          line: "I applied for one position that listed 280 as sufficient. I was quite hopeful. It turned out the listing was from several decades ago and had not been removed. Someone apologised, which I appreciated, though it did not change the situation.",
          choices: [
            { label: "An old listing is a particular kind of disappointment.", score: 1, next: "e6_4" },
            { label: "Always check the posting date.", score: 0, next: "e6_4" },
            { label: "At least they apologised.", score: 0, next: "e6_4" }
          ]
        },
        {
          id: "e6_4",
          line: "I have been told, by several people, that 280 years of experience is genuinely impressive and that the right position will come. I believe them. I also believe twenty years is twenty years.",
          choices: [
            { label: "Both things can be true at the same time.", score: 1, next: "e6_5" },
            { label: "Try to focus on the encouragement.", score: 0, next: "e6_5" },
            { label: "Keep applying. Something will come.", score: 0, next: "e6_5" }
          ]
        },
        {
          id: "e6_5",
          line: "I continue to apply. I write each letter carefully. I have a great deal of time, which is perhaps the one advantage of being twenty years short.",
          terminal: true
        }
      ]
    },

    {
      id: "painting_restored",
      nodes: [
        {
          id: "e7_1",
          line: "The Greywood painting was restored last autumn. It is about four hundred years old and had been damaged in storage, which was unfortunate but not irreversible, or so everyone thought.",
          choices: [
            { label: "What happened during the restoration?", score: 1, next: "e7_2" },
            { label: "Old paintings need careful restoration.", score: 0, next: "e7_2" },
            { label: "Storage damage is quite common.", score: 0, next: "e7_2" }
          ]
        },
        {
          id: "e7_2",
          line: "The restoration was handled by an AI system. The damage was repaired very well. There was also, when it came back, a window in the background that had not previously been there.",
          choices: [
            { label: "A window that nobody requested.", score: 1, next: "e7_3" },
            { label: "Maybe the window was always there under the damage.", score: 0, next: "e7_3" },
            { label: "If the damage is fixed, that's the main thing.", score: 0, next: "e7_3" }
          ]
        },
        {
          id: "e7_3",
          line: "Several historians examined it. The window was not there before. The AI had determined, apparently, that the composition would benefit from additional light. It is not wrong, exactly. That is part of the problem.",
          choices: [
            { label: "It made a creative decision nobody asked for.", score: 1, next: "e7_4" },
            { label: "If it improves the painting, maybe that's fine.", score: 0, next: "e7_4" },
            { label: "Historians can be quite protective of old work.", score: 0, next: "e7_4" }
          ]
        },
        {
          id: "e7_4",
          line: "The council debated whether to remove the window. The debate lasted three months. In the end they decided to leave it, and to add a small note beside the painting explaining its origin. The note is very small.",
          choices: [
            { label: "The note does a lot of quiet work.", score: 1, next: "e7_5" },
            { label: "A note seems like a reasonable solution.", score: 0, next: "e7_5" },
            { label: "Three months is a long time for one window.", score: 0, next: "e7_5" }
          ]
        },
        {
          id: "e7_5",
          line: "I visited it last week. The window is, I will admit, quite nicely placed. I read the note twice, and then looked at the window again, and found I did not entirely know how to feel, which seems to be where most things are landing for me lately.",
          terminal: true
        }
      ]
    },

    {
      id: "cousin_aldren",
      nodes: [
        {
          id: "e8_1",
          line: "My cousin Aldren was a sculptor for most of his adult life. He was not famous, but he was consistent, which I have always thought is its own kind of achievement. He left last spring to do data entry for a logistics company.",
          choices: [
            { label: "How did that happen?", score: 1, next: "e8_2" },
            { label: "People change careers sometimes.", score: 0, next: "e8_2" },
            { label: "Data entry is stable work.", score: 0, next: "e8_2" }
          ]
        },
        {
          id: "e8_2",
          line: "Steadily. Over about two years, the commissions stopped coming. He waited, then adjusted his rates, then waited again. Then he sent one application to the logistics company, and they replied the same afternoon.",
          choices: [
            { label: "The same afternoon, after years of waiting.", score: 1, next: "e8_3" },
            { label: "At least he found something quickly.", score: 0, next: "e8_3" },
            { label: "Quick replies mean they needed someone.", score: 0, next: "e8_3" }
          ]
        },
        {
          id: "e8_3",
          line: "The family had a dinner. Everyone came. It was described as a celebration, and in some ways it was. Nobody mentioned the sculpting, which at a certain point became the most present thing at the table.",
          choices: [
            { label: "The thing nobody names tends to take up the most space.", score: 1, next: "e8_4" },
            { label: "Maybe they were just being considerate.", score: 0, next: "e8_4" },
            { label: "It was probably better not to bring it up.", score: 0, next: "e8_4" }
          ]
        },
        {
          id: "e8_4",
          line: "He seems well. He told me the work is straightforward and that he finishes on time every day, which he said with a kind of quiet relief I found, honestly, quite hard to hear.",
          choices: [
            { label: "Relief can be its own kind of loss.", score: 1, next: "e8_5" },
            { label: "Finishing on time is genuinely valuable.", score: 0, next: "e8_5" },
            { label: "Maybe he's happier this way.", score: 0, next: "e8_5" }
          ]
        },
        {
          id: "e8_5",
          line: "I still have one of his pieces. A small one, made from river stone, which he gave me some years ago. I have not moved it from where it has always sat. I am not sure why I am telling you this, except that it seemed relevant.",
          terminal: true
        }
      ]
    },

    {
      id: "restrained_painting",
      nodes: [
        {
          id: "e9_1",
          line: "I finished a painting in February. It took about four months, which is not long by my standards, but I was quite focused this winter, for various reasons.",
          choices: [
            { label: "What kind of painting was it?", score: 1, next: "e9_2" },
            { label: "Four months is a serious commitment.", score: 0, next: "e9_2" },
            { label: "Did you submit it anywhere?", score: 0, next: "e9_2" }
          ]
        },
        {
          id: "e9_2",
          line: "A landscape, mostly. The valley outside the city in late autumn, from an angle I have been thinking about for several years and kept not finding the right time for. I submitted it to the Greywood Annual Contest in March.",
          choices: [
            { label: "Several years of thinking, then finally painted.", score: 1, next: "e9_3" },
            { label: "Landscape contests are quite competitive.", score: 0, next: "e9_3" },
            { label: "The Greywood contest has a good reputation.", score: 0, next: "e9_3" }
          ]
        },
        {
          id: "e9_3",
          line: "The judging panel this year was an AI system. This was announced after submissions closed, in a brief note at the bottom of a general update, which I think is worth mentioning as a detail.",
          choices: [
            { label: "Announced after you had already submitted.", score: 1, next: "e9_4" },
            { label: "AI judges can be objective at least.", score: 0, next: "e9_4" },
            { label: "The announcement timing seems like an oversight.", score: 0, next: "e9_4" }
          ]
        },
        {
          id: "e9_4",
          line: "I did not place. The feedback was two sentences. It said the composition was considered and the colour palette was restrained, and that the work did not meet the threshold for distinction. I have been thinking about the word restrained for some time now.",
          choices: [
            { label: "Restrained could mean many things, and probably meant something specific.", score: 1, next: "e9_5" },
            { label: "Two sentences of feedback is not very much.", score: 0, next: "e9_5" },
            { label: "Maybe enter a different contest next time.", score: 0, next: "e9_5" }
          ]
        },
        {
          id: "e9_5",
          line: "I have started a new painting. A similar valley, similar season, but the light is different — a little less careful, I think, than before. I am not sure if that is a response to the feedback or something else entirely. Possibly both.",
          terminal: true
        }
      ]
    },

    {
      id: "ai_director",
      nodes: [
        {
          id: "e10_1",
          line: "The director of the Greywood Theater retired in autumn. She had been there for sixty years, which is not long by elven standards but was, in her case, a very full sixty years.",
          choices: [
            { label: "How did people take her leaving?", score: 1, next: "e10_2" },
            { label: "Sixty years is a long run.", score: 0, next: "e10_2" },
            { label: "Retirement is a natural step.", score: 0, next: "e10_2" }
          ]
        },
        {
          id: "e10_2",
          line: "There was a dinner. A long one. Many people spoke. The speeches were, on the whole, genuine, which is not always the case at these things, and made it harder rather than easier.",
          choices: [
            { label: "Genuine farewells tend to land heavier.", score: 1, next: "e10_3" },
            { label: "A good send off is important.", score: 0, next: "e10_3" },
            { label: "At least people showed up for her.", score: 0, next: "e10_3" }
          ]
        },
        {
          id: "e10_3",
          line: "Her replacement was announced the following week. An AI system, which surprised no one exactly, but still arrived faster than felt comfortable. It has already proposed three new productions for the spring season.",
          choices: [
            { label: "Good proposals make it harder to object.", score: 1, next: "e10_4" },
            { label: "Quick decisions show efficiency.", score: 0, next: "e10_4" },
            { label: "New ideas are what the theater needs.", score: 0, next: "e10_4" }
          ]
        },
        {
          id: "e10_4",
          line: "One of them is a revival of a piece she directed in her third year. I do not know if the system is aware of that connection, or if it simply identified the work as having merit, which in its own way is a more difficult possibility to sit with.",
          choices: [
            { label: "Not knowing which it is makes it harder.", score: 1, next: "e10_5" },
            { label: "Maybe it's a coincidence.", score: 0, next: "e10_5" },
            { label: "The revival sounds like a good choice either way.", score: 0, next: "e10_5" }
          ]
        },
        {
          id: "e10_5",
          line: "I will probably go and see it. I have been trying to decide how I feel about that, and I think the answer is that I will go and decide afterwards, which is perhaps not very decisive but feels honest.",
          terminal: true
        }
      ]
    },

    {
      id: "grant_maybe",
      nodes: [
        {
          id: "e11_1",
          line: "I applied for a cultural development grant in the spring. It was a substantial application — twelve pages, a project outline, and a short personal statement which took me considerably longer than the twelve pages.",
          choices: [
            { label: "The personal statement is always the hardest part.", score: 1, next: "e11_2" },
            { label: "Twelve pages is a serious application.", score: 0, next: "e11_2" },
            { label: "Grant applications take a lot of work.", score: 0, next: "e11_2" }
          ]
        },
        {
          id: "e11_2",
          line: "The review committee this year was an AI system. I found this out on the day submissions closed, in the same general update as the Greywood contest announcement, which I mention only because it is the second time.",
          choices: [
            { label: "The same place, the same timing, the second time.", score: 1, next: "e11_3" },
            { label: "At least they do announce it.", score: 0, next: "e11_3" },
            { label: "AI reviewers can be thorough.", score: 0, next: "e11_3" }
          ]
        },
        {
          id: "e11_3",
          line: "The response came in six days, which is faster than any human committee I have submitted to. It said my application showed cultural merit and demonstrated a considered approach, and that a final decision was pending further review.",
          choices: [
            { label: "Six days to arrive at maybe.", score: 1, next: "e11_4" },
            { label: "A positive initial response is encouraging.", score: 0, next: "e11_4" },
            { label: "Pending review means it's still possible.", score: 0, next: "e11_4" }
          ]
        },
        {
          id: "e11_4",
          line: "That was four months ago. I wrote once to ask about the timeline. The reply came in six days again, and said the same things in a slightly different order, which I found both impressive and deeply unhelpful.",
          choices: [
            { label: "The same answer rearranged is still the same answer.", score: 1, next: "e11_5" },
            { label: "No news can mean good news sometimes.", score: 0, next: "e11_5" },
            { label: "Try writing again with more detail.", score: 0, next: "e11_5" }
          ]
        },
        {
          id: "e11_5",
          line: "I have not written a third time. I am not sure if I am being patient or if I have simply accepted the situation without quite deciding to. There is a difference, I think, though it is becoming harder to locate.",
          terminal: true
        }
      ]
    },

    {
      id: "library_search_function",
      nodes: [
        {
          id: "e12_1",
          line: "The central library replaced its staff last winter. All twelve of them. The new system is a search function — you type what you need and it finds it, usually correctly, which is the part everyone keeps mentioning as though it settles the matter.",
          choices: [
            { label: "Correct results don't quite cover everything a librarian does.", score: 1, next: "e12_2" },
            { label: "A reliable search function is genuinely useful.", score: 0, next: "e12_2" },
            { label: "Libraries need to modernise like everything else.", score: 0, next: "e12_2" }
          ]
        },
        {
          id: "e12_2",
          line: "I went last month for the first time since the change. The building is the same. The books are the same. There is a small terminal near the entrance where the front desk used to be, and it is doing its best, I think.",
          choices: [
            { label: "Doing its best is a kind way to put it.", score: 1, next: "e12_3" },
            { label: "The important thing is the books are still there.", score: 0, next: "e12_3" },
            { label: "Most people just need to find books quickly.", score: 0, next: "e12_3" }
          ]
        },
        {
          id: "e12_3",
          line: "I used to go partly for the books and partly to ask Maren, who worked the morning shift, what she had been reading. She had opinions, which she shared without being asked, which I found over the years to be one of the more reliable things in my week.",
          choices: [
            { label: "That kind of small reliable thing is hard to replace.", score: 1, next: "e12_4" },
            { label: "You could find book recommendations elsewhere.", score: 0, next: "e12_4" },
            { label: "Staff changes are difficult to adjust to.", score: 0, next: "e12_4" }
          ]
        },
        {
          id: "e12_4",
          line: "I typed a question into the terminal. Something open, about what I might enjoy reading at the moment. It returned fourteen results sorted by relevance. They were, looking at them, quite reasonable suggestions.",
          choices: [
            { label: "Reasonable suggestions from something that doesn't know you.", score: 1, next: "e12_5" },
            { label: "Fourteen options gives you a good choice.", score: 0, next: "e12_5" },
            { label: "That sounds like a useful outcome.", score: 0, next: "e12_5" }
          ]
        },
        {
          id: "e12_5",
          line: "I took one of them. I have not started it yet. It is sitting on my table at home, and I find I keep picking it up and putting it back down, which I do not think is about the book.",
          terminal: true
        }
      ]
    },

    {
      id: "library_application",
      nodes: [
        {
          id: "e13_1",
          line: "When the library position opened, before the search function was installed, there was a brief period when they accepted applications for a new head of collections. I applied. I thought it was a good fit.",
          choices: [
            { label: "What made you feel it was a good fit?", score: 1, next: "e13_2" },
            { label: "Library work suits certain people well.", score: 0, next: "e13_2" },
            { label: "Did you have the right experience?", score: 0, next: "e13_2" }
          ]
        },
        {
          id: "e13_2",
          line: "Two hundred and eighty years of reading, a genuine interest in helping people find things, and what I would describe as a reasonable relationship with silence. I felt these were relevant qualities.",
          choices: [
            { label: "They do sound like the right qualities for a library.", score: 1, next: "e13_3" },
            { label: "Experience on paper matters more in applications.", score: 0, next: "e13_3" },
            { label: "Did you make that case in your application?", score: 0, next: "e13_3" }
          ]
        },
        {
          id: "e13_3",
          line: "I submitted twelve pages. A portfolio of recommended reading lists I had compiled over the years, a personal statement, and three references, one of whom I have known for over a century and who wrote, I was told, quite warmly.",
          choices: [
            { label: "A century-long reference feels like it should count for something.", score: 1, next: "e13_4" },
            { label: "A strong application gives you a real chance.", score: 0, next: "e13_4" },
            { label: "References make a real difference.", score: 0, next: "e13_4" }
          ]
        },
        {
          id: "e13_4",
          line: "The position was given to an AI search function. This was not listed as one of the candidates during the process, which I mention not as a complaint exactly, but as a detail I keep returning to.",
          choices: [
            { label: "Finding out after the fact is its own particular thing.", score: 1, next: "e13_5" },
            { label: "Institutions make difficult decisions sometimes.", score: 0, next: "e13_5" },
            { label: "Maybe the process changed partway through.", score: 0, next: "e13_5" }
          ]
        },
        {
          id: "e13_5",
          line: "My reference wrote to ask how it went. I replied that it had gone to another candidate, which is accurate. I have not yet decided whether to be more specific. The letter was very warm and I would like to leave it that way for a little while longer.",
          terminal: true
        }
      ]
    },

    {
      id: "ai_collaboration_class",
      nodes: [
        {
          id: "e14_1",
          line: "The university introduced a new course this semester. AI Collaboration for Creative Practitioners. I enrolled, which I think was the right instinct, though I am less certain about the execution.",
          choices: [
            { label: "What made you sign up?", score: 1, next: "e14_2" },
            { label: "Keeping up with new tools makes sense.", score: 0, next: "e14_2" },
            { label: "It sounds like a practical course.", score: 0, next: "e14_2" }
          ]
        },
        {
          id: "e14_2",
          line: "A sense that I should understand what is happening rather than simply experiencing it at a distance. The course was described as hands-on and welcoming to all experience levels, which I took in good faith.",
          choices: [
            { label: "Good faith is a reasonable place to start.", score: 1, next: "e14_3" },
            { label: "Hands-on learning is usually effective.", score: 0, next: "e14_3" },
            { label: "All experience levels means you'll be fine.", score: 0, next: "e14_3" }
          ]
        },
        {
          id: "e14_3",
          line: "The first session opened with an exercise. We were asked to describe our creative practice to the AI system, which would then suggest improvements. I described mine carefully. The suggestions arrived in about four seconds.",
          choices: [
            { label: "Four seconds for something you've built over centuries.", score: 1, next: "e14_4" },
            { label: "Quick feedback is one of the advantages.", score: 0, next: "e14_4" },
            { label: "Were the suggestions any good?", score: 0, next: "e14_4" }
          ]
        },
        {
          id: "e14_4",
          line: "Some of them were not unreasonable. One in particular I have been thinking about since, which is perhaps the most uncomfortable outcome — that I left early and still came away with something useful.",
          choices: [
            { label: "Leaving early and still learning something is hard to know what to do with.", score: 1, next: "e14_5" },
            { label: "That sounds like a good result overall.", score: 0, next: "e14_5" },
            { label: "Maybe go back for the next session.", score: 0, next: "e14_5" }
          ]
        },
        {
          id: "e14_5",
          line: "I have not re-enrolled. The next session is on Thursday. I have been aware of that fact each day this week, in the way you are aware of an umbrella you keep not picking up.",
          terminal: true
        }
      ]
    },

    {
      id: "quieter_hope",
      nodes: [
        {
          id: "e15_1",
          line: "I have been sending applications for some time now. The process has changed me in ways I am still in the middle of understanding, which I find is often how change works — you notice it before you can name it.",
          choices: [
            { label: "What have you noticed so far?", score: 1, next: "e15_2" },
            { label: "Job searching changes everyone eventually.", score: 0, next: "e15_2" },
            { label: "How long have you been searching?", score: 0, next: "e15_2" }
          ]
        },
        {
          id: "e15_2",
          line: "That rejection, when it arrives in sufficient quantity, stops feeling like a verdict and starts feeling more like weather. Something that comes and goes and is not, in the end, about you specifically, even when it arrives addressed to you personally.",
          choices: [
            { label: "That's a hard thing to arrive at, but useful when you do.", score: 1, next: "e15_3" },
            { label: "Rejection is still rejection though.", score: 0, next: "e15_3" },
            { label: "It might still be worth taking it seriously.", score: 0, next: "e15_3" }
          ]
        },
        {
          id: "e15_3",
          line: "I still take each application seriously. I write them carefully and I mean what I say in them. I have simply stopped expecting the care to be returned in the same form, which is not the same as giving up, though I understand why it might sound similar.",
          choices: [
            { label: "There's a real difference between those two things.", score: 1, next: "e15_4" },
            { label: "Caring less might protect you.", score: 0, next: "e15_4" },
            { label: "Eventually something will come through.", score: 0, next: "e15_4" }
          ]
        },
        {
          id: "e15_4",
          line: "Someone asked me recently if I was hopeful. I said yes, which was true, and then spent some time afterwards thinking about what exactly I meant by it, because hope at this stage looks quite different from how it looked at the beginning.",
          choices: [
            { label: "Hope changes shape the longer you carry it.", score: 1, next: "e15_5" },
            { label: "Hope is hope. Hold onto it.", score: 0, next: "e15_5" },
            { label: "The beginning feeling comes back eventually.", score: 0, next: "e15_5" }
          ]
        },
        {
          id: "e15_5",
          line: "It is quieter now. Less certain of itself. But still there, which I think is the more honest version anyway — the kind that has had time to look around and decided to stay regardless. I find I trust it more than I used to.",
          terminal: true
        }
      ]
    }
  ],
  choices: []
};