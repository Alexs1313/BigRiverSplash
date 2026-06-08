import React from 'react';
import {
  Image,
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

type BigRiverFocusYellowButtonProps = {
  label?: string;
  onPress?: () => void;
  style?: ViewStyle;
  width?: number;
  height?: number;
  iconSource?: number;
  children?: React.ReactNode;
};

export function BigRiverFocusYellowButton({
  label,
  onPress,
  style,
  width = bigRiverFocusScale(324),
  height = bigRiverFocusVerticalScale(74),
  iconSource,
  children,
}: BigRiverFocusYellowButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.bigRiverFocusWrapper, {width, height}, style]}>
      <LinearGradient
        colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={[styles.bigRiverFocusGradient, {borderRadius: bigRiverFocusScale(20)}]}>
        <View style={styles.bigRiverFocusContent}>
          {children ??
            (iconSource ? (
              <View style={styles.bigRiverFocusLabelRow}>
                <Image source={iconSource} style={styles.bigRiverFocusIcon} resizeMode="contain" />
                <Text style={styles.bigRiverFocusLabel}>{label}</Text>
              </View>
            ) : (
              <Text style={styles.bigRiverFocusLabel}>{label}</Text>
            ))}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusWrapper: {
    alignSelf: 'center',
  },
  bigRiverFocusGradient: {
    flex: 1,
  },
  bigRiverFocusContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: bigRiverFocusScale(10),
  },
  bigRiverFocusIcon: {
    width: bigRiverFocusScale(22),
    height: bigRiverFocusScale(22),
  },
  bigRiverFocusLabel: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(24),
    letterSpacing: 0.5,
  },
});
