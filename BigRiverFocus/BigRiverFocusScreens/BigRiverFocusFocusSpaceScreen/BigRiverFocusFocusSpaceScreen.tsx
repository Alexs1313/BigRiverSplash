import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BigRiverFocusAquariumView} from '../../BigRiverFocusComponents/BigRiverFocusAquarium/BigRiverFocusAquariumScene/BigRiverFocusAquariumView';
import {BigRiverFocusBoatScene} from '../../BigRiverFocusComponents/BigRiverFocusFocus/BigRiverFocusFocusScene/BigRiverFocusBoatScene';
import {BigRiverFocusFocusTabBar} from '../../BigRiverFocusComponents/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusFocusTabBar';
import {
  BigRiverFocusBackIcon,
  BigRiverFocusIconButton,
  BigRiverFocusPauseIcon,
  BigRiverFocusPlayIcon,
  BigRiverFocusTopIconButton,
} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusIcons/BigRiverFocusIconButton';
import {BigRiverFocusMessageBanner} from '../../BigRiverFocusComponents/BigRiverFocusCommon/BigRiverFocusBanners/BigRiverFocusMessageBanner';
import {BigRiverFocusResultsBoard} from '../../BigRiverFocusComponents/BigRiverFocusFocus/BigRiverFocusFocusResults/BigRiverFocusResultsBoard';
import {BigRiverFocusTimerRow} from '../../BigRiverFocusComponents/BigRiverFocusCommon/BigRiverFocusTimers/BigRiverFocusTimerRow';
import {BigRiverFocusYellowButton} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusActions/BigRiverFocusYellowButton';
import {BIG_RIVER_FOCUS_FOCUS_LAYOUT} from '../../BigRiverFocusConstants/BigRiverFocusFocus/BigRiverFocusFocusLayout/BigRiverFocusFocusLayout';
import {BIG_RIVER_FOCUS_FOCUS_MESSAGES} from '../../BigRiverFocusConstants/BigRiverFocusFocus/BigRiverFocusFocusMessages/BigRiverFocusFocusMessages';
import {
  bigRiverFocusScale,
  bigRiverFocusVerticalScale,
} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import {bigRiverFocusShareFocusResults} from '../../../BigRiverFocusUtils/BigRiverFocusShare/BigRiverFocusFocusShare/BigRiverFocusShareFocusResults';
import {bigRiverFocusAddFishBalance} from '../../../BigRiverFocusUtils/BigRiverFocusPersist/BigRiverFocusShop/BigRiverFocusShopPersist';
import {bigRiverFocusSaveSession} from '../../../BigRiverFocusUtils/BigRiverFocusPersist/BigRiverFocusSession/BigRiverFocusSessionPersist';
import type {BigRiverFocusHomeTab} from '../../BigRiverFocusConstants/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusTabs';

type BigRiverFocusFocusPhase = 'idle' | 'active' | 'paused' | 'result';

type BigRiverFocusFocusSpaceScreenProps = {
  activeTab?: BigRiverFocusHomeTab;
  onTabPress?: (tab: BigRiverFocusHomeTab) => void;
  onOpenHistory?: () => void;
  onOpenShop?: () => void;
};

