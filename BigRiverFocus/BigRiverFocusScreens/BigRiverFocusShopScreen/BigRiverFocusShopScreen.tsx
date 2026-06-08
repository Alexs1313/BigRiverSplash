import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BigRiverFocusFocusTabBar} from '../../BigRiverFocusComponents/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusFocusTabBar';
import {BigRiverFocusTopIconButton} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusIcons/BigRiverFocusIconButton';
import {BigRiverFocusMessageBanner} from '../../BigRiverFocusComponents/BigRiverFocusCommon/BigRiverFocusBanners/BigRiverFocusMessageBanner';
import {BigRiverFocusShopCurrencyBadge} from '../../BigRiverFocusComponents/BigRiverFocusShop/BigRiverFocusShopHeader/BigRiverFocusShopCurrencyBadge';
import {BigRiverFocusShopFishRow} from '../../BigRiverFocusComponents/BigRiverFocusShop/BigRiverFocusShopCatalog/BigRiverFocusShopFishRow';
import {BigRiverFocusShopPreviewCarousel} from '../../BigRiverFocusComponents/BigRiverFocusShop/BigRiverFocusShopCatalog/BigRiverFocusShopPreviewCarousel';
import {BigRiverFocusShopTabs, type BigRiverFocusShopCategory} from '../../BigRiverFocusComponents/BigRiverFocusShop/BigRiverFocusShopCatalog/BigRiverFocusShopTabs';
import {
  BIG_RIVER_FOCUS_SHOP_BACKGROUNDS,
  BIG_RIVER_FOCUS_SHOP_FISH_ITEMS,
  BIG_RIVER_FOCUS_SHOP_WALLPAPERS,
} from '../../BigRiverFocusConstants/BigRiverFocusShop/BigRiverFocusShopItems/BigRiverFocusShopItems';
import {BIG_RIVER_FOCUS_SHOP_MESSAGES} from '../../BigRiverFocusConstants/BigRiverFocusShop/BigRiverFocusShopMessages/BigRiverFocusShopMessages';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import type {BigRiverFocusHomeTab} from '../../BigRiverFocusConstants/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusTabs';
import {bigRiverFocusShareWallpaper} from '../../../BigRiverFocusUtils/BigRiverFocusShare/BigRiverFocusWallpaperShare/BigRiverFocusShareWallpaper';
import {
  bigRiverFocusLoadShopData,
  bigRiverFocusUpdateShopData,
  type BigRiverFocusShopData,
} from '../../../BigRiverFocusUtils/BigRiverFocusPersist/BigRiverFocusShop/BigRiverFocusShopPersist';

type BigRiverFocusShopScreenProps = {
  onTabPress?: (tab: BigRiverFocusHomeTab) => void;
  onOpenHistory?: () => void;
};

