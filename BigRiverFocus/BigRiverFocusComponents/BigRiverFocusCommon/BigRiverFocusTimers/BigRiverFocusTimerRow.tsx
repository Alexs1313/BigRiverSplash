import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusTimerRowProps = {
  elapsedSeconds: number;
  paused?: boolean;
};

function bigRiverFocusFormatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');
}

export function BigRiverFocusTimerRow({elapsedSeconds, paused = false}: BigRiverFocusTimerRowProps) {
  return (
    <View style={styles.bigRiverFocusRow}>
      <View style={styles.bigRiverFocusIconWrapper}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          style={styles.bigRiverFocusIconBox}>
          <View style={styles.bigRiverFocusIconContent}>
            <Image
              source={require('../../../BigRiverFocusAssets/BigRiverFocusTimer.png')}
              style={styles.bigRiverFocusTimerIcon}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.bigRiverFocusTimeWrapper}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          style={styles.bigRiverFocusTimeBox}>
          <View style={styles.bigRiverFocusTimeContent}>
            <Text style={styles.bigRiverFocusTimeText}>
              {paused ? 'Pause' : bigRiverFocusFormatTime(elapsedSeconds)}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: bigRiverFocusScale(8),
  },
  bigRiverFocusIconWrapper: {
    width: bigRiverFocusScale(52),
    height: bigRiverFocusVerticalScale(52),
  },
  bigRiverFocusIconBox: {
    flex: 1,
    borderRadius: bigRiverFocusScale(14),
  },
  bigRiverFocusIconContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusTimerIcon: {
    width: bigRiverFocusScale(28),
    height: bigRiverFocusScale(28),
  },
  bigRiverFocusTimeWrapper: {
    width: bigRiverFocusScale(200),
    height: bigRiverFocusVerticalScale(52),
  },
  bigRiverFocusTimeBox: {
    flex: 1,
    borderRadius: bigRiverFocusScale(14),
  },
  bigRiverFocusTimeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusTimeText: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(22),
    letterSpacing: 1,
  },
});
