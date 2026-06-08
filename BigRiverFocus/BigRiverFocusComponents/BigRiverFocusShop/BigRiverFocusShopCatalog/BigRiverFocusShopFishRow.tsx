import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import type {BigRiverFocusShopFishItem} from '../../../BigRiverFocusConstants/BigRiverFocusShop/BigRiverFocusShopItems/BigRiverFocusShopItems';

type BigRiverFocusShopFishRowProps = {
  item: BigRiverFocusShopFishItem;
  canAfford: boolean;
  onPurchase: () => void;
};

export function BigRiverFocusShopFishRow({item, canAfford, onPurchase}: BigRiverFocusShopFishRowProps) {
  const priceText = item.price.toString().padStart(3, '0');

  return (
    <View style={styles.bigRiverFocusRow}>
      <View style={styles.bigRiverFocusFishCardSlot}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          style={styles.bigRiverFocusFishCard}>
          <Image
            source={item.source}
            style={styles.bigRiverFocusFishImage}
            resizeMode="contain"
          />
        </LinearGradient>
      </View>

      <Pressable
        onPress={canAfford ? onPurchase : undefined}
        disabled={!canAfford}
        style={[styles.bigRiverFocusBuyButtonSlot, !canAfford && styles.bigRiverFocusDisabled]}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          style={styles.bigRiverFocusBuyButton}>
          <Text style={styles.bigRiverFocusChevron}>›››</Text>
        </LinearGradient>
      </Pressable>

      <LinearGradient
        colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
        style={styles.bigRiverFocusPriceRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: bigRiverFocusScale(5),
            padding: 10,
          }}>
          <View style={styles.bigRiverFocusPriceFishSlot}>
            <Image
              source={require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')}
              style={styles.bigRiverFocusPriceFishIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.bigRiverFocusPriceValueSlot}>
            <Text style={styles.bigRiverFocusPriceText}>{priceText}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: bigRiverFocusScale(8),
    paddingHorizontal: bigRiverFocusScale(8),
  },
  bigRiverFocusFishCardSlot: {
    width: bigRiverFocusScale(111),
    height: bigRiverFocusVerticalScale(106),
    borderRadius: bigRiverFocusScale(17),
    overflow: 'hidden',
  },
  bigRiverFocusFishCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: bigRiverFocusScale(0.8),
    borderColor: bigRiverFocusColors.buttonText,
    borderRadius: bigRiverFocusScale(17),
  },
  bigRiverFocusFishImage: {
    width: bigRiverFocusScale(90),
    height: bigRiverFocusScale(90),
  },
  bigRiverFocusBuyButtonSlot: {
    width: bigRiverFocusScale(56),
    height: bigRiverFocusScale(56),
    borderRadius: bigRiverFocusScale(11),
    overflow: 'hidden',
  },
  bigRiverFocusBuyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
    borderRadius: bigRiverFocusScale(11),
  },
  bigRiverFocusChevron: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(22),
    letterSpacing: -2,
  },
  bigRiverFocusDisabled: {
    opacity: 0.45,
  },
  bigRiverFocusPriceRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: bigRiverFocusScale(56),
    borderRadius: bigRiverFocusScale(11),
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
  },
  bigRiverFocusPriceFishSlot: {
    width: bigRiverFocusScale(40),
    height: bigRiverFocusScale(40),
    borderRadius: bigRiverFocusScale(10),
    backgroundColor: bigRiverFocusColors.buttonText,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bigRiverFocusPriceFishIcon: {
    width: bigRiverFocusScale(28),
    height: bigRiverFocusScale(28),
  },
  bigRiverFocusPriceValueSlot: {
    flex: 1,
    height: bigRiverFocusScale(40),
    borderRadius: bigRiverFocusScale(10),
    backgroundColor: bigRiverFocusColors.buttonText,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bigRiverFocusPriceText: {
    color: bigRiverFocusColors.white,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(20),
    letterSpacing: 0.5,
  },
});
