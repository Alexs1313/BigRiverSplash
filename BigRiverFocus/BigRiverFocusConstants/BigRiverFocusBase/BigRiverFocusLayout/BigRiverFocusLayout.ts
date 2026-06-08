import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const BIG_RIVER_FOCUS_DESIGN_WIDTH = 393;
export const BIG_RIVER_FOCUS_DESIGN_HEIGHT = 852;

export const bigRiverFocusScale = (size: number) => (SCREEN_WIDTH / BIG_RIVER_FOCUS_DESIGN_WIDTH) * size;
export const bigRiverFocusVerticalScale = (size: number) =>
  (SCREEN_HEIGHT / BIG_RIVER_FOCUS_DESIGN_HEIGHT) * size;
