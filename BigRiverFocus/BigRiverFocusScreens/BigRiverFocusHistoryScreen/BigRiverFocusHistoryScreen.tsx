import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BigRiverFocusFocusTabBar} from '../../BigRiverFocusComponents/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusFocusTabBar';
import {BigRiverFocusHistoryEmptyPanel} from '../../BigRiverFocusComponents/BigRiverFocusHistory/BigRiverFocusHistoryEmpty/BigRiverFocusHistoryEmptyPanel';
import {BigRiverFocusHistorySessionCard} from '../../BigRiverFocusComponents/BigRiverFocusHistory/BigRiverFocusHistoryList/BigRiverFocusHistorySessionCard';
import {BigRiverFocusTopIconButton} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusIcons/BigRiverFocusIconButton';
import {BigRiverFocusMessageBanner} from '../../BigRiverFocusComponents/BigRiverFocusCommon/BigRiverFocusBanners/BigRiverFocusMessageBanner';
import {BigRiverFocusYellowButton} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusActions/BigRiverFocusYellowButton';
import {BIG_RIVER_FOCUS_HISTORY_MESSAGES} from '../../BigRiverFocusConstants/BigRiverFocusHistory/BigRiverFocusHistoryMessages/BigRiverFocusHistoryMessages';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import type {BigRiverFocusHomeTab} from '../../BigRiverFocusConstants/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusTabs';
import type {BigRiverFocusFocusSession} from '../../BigRiverFocusTypes/BigRiverFocusFocusSession';
import {bigRiverFocusDeleteSession, bigRiverFocusLoadSessions} from '../../../BigRiverFocusUtils/BigRiverFocusPersist/BigRiverFocusSession/BigRiverFocusSessionPersist';

type BigRiverFocusHistoryScreenProps = {
  onTabPress?: (tab: BigRiverFocusHomeTab) => void;
  onGoToFocus: () => void;
  onOpenShop?: () => void;
};

export function BigRiverFocusHistoryScreen({
  onTabPress,
  onGoToFocus,
  onOpenShop,
}: BigRiverFocusHistoryScreenProps) {
  const insets = useSafeAreaInsets();
  const [sessions, setSessions] = useState<BigRiverFocusFocusSession[]>([]);

  const refreshSessions = useCallback(() => {
    bigRiverFocusLoadSessions().then(setSessions);
  }, []);

  useEffect(() => {
    refreshSessions();
  }, [refreshSessions]);

  const handleDelete = useCallback(
    async (id: string) => {
      const nextSessions = await bigRiverFocusDeleteSession(id);
      setSessions(nextSessions);
    },
    [],
  );

  const handleTabPress = useCallback(
    (tab: BigRiverFocusHomeTab) => {
      onTabPress?.(tab);
    },
    [onTabPress],
  );

  const isEmpty = sessions.length === 0;

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
            source={require('../../BigRiverFocusAssets/BigRiverFocusMaterial-symbols_history-rounded.png')}
            style={styles.bigRiverFocusTopLeftButton}
          />
          <View style={styles.bigRiverFocusTopMessage}>
            <BigRiverFocusMessageBanner
              message={BIG_RIVER_FOCUS_HISTORY_MESSAGES.header}
              showThumbnail={false}
            />
          </View>
          <BigRiverFocusTopIconButton
            variant="muted"
            source={require('../../BigRiverFocusAssets/BigRiverFocusMingcute_shop-fill.png')}
            style={styles.bigRiverFocusTopRightButton}
            onPress={onOpenShop}
          />
        </View>

        <View style={styles.bigRiverFocusBody}>
          {isEmpty ? (
            <>
              <BigRiverFocusHistoryEmptyPanel />
              <BigRiverFocusYellowButton label="Go to focus space" onPress={onGoToFocus} />
            </>
          ) : (
            <View style={styles.bigRiverFocusList}>
              {sessions.map(session => (
                <BigRiverFocusHistorySessionCard
                  key={session.id}
                  session={session}
                  onDelete={handleDelete}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={[
          styles.bigRiverFocusFooter,
          {paddingBottom: insets.bottom + bigRiverFocusVerticalScale(12)},
        ]}>
        <BigRiverFocusFocusTabBar activeTab={null} onTabPress={handleTabPress} />
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
  bigRiverFocusBody: {
    flex: 1,
    justifyContent: 'center',
    gap: bigRiverFocusVerticalScale(24),
    paddingTop: bigRiverFocusVerticalScale(24),
  },
  bigRiverFocusList: {
    gap: bigRiverFocusVerticalScale(14),
    paddingHorizontal: bigRiverFocusScale(16),
  },
  bigRiverFocusFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
