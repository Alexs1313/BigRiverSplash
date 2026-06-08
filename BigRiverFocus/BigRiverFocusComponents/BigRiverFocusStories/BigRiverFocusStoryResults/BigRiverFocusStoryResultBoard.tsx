import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusStoryResultBoardProps = {
  stars: number;
  fishCount: number;
};

function StarIcon({filled}: {filled: boolean}) {
  return (
    <Text style={[styles.bigRiverFocusStar, !filled && styles.bigRiverFocusStarEmpty]}>
      {filled ? '★' : '☆'}
    </Text>
  );
}

export function BigRiverFocusStoryResultBoard({stars, fishCount}: BigRiverFocusStoryResultBoardProps) {
  return (
    <View style={styles.bigRiverFocusWrapper}>
      <Image
        source={require('../../../BigRiverFocusAssets/BigRiverFocusBoard.png')}
        style={styles.bigRiverFocusBoard}
        resizeMode="contain"
      />
      <View style={styles.bigRiverFocusContent}>
        <View style={styles.bigRiverFocusRow}>
          <View style={styles.bigRiverFocusIconCell}>
            <StarIcon filled={stars >= 1} />
          </View>
          <View style={styles.bigRiverFocusValueCell}>
            <View style={styles.bigRiverFocusStarsRow}>
              <StarIcon filled={stars >= 1} />
              <StarIcon filled={stars >= 2} />
              <StarIcon filled={stars >= 3} />
            </View>
          </View>
        </View>
        <View style={styles.bigRiverFocusRow}>
          <View style={styles.bigRiverFocusIconCell}>
            <Image
              source={require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')}
              style={styles.bigRiverFocusFishIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.bigRiverFocusValueCell}>
            <Text style={styles.bigRiverFocusValue}>
              {fishCount.toString().padStart(3, '0')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusWrapper: {
    width: bigRiverFocusScale(334),
    height: bigRiverFocusVerticalScale(220),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusBoard: {
    ...StyleSheet.absoluteFillObject,
  },
  bigRiverFocusContent: {
    width: bigRiverFocusScale(220),
    gap: bigRiverFocusVerticalScale(12),
    marginTop: bigRiverFocusVerticalScale(20),
  },
  bigRiverFocusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: bigRiverFocusScale(8),
  },
  bigRiverFocusIconCell: {
    width: bigRiverFocusScale(44),
    height: bigRiverFocusVerticalScale(44),
    borderRadius: bigRiverFocusScale(10),
    backgroundColor: bigRiverFocusColors.panelYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusValueCell: {
    flex: 1,
    height: bigRiverFocusVerticalScale(44),
    borderRadius: bigRiverFocusScale(10),
    backgroundColor: bigRiverFocusColors.panelYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusStarsRow: {
    flexDirection: 'row',
    gap: bigRiverFocusScale(4),
  },
  bigRiverFocusStar: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(20),
  },
  bigRiverFocusStarEmpty: {
    opacity: 0.35,
  },
  bigRiverFocusFishIcon: {
    width: bigRiverFocusScale(28),
    height: bigRiverFocusScale(28),
  },
  bigRiverFocusValue: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(20),
    letterSpacing: 1,
  },
});
