import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BIG_RIVER_FOCUS_AQUARIUM_FISH} from '../../../BigRiverFocusConstants/BigRiverFocusAquarium/BigRiverFocusAquariumData/BigRiverFocusAquariumFish';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusFishInventoryRowProps = {
  counts: number[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function BigRiverFocusFishInventoryRow({
  counts,
  selectedIndex,
  onSelect,
}: BigRiverFocusFishInventoryRowProps) {
  return (
    <View style={styles.bigRiverFocusRow}>
      {BIG_RIVER_FOCUS_AQUARIUM_FISH.map((fish, index) => {
        const isSelected = index === selectedIndex;
        const countText = (counts[index] ?? 0).toString().padStart(3, '0');

        return (
          <Pressable
            key={fish.id}
            onPress={() => onSelect(index)}
            style={styles.bigRiverFocusCardSlot}>
            {isSelected ? (
              <LinearGradient
                colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
                style={styles.bigRiverFocusCard}>
                <View style={styles.bigRiverFocusCardContent}>
                  <Image
                    source={fish.source}
                    style={styles.bigRiverFocusFishImage}
                    resizeMode="contain"
                  />
                  <View style={styles.bigRiverFocusBadge}>
                    <Text style={styles.bigRiverFocusBadgeText}>{countText}</Text>
                  </View>
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.bigRiverFocusCard, styles.bigRiverFocusCardInactive]}>
                <View style={styles.bigRiverFocusCardContent}>
                  <Image
                    source={fish.source}
                    style={styles.bigRiverFocusFishImage}
                    resizeMode="contain"
                  />
                  <View style={styles.bigRiverFocusBadge}>
                    <Text style={styles.bigRiverFocusBadgeText}>{countText}</Text>
                  </View>
                </View>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const BIG_RIVER_FOCUS_CARD_SIZE = bigRiverFocusScale(78);

const styles = StyleSheet.create({
  bigRiverFocusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: bigRiverFocusScale(10),
    paddingHorizontal: bigRiverFocusScale(16),
  },
  bigRiverFocusCardSlot: {
    width: BIG_RIVER_FOCUS_CARD_SIZE,
    height: BIG_RIVER_FOCUS_CARD_SIZE,
  },
  bigRiverFocusCard: {
    flex: 1,
    borderRadius: bigRiverFocusScale(14),
    overflow: 'hidden',
  },
  bigRiverFocusCardInactive: {
    backgroundColor: bigRiverFocusColors.aquariumCardInactive,
  },
  bigRiverFocusCardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: bigRiverFocusVerticalScale(8),
    paddingBottom: bigRiverFocusVerticalScale(6),
    paddingHorizontal: bigRiverFocusScale(6),
    gap: bigRiverFocusVerticalScale(4),
  },
  bigRiverFocusFishImage: {
    width: bigRiverFocusScale(44),
    height: bigRiverFocusScale(44),
    flex: 1,
  },
  bigRiverFocusBadge: {
    minWidth: bigRiverFocusScale(40),
    paddingHorizontal: bigRiverFocusScale(8),
    paddingVertical: bigRiverFocusVerticalScale(2),
    borderRadius: bigRiverFocusScale(8),
    backgroundColor: bigRiverFocusColors.inactiveDot,
    alignItems: 'center',
  },
  bigRiverFocusBadgeText: {
    color: bigRiverFocusColors.white,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(12),
    letterSpacing: 0.5,
  },
});
