export type BigRiverFocusFishType = {
  id: string;
  source: number;
};

export const BIG_RIVER_FOCUS_AQUARIUM_FISH: BigRiverFocusFishType[] = [
  {id: 'blue', source: require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')},
  {id: 'yellow', source: require('../../../BigRiverFocusAssets/BigRiverFocusYellow_fish.png')},
  {id: 'red', source: require('../../../BigRiverFocusAssets/BigRiverFocusRed_fish.png')},
  {id: 'purple', source: require('../../../BigRiverFocusAssets/BigRiverFocusPurple_fish.png')},
];

export const BIG_RIVER_FOCUS_DEFAULT_FISH_COUNTS = [5, 0, 0, 0];
