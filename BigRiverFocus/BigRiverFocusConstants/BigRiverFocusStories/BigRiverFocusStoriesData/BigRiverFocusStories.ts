export type BigRiverFocusStoryOption = {
  id: string;
  text: string;
};

export type BigRiverFocusStoryQuestion = {
  id: string;
  text: string;
  options: BigRiverFocusStoryOption[];
  correctOptionId: string;
};

export type BigRiverFocusStory = {
  id: string;
  title: string;
  preview: string;
  body: string;
  questions: BigRiverFocusStoryQuestion[];
};

export const BIG_RIVER_FOCUS_STORIES: BigRiverFocusStory[] = [
  {
    id: 'foggy-morning',
    title: 'Foggy Morning',
    preview:
      'The sun had not yet risen over the lake when I went out on the water...',
    body: `The sun had not yet risen over the lake when I went out on the water. There was a thick fog all around, and the boat moved almost by feel. I knew this place well, but in the fog even a familiar lake seems new.

I cast my rod and decided not to rush. Fishing teaches patience. When you can't see the shore, you learn to trust yourself. A few minutes later the line twitched. It was the first fish of the day - small, but honestly earned.

I caught only three fish that morning, but each of them reminded me: the main thing is not to rush, but to concentrate.`,
    questions: [
      {
        id: 'q1',
        text: 'When did the raccoon swim to the lake?',
        options: [
          {id: 'a', text: 'At noon'},
          {id: 'b', text: 'Early in the morning before sunrise'},
          {id: 'c', text: 'Late in the evening'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        text: 'How many fish did he catch that morning?',
        options: [
          {id: 'a', text: 'Three'},
          {id: 'b', text: 'Five'},
          {id: 'c', text: 'One'},
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q3',
        text: 'What was special about the weather?',
        options: [
          {id: 'a', text: 'Heavy rain'},
          {id: 'b', text: 'Thick fog'},
          {id: 'c', text: 'Snow'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q4',
        text: 'Why did the lake seem new?',
        options: [
          {id: 'a', text: 'It changed its location'},
          {id: 'b', text: 'Because of the fog'},
          {id: 'c', text: 'Because of the wind'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q5',
        text: 'What is the main lesson of this story?',
        options: [
          {id: 'a', text: 'You need to hurry'},
          {id: 'b', text: 'Strength is important'},
          {id: 'c', text: 'The main thing is concentration and patience'},
        ],
        correctOptionId: 'c',
      },
    ],
  },
  {
    id: 'strong-wind',
    title: 'Strong Wind',
    preview:
      'One time the wind was so strong that the waves rocked the boat from side to side...',
    body: `One time the wind was so strong that the waves rocked the boat from side to side. I could have returned home, but I decided to stay. Difficult conditions are part of the journey.

I reduced the bait and changed the fishing spot, hiding near the reeds. The water was calmer there. After a while, I managed to catch five fish.

That day I realized: when the conditions are difficult, you need not to give up, but to adapt.`,
    questions: [
      {
        id: 'q1',
        text: 'What was the weather like?',
        options: [
          {id: 'a', text: 'Hot and quiet'},
          {id: 'b', text: 'Strong wind'},
          {id: 'c', text: 'Frost'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        text: 'Where did the raccoon decide to fish?',
        options: [
          {id: 'a', text: 'In the center of the lake'},
          {id: 'b', text: 'Near the reeds'},
          {id: 'c', text: 'On the shore'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q3',
        text: 'How many fish did he catch?',
        options: [
          {id: 'a', text: 'Two'},
          {id: 'b', text: 'Five'},
          {id: 'c', text: 'Seven'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q4',
        text: 'What did he change while fishing?',
        options: [
          {id: 'a', text: 'Boat'},
          {id: 'b', text: 'Bait and fishing spot'},
          {id: 'c', text: 'Clothes'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q5',
        text: 'What is the main conclusion?',
        options: [
          {id: 'a', text: 'We need to return home'},
          {id: 'b', text: 'We need to adapt to the conditions'},
          {id: 'c', text: 'It is better to wait for the sun'},
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    id: 'quiet-bay',
    title: 'Quiet Bay',
    preview:
      'There is a small bay on the lake where rarely anyone swims...',
    body: `There is a small bay on the lake where rarely anyone swims. The water there is calm, and the fish behave cautiously.

I turned off all unnecessary sounds, sat down comfortably and just watched. After a while, the water began to move - the fish rose closer to the surface. I cast the rod only once and immediately got a big catch.

Sometimes silence is enough to see the opportunity.`,
    questions: [
      {
        id: 'q1',
        text: 'What was the fishing spot like?',
        options: [
          {id: 'a', text: 'Noisy'},
          {id: 'b', text: 'Quiet bay'},
          {id: 'c', text: 'Stormy river'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        text: 'What did the raccoon do before casting his fishing rod?',
        options: [
          {id: 'a', text: 'Started singing loudly'},
          {id: 'b', text: 'Watched in silence'},
          {id: 'c', text: 'Moved to another place'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q3',
        text: 'How many times did he cast the rod?',
        options: [
          {id: 'a', text: 'Once'},
          {id: 'b', text: 'Five times'},
          {id: 'c', text: 'Ten times'},
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q4',
        text: 'What was the catch?',
        options: [
          {id: 'a', text: 'Small'},
          {id: 'b', text: 'Large'},
          {id: 'c', text: 'Zero'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q5',
        text: 'What is the lesson of history?',
        options: [
          {id: 'a', text: 'We must hurry'},
          {id: 'b', text: 'Silence helps us see the opportunity'},
          {id: 'c', text: 'We must change the boat'},
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    id: 'big-catch',
    title: 'Big Catch',
    preview:
      'That was the day when I was lucky enough to catch the biggest fish of the whole season...',
    body: `That was the day when I was lucky enough to catch the biggest fish of the whole season. It fought for a long time, pulling the line deep under the water.

I took my time and did not jerk sharply. I kept the tension even and waited for the right moment. After a few minutes, the fish got tired, and I carefully pulled it to the boat.

Big goals require endurance, not strength.`,
    questions: [
      {
        id: 'q1',
        text: 'What was the fish?',
        options: [
          {id: 'a', text: 'The smallest'},
          {id: 'b', text: 'The biggest of the season'},
          {id: 'c', text: 'Golden'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        text: 'How did the fish behave?',
        options: [
          {id: 'a', text: "It didn't move"},
          {id: 'b', text: 'It struggled for a long time'},
          {id: 'c', text: 'It gave up immediately'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q3',
        text: 'What did the raccoon do?',
        options: [
          {id: 'a', text: 'Pulled hard'},
          {id: 'b', text: 'Kept the tension even'},
          {id: 'c', text: 'Let go of the rod'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q4',
        text: "What didn't he do?",
        options: [
          {id: 'a', text: 'Rushed'},
          {id: 'b', text: 'Waited'},
          {id: 'c', text: "Didn't panic"},
        ],
        correctOptionId: 'c',
      },
      {
        id: 'q5',
        text: 'The main lesson?',
        options: [
          {id: 'a', text: 'Big goals require endurance'},
          {id: 'b', text: 'Needs strength'},
          {id: 'c', text: 'Needs more bait'},
        ],
        correctOptionId: 'a',
      },
    ],
  },
  {
    id: 'mistake',
    title: 'Mistake',
    preview: 'Once I was in a hurry. I cast my rod without checking the knot...',
    body: `Once I was in a hurry. I cast my rod without checking the knot. When the fish bit, the line broke.

I lost my catch, but I learned a lesson. The next time I checked everything twice. That day I caught four fish without losing a single one.

Mistakes are not failures if you draw conclusions.`,
    questions: [
      {
        id: 'q1',
        text: 'What did the raccoon forget to check?',
        options: [
          {id: 'a', text: 'Boat'},
          {id: 'b', text: 'Knot in the line'},
          {id: 'c', text: 'Hat'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        text: 'What happened during the bite?',
        options: [
          {id: 'a', text: 'The line broke'},
          {id: 'b', text: 'The fish ran away for no reason'},
          {id: 'c', text: 'It started to rain'},
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q3',
        text: 'How many fish did he catch the next time?',
        options: [
          {id: 'a', text: 'Four'},
          {id: 'b', text: 'One'},
          {id: 'c', text: 'None'},
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q4',
        text: 'What did he do before trying again?',
        options: [
          {id: 'a', text: 'Checked everything twice'},
          {id: 'b', text: 'Changed the boat'},
          {id: 'c', text: 'Went home'},
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q5',
        text: 'What is the conclusion?',
        options: [
          {id: 'a', text: 'Mistakes are the end'},
          {id: 'b', text: 'Mistakes teach lessons'},
          {id: 'c', text: "Don't try again"},
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    id: 'rainy-day',
    title: 'Rainy Day',
    preview: 'The sky became cloudy and it started to rain...',
    body: `The sky became cloudy and it started to rain. Many people think that this is a bad time to fish, but I know otherwise. During the rain, fish often rise closer to the surface.

I put on my hood and continued fishing. In an hour, I caught six fish.

Sometimes the best results come when others give up.`,
    questions: [
      {
        id: 'q1',
        text: 'What was the weather like?',
        options: [
          {id: 'a', text: 'Sunny'},
          {id: 'b', text: 'Rainy'},
          {id: 'c', text: 'Windy'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        text: 'What did the fish do during the rain?',
        options: [
          {id: 'a', text: 'Hiding deep'},
          {id: 'b', text: 'Rising closer to the surface'},
          {id: 'c', text: 'Disappearing'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q3',
        text: 'How many fish did he catch?',
        options: [
          {id: 'a', text: 'Six'},
          {id: 'b', text: 'Two'},
          {id: 'c', text: 'Ten'},
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q4',
        text: 'Did he stop fishing?',
        options: [
          {id: 'a', text: 'Yes'},
          {id: 'b', text: 'No'},
          {id: 'c', text: 'Partially'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q5',
        text: 'What is the main lesson?',
        options: [
          {id: 'a', text: 'It is better to wait for the sun'},
          {id: 'b', text: 'The best results come when others give up'},
          {id: 'c', text: 'Rain should be avoided'},
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    id: 'sunset',
    title: 'Sunset',
    preview: 'The evening was quiet. The sun was slowly sinking behind the hills...',
    body: `The evening was quiet. The sun was slowly sinking behind the hills, and the water was turning golden. I had caught only two fish all evening.

But that day I didn't count my catch. I looked at the reflection of the sun in the water and thought about the journey I had made. Fishing is not just about the fish. It's about the time you spend with benefit.

Sometimes the greatest reward is peace and clarity of thought.`,
    questions: [
      {
        id: 'q1',
        text: 'What time of day was it?',
        options: [
          {id: 'a', text: 'Morning'},
          {id: 'b', text: 'Evening'},
          {id: 'c', text: 'Noon'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        text: 'How many fish were caught?',
        options: [
          {id: 'a', text: 'Two'},
          {id: 'b', text: 'Five'},
          {id: 'c', text: 'Eight'},
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q3',
        text: 'What color was the lake?',
        options: [
          {id: 'a', text: 'Gray'},
          {id: 'b', text: 'Golden'},
          {id: 'c', text: 'Dark blue'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q4',
        text: 'What was the raccoon thinking about?',
        options: [
          {id: 'a', text: 'About a new bait'},
          {id: 'b', text: 'About the path traveled'},
          {id: 'c', text: 'About the wind'},
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q5',
        text: 'The main reward in history is:',
        options: [
          {id: 'a', text: 'A big catch'},
          {id: 'b', text: 'Peace and clarity of thought'},
          {id: 'c', text: 'A new boat'},
        ],
        correctOptionId: 'b',
      },
    ],
  },
];

export function bigRiverFocusGetStoryById(id: string): BigRiverFocusStory | undefined {
  return BIG_RIVER_FOCUS_STORIES.find(story => story.id === id);
}

export function bigRiverFocusGetStarCount(correctAnswers: number, totalQuestions: number): number {
  const ratio = correctAnswers / totalQuestions;
  if (ratio >= 0.9) {
    return 3;
  }
  if (ratio >= 0.6) {
    return 2;
  }
  if (ratio >= 0.3) {
    return 1;
  }
  return 0;
}
