import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusGradientButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function BigRiverFocusGradientButton({label, onPress, style}: BigRiverFocusGradientButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.bigRiverFocusWrapper, style]}>
      <LinearGradient
        colors={['#FABE09', '#FBFD25']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.bigRiverFocusGradient}>
        <View style={styles.bigRiverFocusContent}>
          <Text style={styles.bigRiverFocusLabel}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusWrapper: {
    width: bigRiverFocusScale(324),
    height: bigRiverFocusVerticalScale(74),
    alignSelf: 'center',
  },
  bigRiverFocusGradient: {
    flex: 1,
    borderRadius: bigRiverFocusScale(20),
  },
  bigRiverFocusContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusLabel: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(24),
    letterSpacing: 0.5,
  },
});
