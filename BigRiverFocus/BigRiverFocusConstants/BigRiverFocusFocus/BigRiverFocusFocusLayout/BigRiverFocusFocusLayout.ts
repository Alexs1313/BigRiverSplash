import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

export const BIG_RIVER_FOCUS_FOCUS_LAYOUT = {
  headerPaddingTop: bigRiverFocusVerticalScale(10),
  headerHeight: bigRiverFocusVerticalScale(72),
  headerSide: bigRiverFocusScale(24),
  headerGap: bigRiverFocusScale(8),
  sectionGap: bigRiverFocusVerticalScale(8),

  idleBoatOffset: bigRiverFocusVerticalScale(24),
  idleBoatHeight: bigRiverFocusVerticalScale(360),

  sessionBoatHeight: bigRiverFocusVerticalScale(240),
  aquariumHeight: bigRiverFocusVerticalScale(210),
  aquariumWidth: bigRiverFocusScale(345),

  resultCharacterHeight: bigRiverFocusVerticalScale(280),
  resultBoardOffset: bigRiverFocusVerticalScale(190),

  footerBottom: bigRiverFocusVerticalScale(12),
  sessionFinishWidth: bigRiverFocusScale(250),
  iconButtonSize: bigRiverFocusScale(74),
} as const;
