import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import type {BigRiverFocusHomeTab as BigRiverFocusFocusTab} from '../../../BigRiverFocusConstants/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusTabs';

type BigRiverFocusFocusTabBarProps = {
  activeTab: BigRiverFocusFocusTab | null;
  onTabPress?: (tab: BigRiverFocusFocusTab) => void;
};

const BIG_RIVER_FOCUS_TAB_SIZE = bigRiverFocusScale(72);

const BIG_RIVER_FOCUS_TABS: {id: BigRiverFocusFocusTab; icon: number; label?: string}[] = [
  {
    id: 'focus',
    icon: require('../../../BigRiverFocusAssets/BigRiverFocusPh_user-focus-fill.png'),
    label: 'Focus space',
  },
  {id: 'aquarium', icon: require('../../../BigRiverFocusAssets/BigRiverFocusMdi_aquarium.png'), label: 'Aquarium'},
  {
    id: 'stories',
    icon: require('../../../BigRiverFocusAssets/BigRiverFocusIc_round-auto-stories.png'),
    label: 'Stories',
  },
];

export function BigRiverFocusFocusTabBar({activeTab, onTabPress}: BigRiverFocusFocusTabBarProps) {
  return (
    <View style={styles.bigRiverFocusWrapper}>
      <View style={styles.bigRiverFocusContainer}>
        {BIG_RIVER_FOCUS_TABS.map(tab => {
          const isActive = tab.id === activeTab;

          return (
            <View key={tab.id} style={styles.bigRiverFocusTabSlot}>
              <Pressable onPress={() => onTabPress?.(tab.id)}>
                {isActive ? (
                  <LinearGradient
                    colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
                    style={styles.bigRiverFocusActiveTab}>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        source={tab.icon}
                        style={styles.bigRiverFocusIcon}
                        resizeMode="contain"
                      />
                      {tab.label ? (
                        <Text style={styles.bigRiverFocusLabel}>{tab.label}</Text>
                      ) : null}
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={styles.bigRiverFocusInactiveTab}>
                    <Image
                      source={tab.icon}
                      style={[styles.bigRiverFocusIcon, styles.bigRiverFocusInactiveIcon]}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusWrapper: {
    width: '100%',
    paddingHorizontal: bigRiverFocusScale(16),
    paddingTop: bigRiverFocusVerticalScale(12),
  },
  bigRiverFocusContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: bigRiverFocusScale(10),
  },
  bigRiverFocusTabSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bigRiverFocusActiveTab: {
    borderRadius: bigRiverFocusScale(14),
    justifyContent: 'center',
    alignItems: 'center',

    gap: bigRiverFocusVerticalScale(4),
    minWidth: BIG_RIVER_FOCUS_TAB_SIZE,
    minHeight: BIG_RIVER_FOCUS_TAB_SIZE,
  },
  bigRiverFocusInactiveTab: {
    width: BIG_RIVER_FOCUS_TAB_SIZE,
    height: BIG_RIVER_FOCUS_TAB_SIZE,
    borderRadius: bigRiverFocusScale(14),
    backgroundColor: bigRiverFocusColors.tabInactive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusIcon: {
    width: bigRiverFocusScale(28),
    height: bigRiverFocusScale(28),
  },
  bigRiverFocusInactiveIcon: {
    opacity: 0.7,
  },
  bigRiverFocusLabel: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(11),
    textAlign: 'center',
  },
});
