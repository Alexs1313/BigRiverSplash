export type BigRiverFocusShopFishItem = {
  id: string;
  fishIndex: number;
  source: number;
  price: number;
};

export type BigRiverFocusShopVisualItem = {
  id: string;
  source: number;
  price: number;
  shareTitle: string;
};

export const BIG_RIVER_FOCUS_SHOP_FISH_ITEMS: BigRiverFocusShopFishItem[] = [
  {
    id: 'yellow',
    fishIndex: 1,
    source: require('../../../BigRiverFocusAssets/BigRiverFocusYellow_fish.png'),
    price: 10,
  },
  {
    id: 'red',
    fishIndex: 2,
    source: require('../../../BigRiverFocusAssets/BigRiverFocusRed_fish.png'),
    price: 20,
  },
  {
    id: 'purple',
    fishIndex: 3,
    source: require('../../../BigRiverFocusAssets/BigRiverFocusPurple_fish.png'),
    price: 30,
  },
];

export const BIG_RIVER_FOCUS_SHOP_BACKGROUNDS: BigRiverFocusShopVisualItem[] = [
  {
    id: 'bg1',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusAquariumbg1.png'),
    price: 30,
    shareTitle: 'Coral Reef',
  },
  {
    id: 'bg2',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusAquariumbg2.png'),
    price: 40,
    shareTitle: 'Deep Canyon',
  },
  {
    id: 'bg3',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusAquariumbg3.png'),
    price: 50,
    shareTitle: 'Starlit Depths',
  },
  {
    id: 'bg4',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusAquariumbg4.png'),
    price: 70,
    shareTitle: 'Neon Path',
  },
];

export const BIG_RIVER_FOCUS_SHOP_WALLPAPERS: BigRiverFocusShopVisualItem[] = [
  {
    id: 'wp1',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusWallpapers1.png'),
    price: 40,
    shareTitle: 'Treasure Diver',
  },
  {
    id: 'wp2',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusWallpapers2.png'),
    price: 50,
    shareTitle: 'Sunset Raccoon',
  },
  {
    id: 'wp3',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusWallpapers3.png'),
    price: 60,
    shareTitle: 'Wave Hello',
  },
  {
    id: 'wp4',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusWallpapers4.png'),
    price: 70,
    shareTitle: 'Portal Glow',
  },
  {
    id: 'wp5',
    source: require('../../../BigRiverFocusAssets/BigRiverFocusWallpapers5.png'),
    price: 80,
    shareTitle: 'Snorkel Buddy',
  },
];

export const BIG_RIVER_FOCUS_DEFAULT_AQUARIUM_BACKGROUND = require('../../../BigRiverFocusAssets/BigRiverFocusAquarium_bg.png');
