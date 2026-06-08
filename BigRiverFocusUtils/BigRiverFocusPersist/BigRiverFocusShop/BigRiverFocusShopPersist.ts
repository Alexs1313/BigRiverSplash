import AsyncStorage from '@react-native-async-storage/async-storage';
import {BIG_RIVER_FOCUS_DEFAULT_FISH_COUNTS} from '../../../BigRiverFocus/BigRiverFocusConstants/BigRiverFocusAquarium/BigRiverFocusAquariumData/BigRiverFocusAquariumFish';

export const BIG_RIVER_FOCUS_SHOP_PERSIST_KEY = '@big_river_splash/shop';

export type BigRiverFocusShopData = {
  fishBalance: number;
  ownedBackgroundIds: string[];
  ownedWallpaperIds: string[];
  equippedBackgroundId: string | null;
  aquariumFishCounts: number[];
};

export const BIG_RIVER_FOCUS_DEFAULT_SHOP_DATA: BigRiverFocusShopData = {
  fishBalance: 68,
  ownedBackgroundIds: [],
  ownedWallpaperIds: [],
  equippedBackgroundId: null,
  aquariumFishCounts: [...BIG_RIVER_FOCUS_DEFAULT_FISH_COUNTS],
};

export async function bigRiverFocusLoadShopData(): Promise<BigRiverFocusShopData> {
  const raw = await AsyncStorage.getItem(BIG_RIVER_FOCUS_SHOP_PERSIST_KEY);
  if (!raw) {
    return {...BIG_RIVER_FOCUS_DEFAULT_SHOP_DATA, aquariumFishCounts: [...BIG_RIVER_FOCUS_DEFAULT_FISH_COUNTS]};
  }

  try {
    const parsed = JSON.parse(raw) as Partial<BigRiverFocusShopData>;
    return {
      fishBalance: parsed.fishBalance ?? BIG_RIVER_FOCUS_DEFAULT_SHOP_DATA.fishBalance,
      ownedBackgroundIds: parsed.ownedBackgroundIds ?? [],
      ownedWallpaperIds: parsed.ownedWallpaperIds ?? [],
      equippedBackgroundId: parsed.equippedBackgroundId ?? null,
      aquariumFishCounts: Array.isArray(parsed.aquariumFishCounts)
        ? parsed.aquariumFishCounts
        : [...BIG_RIVER_FOCUS_DEFAULT_FISH_COUNTS],
    };
  } catch {
    return {...BIG_RIVER_FOCUS_DEFAULT_SHOP_DATA, aquariumFishCounts: [...BIG_RIVER_FOCUS_DEFAULT_FISH_COUNTS]};
  }
}

export async function bigRiverFocusSaveShopData(data: BigRiverFocusShopData): Promise<void> {
  await AsyncStorage.setItem(BIG_RIVER_FOCUS_SHOP_PERSIST_KEY, JSON.stringify(data));
}

export async function bigRiverFocusUpdateShopData(
  updater: (data: BigRiverFocusShopData) => BigRiverFocusShopData,
): Promise<BigRiverFocusShopData> {
  const current = await bigRiverFocusLoadShopData();
  const next = updater(current);
  await bigRiverFocusSaveShopData(next);
  return next;
}

export async function bigRiverFocusAddFishBalance(amount: number): Promise<BigRiverFocusShopData> {
  if (amount <= 0) {
    return bigRiverFocusLoadShopData();
  }

  return bigRiverFocusUpdateShopData(data => ({
    ...data,
    fishBalance: data.fishBalance + amount,
  }));
}
