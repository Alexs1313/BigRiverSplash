import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusStoryAnswerOptionProps = {
  text: string;
  selected?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export function BigRiverFocusStoryAnswerOption({
  text,
  selected = false,
  highlighted = false,
  disabled = false,
  onPress,
}: BigRiverFocusStoryAnswerOptionProps) {
  const isActive = selected || highlighted;

  if (isActive) {
    return (
      <Pressable disabled={disabled || !onPress} onPress={onPress}>
        <View style={styles.bigRiverFocusShadow}>
          <LinearGradient
            colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
            style={styles.bigRiverFocusActiveCard}>
            <View style={styles.bigRiverFocusContent}>
              <Text style={styles.bigRiverFocusActiveText}>{text}</Text>
            </View>
          </LinearGradient>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable disabled={disabled || !onPress} onPress={onPress}>
      <View style={styles.bigRiverFocusInactiveCard}>
        <View style={styles.bigRiverFocusContent}>
          <Text style={styles.bigRiverFocusInactiveText}>{text}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusShadow: {
    borderRadius: bigRiverFocusScale(16),
    backgroundColor: bigRiverFocusColors.cardShadow,
    paddingBottom: bigRiverFocusVerticalScale(2),
  },
  bigRiverFocusActiveCard: {
    borderRadius: bigRiverFocusScale(16),
    borderWidth: bigRiverFocusScale(1),
    borderColor: bigRiverFocusColors.buttonText,
    overflow: 'hidden',
  },
  bigRiverFocusInactiveCard: {
    borderRadius: bigRiverFocusScale(16),
    backgroundColor: bigRiverFocusColors.aquariumCardInactive,
    borderWidth: bigRiverFocusScale(1),
    borderColor: bigRiverFocusColors.buttonText,
  },
  bigRiverFocusContent: {
    paddingHorizontal: bigRiverFocusScale(16),
    paddingVertical: bigRiverFocusVerticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusActiveText: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(16),
    textAlign: 'center',
  },
  bigRiverFocusInactiveText: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(16),
    textAlign: 'center',
  },
});