export function BigRiverFocusFocusSpaceScreen({
  activeTab = 'focus',
  onTabPress,
  onOpenHistory,
  onOpenShop,
}: BigRiverFocusFocusSpaceScreenProps) {
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<BigRiverFocusFocusPhase>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [fishCount, setFishCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startSession = useCallback(() => {
    setElapsedSeconds(0);
    setFishCount(0);
    setPhase('active');
  }, []);

  const finishSession = useCallback(async () => {
    clearTimer();
    await bigRiverFocusSaveSession({
      id: `${Date.now()}`,
      elapsedSeconds,
      fishCount,
      createdAt: Date.now(),
    });
    await bigRiverFocusAddFishBalance(fishCount);
    setPhase('result');
  }, [clearTimer, elapsedSeconds, fishCount]);

  const resetSession = useCallback(() => {
    clearTimer();
    setElapsedSeconds(0);
    setFishCount(0);
    setPhase('idle');
  }, [clearTimer]);

  const handleFishCaught = useCallback(() => {
    setFishCount(prev => prev + 1);
  }, []);

  const handleShare = useCallback(() => {
    bigRiverFocusShareFocusResults(elapsedSeconds, fishCount);
  }, [elapsedSeconds, fishCount]);

  useEffect(() => {
    if (phase !== 'active') {
      clearTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return clearTimer;
  }, [phase, clearTimer]);

  const isSession = phase === 'active' || phase === 'paused';
  const isPaused = phase === 'paused';
  const message =
    phase === 'result' ? BIG_RIVER_FOCUS_FOCUS_MESSAGES.result : BIG_RIVER_FOCUS_FOCUS_MESSAGES.active;

  return (
    <View style={styles.bigRiverFocusRoot}>
      <ImageBackground
        source={require('../../BigRiverFocusAssets/BigRiverFocusBg.png')}
        style={styles.bigRiverFocusBackground}
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={[
          styles.bigRiverFocusScrollContent,
          {paddingTop: insets.top + BIG_RIVER_FOCUS_FOCUS_LAYOUT.headerPaddingTop},
        ]}
        showsVerticalScrollIndicator={false}>
        {phase === 'idle' ? (
          <View style={styles.bigRiverFocusTopRow}>
            <BigRiverFocusTopIconButton
              source={require('../../BigRiverFocusAssets/BigRiverFocusMaterial-symbols_history-rounded.png')}
              onPress={onOpenHistory}
            />
            <View style={styles.bigRiverFocusTopMessage}>
              <BigRiverFocusMessageBanner
                message={BIG_RIVER_FOCUS_FOCUS_MESSAGES.idle}
                showThumbnail={false}
              />
            </View>
            <BigRiverFocusTopIconButton
              source={require('../../BigRiverFocusAssets/BigRiverFocusMingcute_shop-fill.png')}
              onPress={onOpenShop}
            />
          </View>
        ) : (
          <View style={styles.bigRiverFocusMessageZone}>
            <BigRiverFocusMessageBanner message={message} />
          </View>
        )}

        {isSession && (
          <View style={styles.bigRiverFocusTimerZone}>
            <BigRiverFocusTimerRow elapsedSeconds={elapsedSeconds} paused={isPaused} />
          </View>
        )}

        {(phase === 'idle' || isSession) && (
          <BigRiverFocusBoatScene
            characterSource={
              phase === 'idle'
                ? require('../../BigRiverFocusAssets/BigRiverFocusOboard2.png')
                : require('../../BigRiverFocusAssets/BigRiverFocusOboard4.png')
            }
            compact={isSession}
          />
        )}

        {phase === 'result' && (
          <View style={styles.bigRiverFocusResultSection}>
            <Image
              source={require('../../BigRiverFocusAssets/BigRiverFocusOboard4.png')}
              style={styles.bigRiverFocusResultCharacter}
              resizeMode="contain"
            />
            <BigRiverFocusResultsBoard
              elapsedSeconds={elapsedSeconds}
              fishCount={fishCount}
            />
          </View>
        )}

        {isSession && (
          <View style={styles.bigRiverFocusAquariumZone}>
            <BigRiverFocusAquariumView
              fishCount={fishCount}
              isRunning={phase === 'active'}
              onFishCaught={handleFishCaught}
            />
          </View>
        )}
      </ScrollView>

      <View
        style={[
          styles.bigRiverFocusFooter,
          {paddingBottom: insets.bottom + BIG_RIVER_FOCUS_FOCUS_LAYOUT.footerBottom},
        ]}>
        {phase === 'idle' && (
          <>
            <BigRiverFocusYellowButton label="Start" onPress={startSession} />
            <BigRiverFocusFocusTabBar activeTab={activeTab} onTabPress={onTabPress} />
          </>
        )}

        {isSession && (
          <View style={styles.bigRiverFocusSessionControls}>
            <BigRiverFocusYellowButton
              label="Finish"
              onPress={finishSession}
              width={BIG_RIVER_FOCUS_FOCUS_LAYOUT.sessionFinishWidth}
            />
            <BigRiverFocusIconButton
              onPress={() =>
                setPhase(prev => (prev === 'active' ? 'paused' : 'active'))
              }
              size={BIG_RIVER_FOCUS_FOCUS_LAYOUT.iconButtonSize}>
              {isPaused ? <BigRiverFocusPlayIcon /> : <BigRiverFocusPauseIcon />}
            </BigRiverFocusIconButton>
          </View>
        )}

        {phase === 'result' && (
          <View style={styles.bigRiverFocusResultControls}>
            <BigRiverFocusIconButton
              onPress={resetSession}
              size={BIG_RIVER_FOCUS_FOCUS_LAYOUT.iconButtonSize}>
              <BigRiverFocusBackIcon />
            </BigRiverFocusIconButton>
            <BigRiverFocusYellowButton
              label="Share"
              onPress={handleShare}
              width={BIG_RIVER_FOCUS_FOCUS_LAYOUT.sessionFinishWidth}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusRoot: {
    flex: 1,
  },
  bigRiverFocusBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  bigRiverFocusScrollContent: {
    flexGrow: 1,
    gap: BIG_RIVER_FOCUS_FOCUS_LAYOUT.sectionGap,
    paddingBottom: bigRiverFocusVerticalScale(200),
  },
  bigRiverFocusTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: BIG_RIVER_FOCUS_FOCUS_LAYOUT.headerGap,
    height: BIG_RIVER_FOCUS_FOCUS_LAYOUT.headerHeight,
    paddingHorizontal: BIG_RIVER_FOCUS_FOCUS_LAYOUT.headerSide,
  },
  bigRiverFocusTopMessage: {
    flex: 1,
    height: BIG_RIVER_FOCUS_FOCUS_LAYOUT.headerHeight,
  },
  bigRiverFocusMessageZone: {
    paddingHorizontal: bigRiverFocusScale(12),
  },
  bigRiverFocusTimerZone: {
    alignItems: 'center',
  },
  bigRiverFocusAquariumZone: {
    alignItems: 'center',
  },
  bigRiverFocusResultSection: {
    alignItems: 'center',
    gap: bigRiverFocusVerticalScale(8),
  },
  bigRiverFocusResultCharacter: {
    width: bigRiverFocusScale(260),
    height: BIG_RIVER_FOCUS_FOCUS_LAYOUT.resultCharacterHeight,
  },
  bigRiverFocusFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    gap: bigRiverFocusVerticalScale(16),
  },
  bigRiverFocusSessionControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(12),
  },
  bigRiverFocusResultControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(12),
  },
});
