import {Share} from 'react-native';
import type {BigRiverFocusStory} from '../../../BigRiverFocus/BigRiverFocusConstants/BigRiverFocusStories/BigRiverFocusStoriesData/BigRiverFocusStories';

export async function bigRiverFocusShareStoryResult(
  story: BigRiverFocusStory,
  correctAnswers: number,
  totalQuestions: number,
): Promise<void> {
  const message = [
    `BigRiverFocusStory: ${story.title}`,
    `Score: ${correctAnswers}/${totalQuestions}`,
    `Fish earned: ${correctAnswers.toString().padStart(3, '0')}`,
  ].join('\n');

  try {
    await Share.share({message, title: 'My story results'});
  } catch {}
}

export async function bigRiverFocusShareStory(story: BigRiverFocusStory): Promise<void> {
  const message = [`${story.title}`, '', story.body].join('\n');

  try {
    await Share.share({message, title: story.title});
  } catch {}
}
