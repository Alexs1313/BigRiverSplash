import {Share} from 'react-native';
import type {BigRiverFocusShopVisualItem} from '../../../BigRiverFocus/BigRiverFocusConstants/BigRiverFocusShop/BigRiverFocusShopItems/BigRiverFocusShopItems';

export async function bigRiverFocusShareWallpaper(item: BigRiverFocusShopVisualItem): Promise<void> {
  const message = [
    `Wallpaper: ${item.shareTitle}`,
    'Collected in the Market.',
  ].join('\n');

  try {
    await Share.share({message, title: item.shareTitle});
  } catch {}
}
