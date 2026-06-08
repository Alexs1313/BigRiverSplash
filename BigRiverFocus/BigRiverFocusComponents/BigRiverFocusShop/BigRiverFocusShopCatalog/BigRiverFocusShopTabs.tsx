import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

export type BigRiverFocusShopCategory = 'fish' | 'background' | 'wallpaper';

type BigRiverFocusShopTabsProps = {
  activeTab: BigRiverFocusShopCategory;
  onTabPress: (tab: BigRiverFocusShopCategory) => void;
};

const BIG_RIVER_FOCUS_TABS: {id: BigRiverFocusShopCategory; label: string}[] = [
  {id: 'fish', label: 'Fish'},
  {id: 'background', label: 'Background'},
  {id: 'wallpaper', label: 'Wallpaper'},
];

export function BigRiverFocusShopTabs({activeTab, onTabPress}: BigRiverFocusShopTabsProps) {
  return (
    <View style={styles.bigRiverFocusRow}>
      {BIG_RIVER_FOCUS_TABS.map(tab => {
        const isActive = tab.id === activeTab;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={styles.bigRiverFocusTabSlot}>
            {isActive ? (
              <LinearGradient
                colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
                style={styles.bigRiverFocusActiveTab}>
                <Text style={styles.bigRiverFocusActiveLabel}>{tab.label}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.bigRiverFocusInactiveTab}>
                <Text style={styles.bigRiverFocusInactiveLabel}>{tab.label}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: bigRiverFocusScale(8),
    paddingHorizontal: bigRiverFocusScale(16),
  },
  bigRiverFocusTabSlot: {
    flex: 1,
    maxWidth: bigRiverFocusScale(123),
    height: bigRiverFocusVerticalScale(45),
    borderRadius: bigRiverFocusScale(7),
    overflow: 'hidden',
  },
  bigRiverFocusActiveTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: bigRiverFocusScale(0.4),
    borderColor: bigRiverFocusColors.buttonText,
    borderRadius: bigRiverFocusScale(7),
  },
  bigRiverFocusInactiveTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: bigRiverFocusScale(7),
    backgroundColor: bigRiverFocusColors.topButtonMuted,
    borderWidth: bigRiverFocusScale(0.4),
    borderColor: 'rgba(97, 72, 2, 0.6)',
  },
  bigRiverFocusActiveLabel: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(15),
  },
  bigRiverFocusInactiveLabel: {
    color: 'rgba(97, 73, 2, 0.8)',
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(15),
  },
});
