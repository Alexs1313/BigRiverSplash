import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusShopCurrencyBadgeProps = {
  balance: number;
  compact?: boolean;
};

export function BigRiverFocusShopCurrencyBadge({
  balance,
  compact = false,
}: BigRiverFocusShopCurrencyBadgeProps) {
  const balanceText = balance.toString().padStart(3, '0');

  return (
    <View style={[styles.bigRiverFocusRow, compact && styles.bigRiverFocusRowCompact]}>
      <View style={styles.bigRiverFocusFishIconSlot}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          style={styles.bigRiverFocusFishIconGradient}>
          <Image
            source={require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')}
            style={styles.bigRiverFocusFishIcon}
            resizeMode="contain"
          />
        </LinearGradient>
      </View>
      <View style={styles.bigRiverFocusBalanceSlot}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          style={styles.bigRiverFocusBalanceGradient}>
          <Text
            style={[styles.bigRiverFocusBalanceText, compact && styles.bigRiverFocusBalanceTextCompact]}>
            {balanceText}
          </Text>
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
    gap: bigRiverFocusScale(4),
  },
  bigRiverFocusRowCompact: {
    alignSelf: 'flex-start',
  },
  bigRiverFocusFishIconSlot: {
    width: bigRiverFocusScale(56),
    height: bigRiverFocusScale(56),
    borderRadius: bigRiverFocusScale(10),
    overflow: 'hidden',
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
  },
  bigRiverFocusFishIconGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusFishIcon: {
    width: bigRiverFocusScale(36),
    height: bigRiverFocusScale(36),
  },
  bigRiverFocusBalanceSlot: {
    minWidth: bigRiverFocusScale(110),
    height: bigRiverFocusScale(56),
    borderRadius: bigRiverFocusScale(10),
    overflow: 'hidden',
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
  },
  bigRiverFocusBalanceGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusBalanceText: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(24),
    letterSpacing: 0.5,
  },
  bigRiverFocusBalanceTextCompact: {
    fontSize: bigRiverFocusScale(20),
  },
});
