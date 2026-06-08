import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusBrownButtonProps = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  width?: number;
  height?: number;
  children?: React.ReactNode;
};

export function BigRiverFocusBrownButton({
  label,
  onPress,
  style,
  width,
  height = bigRiverFocusVerticalScale(49),
  children,
}: BigRiverFocusBrownButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.bigRiverFocusWrapper, width ? {width} : styles.bigRiverFocusFlex, {height}, style]}>
      <View style={styles.bigRiverFocusButton}>
        <View style={styles.bigRiverFocusContent}>
          {children ?? <Text style={styles.bigRiverFocusLabel}>{label}</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusWrapper: {
    alignSelf: 'center',
  },
  bigRiverFocusFlex: {
    flex: 1,
  },
  bigRiverFocusButton: {
    flex: 1,
    borderRadius: bigRiverFocusScale(9),
    backgroundColor: bigRiverFocusColors.buttonText,
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
    overflow: 'hidden',
  },
  bigRiverFocusContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: bigRiverFocusScale(12),
  },
  bigRiverFocusLabel: {
    color: bigRiverFocusColors.panelYellow,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(17),
    textAlign: 'center',
  },
});
