import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BigRiverFocusAquariumSwimmingFish} from '../../BigRiverFocusComponents/BigRiverFocusAquarium/BigRiverFocusAquariumScene/BigRiverFocusAquariumSwimmingFish';
import {BigRiverFocusFishInventoryRow} from '../../BigRiverFocusComponents/BigRiverFocusAquarium/BigRiverFocusAquariumInventory/BigRiverFocusFishInventoryRow';
import {BigRiverFocusFocusTabBar} from '../../BigRiverFocusComponents/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusFocusTabBar';
import {BigRiverFocusTopIconButton} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusIcons/BigRiverFocusIconButton';
import {BigRiverFocusMessageBanner} from '../../BigRiverFocusComponents/BigRiverFocusCommon/BigRiverFocusBanners/BigRiverFocusMessageBanner';
import {BIG_RIVER_FOCUS_AQUARIUM_MESSAGES} from '../../BigRiverFocusConstants/BigRiverFocusAquarium/BigRiverFocusAquariumMessages/BigRiverFocusAquariumMessages';
import {
  BIG_RIVER_FOCUS_DEFAULT_AQUARIUM_BACKGROUND,
  BIG_RIVER_FOCUS_SHOP_BACKGROUNDS,
} from '../../BigRiverFocusConstants/BigRiverFocusShop/BigRiverFocusShopItems/BigRiverFocusShopItems';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import type {BigRiverFocusHomeTab} from '../../BigRiverFocusConstants/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusTabs';
import {bigRiverFocusLoadShopData} from '../../../BigRiverFocusUtils/BigRiverFocusPersist/BigRiverFocusShop/BigRiverFocusShopPersist';

type BigRiverFocusAquariumScreenProps = {
  onTabPress?: (tab: BigRiverFocusHomeTab) => void;
  onOpenHistory?: () => void;
  onOpenShop?: () => void;
};

export function BigRiverFocusAquariumScreen({
  onTabPress,
  onOpenHistory,
  onOpenShop,
}: BigRiverFocusAquariumScreenProps) {
  const insets = useSafeAreaInsets();
  const [fishCounts, setFishCounts] = useState<number[]>([5, 0, 0, 0]);
  const [backgroundSource, setBackgroundSource] = useState<number>(
    BIG_RIVER_FOCUS_DEFAULT_AQUARIUM_BACKGROUND,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const refreshAquarium = useCallback(() => {
    bigRiverFocusLoadShopData().then(data => {
      setFishCounts(data.aquariumFishCounts);
      const equipped = BIG_RIVER_FOCUS_SHOP_BACKGROUNDS.find(
        item => item.id === data.equippedBackgroundId,
      );
      setBackgroundSource(equipped?.source ?? BIG_RIVER_FOCUS_DEFAULT_AQUARIUM_BACKGROUND);
    });
  }, []);

  useEffect(() => {
    refreshAquarium();
  }, [refreshAquarium]);

  return (
    <View style={styles.bigRiverFocusContainer}>
      <ImageBackground
        source={backgroundSource}
        style={styles.bigRiverFocusBackground}
        resizeMode="cover">
        <BigRiverFocusAquariumSwimmingFish counts={fishCounts} />

        <ScrollView
          contentContainerStyle={[
            styles.bigRiverFocusScrollContent,
            {paddingTop: insets.top + bigRiverFocusVerticalScale(8)},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.bigRiverFocusTopRow}>
            <BigRiverFocusTopIconButton
              variant="aquarium"
              source={require('../../BigRiverFocusAssets/BigRiverFocusMaterial-symbols_history-rounded.png')}
              style={styles.bigRiverFocusTopLeftButton}
              onPress={onOpenHistory}
            />
            <View style={styles.bigRiverFocusTopMessage}>
              <BigRiverFocusMessageBanner
                message={BIG_RIVER_FOCUS_AQUARIUM_MESSAGES.idle}
                showThumbnail={false}
                avatarSource={require('../../BigRiverFocusAssets/BigRiverFocusHeader_aquarium.png')}
              />
            </View>
            <BigRiverFocusTopIconButton
              source={require('../../BigRiverFocusAssets/BigRiverFocusMingcute_shop-fill.png')}
              style={styles.bigRiverFocusTopRightButton}
              onPress={onOpenShop}
            />
          </View>

          <BigRiverFocusFishInventoryRow
            counts={fishCounts}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </ScrollView>

        <View
          style={[
            styles.bigRiverFocusFooter,
            {paddingBottom: insets.bottom + bigRiverFocusVerticalScale(12)},
          ]}>
          <BigRiverFocusFocusTabBar activeTab="aquarium" onTabPress={onTabPress} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusContainer: {
    flex: 1,
  },
  bigRiverFocusBackground: {
    flex: 1,
  },
  bigRiverFocusScrollContent: {
    flexGrow: 1,
    gap: bigRiverFocusVerticalScale(16),
    paddingBottom: bigRiverFocusVerticalScale(120),
  },
  bigRiverFocusTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: bigRiverFocusScale(12),
    gap: bigRiverFocusScale(10),
  },
  bigRiverFocusTopLeftButton: {
    marginLeft: bigRiverFocusScale(12),
  },
  bigRiverFocusTopRightButton: {
    marginRight: bigRiverFocusScale(0),
  },
  bigRiverFocusTopMessage: {
    flex: 1,
  },
  bigRiverFocusFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
