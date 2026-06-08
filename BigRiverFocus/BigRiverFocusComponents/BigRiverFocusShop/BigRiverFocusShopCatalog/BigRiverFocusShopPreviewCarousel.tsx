import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BigRiverFocusIconButton} from '../../BigRiverFocusButtons/BigRiverFocusIcons/BigRiverFocusIconButton';
import {BigRiverFocusYellowButton} from '../../BigRiverFocusButtons/BigRiverFocusActions/BigRiverFocusYellowButton';
import {BIG_RIVER_FOCUS_SHOP_MESSAGES} from '../../../BigRiverFocusConstants/BigRiverFocusShop/BigRiverFocusShopMessages/BigRiverFocusShopMessages';
import type {BigRiverFocusShopVisualItem} from '../../../BigRiverFocusConstants/BigRiverFocusShop/BigRiverFocusShopItems/BigRiverFocusShopItems';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusShopPreviewCarouselProps = {
  items: BigRiverFocusShopVisualItem[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  mode: 'background' | 'wallpaper';
  isOwned: boolean;
  isEquipped: boolean;
  canAfford: boolean;
  price: number;
  onPurchase: () => void;
  onEquip: () => void;
  onShare: () => void;
};

export function BigRiverFocusShopPreviewCarousel({
  items,
  selectedIndex,
  onSelectIndex,
  mode,
  isOwned,
  isEquipped,
  canAfford,
  price,
  onPurchase,
  onEquip,
  onShare,
}: BigRiverFocusShopPreviewCarouselProps) {
  const item = items[selectedIndex];
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < items.length - 1;

  if (!item) {
    return null;
  }

  return (
    <View style={styles.bigRiverFocusContainer}>
      <View style={styles.bigRiverFocusPreviewRow}>
        {hasPrev ? (
          <Pressable onPress={() => onSelectIndex(selectedIndex - 1)} style={styles.bigRiverFocusArrowSlot}>
            <LinearGradient
              colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
              style={styles.bigRiverFocusArrowButton}>
              <Text style={styles.bigRiverFocusArrowText}>‹</Text>
            </LinearGradient>
          </Pressable>
        ) : (
          <View style={styles.bigRiverFocusArrowPlaceholder} />
        )}

        <View style={styles.bigRiverFocusPreviewFrame}>
          <Image source={item.source} style={styles.bigRiverFocusPreviewImage} resizeMode="cover" />
        </View>

        {hasNext ? (
          <Pressable onPress={() => onSelectIndex(selectedIndex + 1)} style={styles.bigRiverFocusArrowSlot}>
            <LinearGradient
              colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
              style={styles.bigRiverFocusArrowButton}>
              <Text style={styles.bigRiverFocusArrowText}>›</Text>
            </LinearGradient>
          </Pressable>
        ) : (
          <View style={styles.bigRiverFocusArrowPlaceholder} />
        )}
      </View>

      <View style={styles.bigRiverFocusActions}>
        {mode === 'background' && isOwned ? (
          <>
            <View style={styles.bigRiverFocusCheckSlot}>
              <LinearGradient
                colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
                style={styles.bigRiverFocusCheckButton}>
                <Image
                  source={require('../../../BigRiverFocusAssets/BigRiverFocusChecked.png')}
                  style={styles.bigRiverFocusCheckIcon}
                  resizeMode="contain"
                />
              </LinearGradient>
            </View>
            <BigRiverFocusYellowButton
              label={isEquipped ? BIG_RIVER_FOCUS_SHOP_MESSAGES.dressed : BIG_RIVER_FOCUS_SHOP_MESSAGES.toDress}
              onPress={isEquipped ? undefined : onEquip}
              width={bigRiverFocusScale(224)}
              height={bigRiverFocusVerticalScale(69)}
              style={isEquipped ? styles.bigRiverFocusDressedButton : undefined}
            />
          </>
        ) : mode === 'background' ? (
          <Pressable
            onPress={canAfford ? onPurchase : undefined}
            disabled={!canAfford}
            style={[styles.bigRiverFocusPriceButtonRow, !canAfford && styles.bigRiverFocusDisabled]}>
            <View style={styles.bigRiverFocusPriceFishSlot}>
              <LinearGradient
                colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
                style={styles.bigRiverFocusPriceFishGradient}>
                <Image
                  source={require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')}
                  style={styles.bigRiverFocusPriceFishIcon}
                  resizeMode="contain"
                />
              </LinearGradient>
            </View>
            <View style={styles.bigRiverFocusPriceValueSlot}>
              <LinearGradient
                colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
                style={styles.bigRiverFocusPriceValueGradient}>
                <Text style={styles.bigRiverFocusPriceText}>{price.toString().padStart(3, '0')}</Text>
              </LinearGradient>
            </View>
          </Pressable>
        ) : mode === 'wallpaper' && isOwned ? (
          <BigRiverFocusIconButton onPress={onShare} size={bigRiverFocusScale(74)} style={styles.bigRiverFocusShareOnlyButton}>
            <Image
              source={require('../../../BigRiverFocusAssets/BigRiverFocusShare.png')}
              style={styles.bigRiverFocusShareIconImage}
              resizeMode="contain"
            />
          </BigRiverFocusIconButton>
        ) : (
          <Pressable
            onPress={canAfford ? onPurchase : undefined}
            disabled={!canAfford}
            style={[styles.bigRiverFocusPriceButtonRow, !canAfford && styles.bigRiverFocusDisabled]}>
            <View style={styles.bigRiverFocusPriceFishSlot}>
              <LinearGradient
                colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
                style={styles.bigRiverFocusPriceFishGradient}>
                <Image
                  source={require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')}
                  style={styles.bigRiverFocusPriceFishIcon}
                  resizeMode="contain"
                />
              </LinearGradient>
            </View>
            <View style={styles.bigRiverFocusPriceValueSlot}>
              <LinearGradient
                colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
                style={styles.bigRiverFocusPriceValueGradient}>
                <Text style={styles.bigRiverFocusPriceText}>{price.toString().padStart(3, '0')}</Text>
              </LinearGradient>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const BIG_RIVER_FOCUS_PREVIEW_WIDTH = bigRiverFocusScale(195);
const BIG_RIVER_FOCUS_PREVIEW_HEIGHT = bigRiverFocusVerticalScale(293);

const styles = StyleSheet.create({
  bigRiverFocusContainer: {
    alignItems: 'center',
    gap: bigRiverFocusVerticalScale(18),
    paddingHorizontal: bigRiverFocusScale(16),
  },
  bigRiverFocusPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(8),
  },
  bigRiverFocusArrowSlot: {
    width: bigRiverFocusScale(55),
    height: bigRiverFocusScale(55),
    borderRadius: bigRiverFocusScale(11),
    overflow: 'hidden',
  },
  bigRiverFocusArrowButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
    borderRadius: bigRiverFocusScale(11),
  },
  bigRiverFocusArrowText: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(32),
    lineHeight: bigRiverFocusScale(36),
    marginTop: -bigRiverFocusScale(2),
  },
  bigRiverFocusArrowPlaceholder: {
    width: bigRiverFocusScale(55),
  },
  bigRiverFocusPreviewFrame: {
    width: BIG_RIVER_FOCUS_PREVIEW_WIDTH,
    height: BIG_RIVER_FOCUS_PREVIEW_HEIGHT,
    borderRadius: bigRiverFocusScale(22),
    overflow: 'hidden',
    borderWidth: bigRiverFocusScale(2),
    borderColor: '#004858',
  },
  bigRiverFocusPreviewImage: {
    width: '100%',
    height: '100%',
  },
  bigRiverFocusActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(12),
    minHeight: bigRiverFocusVerticalScale(74),
  },
  bigRiverFocusCheckSlot: {
    width: bigRiverFocusScale(74),
    height: bigRiverFocusScale(74),
    borderRadius: bigRiverFocusScale(20),
    overflow: 'hidden',
  },
  bigRiverFocusCheckButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
    borderRadius: bigRiverFocusScale(20),
  },
  bigRiverFocusCheckIcon: {
    width: bigRiverFocusScale(37),
    height: bigRiverFocusScale(37),
  },
  bigRiverFocusDressedButton: {
    opacity: 0.85,
  },
  bigRiverFocusShareOnlyButton: {
    alignSelf: 'center',
  },
  bigRiverFocusShareIconImage: {
    width: bigRiverFocusScale(40),
    height: bigRiverFocusScale(40),
  },
  bigRiverFocusPriceButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: bigRiverFocusScale(69),
    borderRadius: bigRiverFocusScale(20),
    overflow: 'hidden',
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
  },
  bigRiverFocusPriceFishSlot: {
    width: bigRiverFocusScale(74),
    height: '100%',
  },
  bigRiverFocusPriceFishGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusPriceFishIcon: {
    width: bigRiverFocusScale(36),
    height: bigRiverFocusScale(36),
  },
  bigRiverFocusPriceValueSlot: {
    width: bigRiverFocusScale(224),
    height: '100%',
  },
  bigRiverFocusPriceValueGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusPriceText: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(32),
    letterSpacing: 0.5,
  },
  bigRiverFocusDisabled: {
    opacity: 0.45,
  },
});
