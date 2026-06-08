import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import {BigRiverFocusClockIcon} from '../../BigRiverFocusButtons/BigRiverFocusIcons/BigRiverFocusIconButton';

type BigRiverFocusResultsBoardProps = {
  elapsedSeconds: number;
  fishCount: number;
};

function bigRiverFocusFormatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');
}

export function BigRiverFocusResultsBoard({elapsedSeconds, fishCount}: BigRiverFocusResultsBoardProps) {
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
            <BigRiverFocusClockIcon />
          </View>
          <View style={styles.bigRiverFocusValueCell}>
            <Text style={styles.bigRiverFocusValue}>{bigRiverFocusFormatTime(elapsedSeconds)}</Text>
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
  bigRiverFocusFishIcon: {
    width: bigRiverFocusScale(28),
    height: bigRiverFocusScale(28),
  },
  bigRiverFocusValueCell: {
    flex: 1,
    height: bigRiverFocusVerticalScale(44),
    borderRadius: bigRiverFocusScale(10),
    backgroundColor: bigRiverFocusColors.panelYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusValue: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(20),
    letterSpacing: 1,
  },
});
