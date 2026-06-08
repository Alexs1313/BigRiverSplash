import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusPaginationDotsProps = {
  total: number;
  activeIndex: number;
};

export function BigRiverFocusPaginationDots({total, activeIndex}: BigRiverFocusPaginationDotsProps) {
  return (
    <View style={styles.bigRiverFocusContainer}>
      {Array.from({length: total}).map((_, index) => {
        const isActive = index === activeIndex;

        if (isActive) {
          return (
            <LinearGradient
              key={index}
              colors={['#FABE09', '#FBFD25']}
              style={styles.bigRiverFocusDot}
            />
          );
        }

        return <View key={index} style={[styles.bigRiverFocusDot, styles.bigRiverFocusInactiveDot]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(5),
  },
  bigRiverFocusDot: {
    width: bigRiverFocusScale(15.5),
    height: bigRiverFocusScale(15.5),
    borderRadius: bigRiverFocusScale(8),
  },
  bigRiverFocusInactiveDot: {
    backgroundColor: bigRiverFocusColors.inactiveDot,
  },
});