export function BigRiverFocusShopScreen({onTabPress, onOpenHistory}: BigRiverFocusShopScreenProps) {
  const insets = useSafeAreaInsets();
  const [shopData, setShopData] = useState<BigRiverFocusShopData | null>(null);
  const [activeTab, setActiveTab] = useState<BigRiverFocusShopCategory>('fish');
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);

  const refreshShop = useCallback(() => {
    bigRiverFocusLoadShopData().then(setShopData);
  }, []);

  useEffect(() => {
    refreshShop();
  }, [refreshShop]);

  const handlePurchaseFish = useCallback(
    async (fishIndex: number, price: number) => {
      const next = await bigRiverFocusUpdateShopData(data => {
        if (data.fishBalance < price) {
          return data;
        }

        const counts = [...data.aquariumFishCounts];
        counts[fishIndex] = (counts[fishIndex] ?? 0) + 1;

        return {
          ...data,
          fishBalance: data.fishBalance - price,
          aquariumFishCounts: counts,
        };
      });
      setShopData(next);
    },
    [],
  );

  const handlePurchaseBackground = useCallback(async () => {
    const item = BIG_RIVER_FOCUS_SHOP_BACKGROUNDS[backgroundIndex];
    if (!item) {
      return;
    }

    const next = await bigRiverFocusUpdateShopData(data => {
      if (
        data.fishBalance < item.price ||
        data.ownedBackgroundIds.includes(item.id)
      ) {
        return data;
      }

      return {
        ...data,
        fishBalance: data.fishBalance - item.price,
        ownedBackgroundIds: [...data.ownedBackgroundIds, item.id],
      };
    });
    setShopData(next);
  }, [backgroundIndex]);

  const handleEquipBackground = useCallback(async () => {
    const item = BIG_RIVER_FOCUS_SHOP_BACKGROUNDS[backgroundIndex];
    if (!item) {
      return;
    }

    const next = await bigRiverFocusUpdateShopData(data => {
      if (!data.ownedBackgroundIds.includes(item.id)) {
        return data;
      }

      return {
        ...data,
        equippedBackgroundId: item.id,
      };
    });
    setShopData(next);
  }, [backgroundIndex]);

  const handlePurchaseWallpaper = useCallback(async () => {
    const item = BIG_RIVER_FOCUS_SHOP_WALLPAPERS[wallpaperIndex];
    if (!item) {
      return;
    }

    const next = await bigRiverFocusUpdateShopData(data => {
      if (
        data.fishBalance < item.price ||
        data.ownedWallpaperIds.includes(item.id)
      ) {
        return data;
      }

      return {
        ...data,
        fishBalance: data.fishBalance - item.price,
        ownedWallpaperIds: [...data.ownedWallpaperIds, item.id],
      };
    });
    setShopData(next);
  }, [wallpaperIndex]);

  const handleShareWallpaper = useCallback(() => {
    const item = BIG_RIVER_FOCUS_SHOP_WALLPAPERS[wallpaperIndex];
    if (item) {
      bigRiverFocusShareWallpaper(item);
    }
  }, [wallpaperIndex]);

  if (!shopData) {
    return null;
  }

  const selectedBackground = BIG_RIVER_FOCUS_SHOP_BACKGROUNDS[backgroundIndex];
  const selectedWallpaper = BIG_RIVER_FOCUS_SHOP_WALLPAPERS[wallpaperIndex];
  const isBackgroundOwned = selectedBackground
    ? shopData.ownedBackgroundIds.includes(selectedBackground.id)
    : false;
  const isBackgroundEquipped =
    selectedBackground?.id === shopData.equippedBackgroundId;
  const isWallpaperOwned = selectedWallpaper
    ? shopData.ownedWallpaperIds.includes(selectedWallpaper.id)
    : false;

  return (
    <ImageBackground
      source={require('../../BigRiverFocusAssets/BigRiverFocusBg.png')}
      style={styles.bigRiverFocusBackground}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={[
          styles.bigRiverFocusScrollContent,
          {paddingTop: insets.top + bigRiverFocusVerticalScale(8)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bigRiverFocusTopRow}>
          <BigRiverFocusTopIconButton
            variant="muted"
            source={require('../../BigRiverFocusAssets/BigRiverFocusMaterial-symbols_history-rounded.png')}
            style={styles.bigRiverFocusTopLeftButton}
            onPress={onOpenHistory}
          />
          <View style={styles.bigRiverFocusTopMessage}>
            <BigRiverFocusMessageBanner
              message={BIG_RIVER_FOCUS_SHOP_MESSAGES.header}
              showThumbnail={false}
              avatarSource={require('../../BigRiverFocusAssets/BigRiverFocusShopheader.png')}
            />
          </View>
          <BigRiverFocusTopIconButton
            source={require('../../BigRiverFocusAssets/BigRiverFocusMingcute_shop-fill.png')}
            style={styles.bigRiverFocusTopRightButton}
          />
        </View>

        <BigRiverFocusShopCurrencyBadge balance={shopData.fishBalance} />

        <BigRiverFocusShopTabs activeTab={activeTab} onTabPress={setActiveTab} />

        <View style={styles.bigRiverFocusContent}>
          {activeTab === 'fish' && (
            <View style={styles.bigRiverFocusFishList}>
              {BIG_RIVER_FOCUS_SHOP_FISH_ITEMS.map(item => (
                <BigRiverFocusShopFishRow
                  key={item.id}
                  item={item}
                  canAfford={shopData.fishBalance >= item.price}
                  onPurchase={() =>
                    handlePurchaseFish(item.fishIndex, item.price)
                  }
                />
              ))}
            </View>
          )}

          {activeTab === 'background' && selectedBackground && (
            <BigRiverFocusShopPreviewCarousel
              items={BIG_RIVER_FOCUS_SHOP_BACKGROUNDS}
              selectedIndex={backgroundIndex}
              onSelectIndex={setBackgroundIndex}
              mode="background"
              isOwned={isBackgroundOwned}
              isEquipped={isBackgroundEquipped}
              canAfford={shopData.fishBalance >= selectedBackground.price}
              price={selectedBackground.price}
              onPurchase={handlePurchaseBackground}
              onEquip={handleEquipBackground}
              onShare={() => {}}
            />
          )}

          {activeTab === 'wallpaper' && selectedWallpaper && (
            <BigRiverFocusShopPreviewCarousel
              items={BIG_RIVER_FOCUS_SHOP_WALLPAPERS}
              selectedIndex={wallpaperIndex}
              onSelectIndex={setWallpaperIndex}
              mode="wallpaper"
              isOwned={isWallpaperOwned}
              isEquipped={false}
              canAfford={shopData.fishBalance >= selectedWallpaper.price}
              price={selectedWallpaper.price}
              onPurchase={handlePurchaseWallpaper}
              onEquip={() => {}}
              onShare={handleShareWallpaper}
            />
          )}
        </View>
      </ScrollView>

      <View
        style={[
          styles.bigRiverFocusFooter,
          {paddingBottom: insets.bottom + bigRiverFocusVerticalScale(12)},
        ]}>
        <BigRiverFocusFocusTabBar activeTab={null} onTabPress={onTabPress} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  bigRiverFocusContent: {
    flex: 1,
    paddingTop: bigRiverFocusVerticalScale(8),
  },
  bigRiverFocusFishList: {
    gap: bigRiverFocusVerticalScale(14),
  },
  bigRiverFocusFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
