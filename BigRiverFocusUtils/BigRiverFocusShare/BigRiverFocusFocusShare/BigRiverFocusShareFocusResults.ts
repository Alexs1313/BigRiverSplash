import {Share} from 'react-native';
import {bigRiverFocusFormatTime} from '../../BigRiverFocusFormatting/BigRiverFocusTime/BigRiverFocusFormatTime';

export async function bigRiverFocusShareFocusResults(
  elapsedSeconds: number,
  fishCount: number,
): Promise<void> {
  const message = [
    `Time: ${bigRiverFocusFormatTime(elapsedSeconds)}`,
    `Fish caught: ${fishCount.toString().padStart(3, '0')}`,
  ].join('\n');

  try {
    await Share.share({message, title: 'My focus results'});
  } catch {}
}
