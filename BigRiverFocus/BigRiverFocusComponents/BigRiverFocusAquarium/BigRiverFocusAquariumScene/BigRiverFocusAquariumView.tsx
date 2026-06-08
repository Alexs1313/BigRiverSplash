import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

const BIG_RIVER_FOCUS_AQUARIUM_W = bigRiverFocusScale(345);
const BIG_RIVER_FOCUS_AQUARIUM_H = bigRiverFocusVerticalScale(210);
const BIG_RIVER_FOCUS_HOOK_X = BIG_RIVER_FOCUS_AQUARIUM_W / 2 - bigRiverFocusScale(18);
const BIG_RIVER_FOCUS_HOOK_Y = bigRiverFocusVerticalScale(52);
const BIG_RIVER_FOCUS_FISH_SIZE = bigRiverFocusScale(36);
const BIG_RIVER_FOCUS_SWIM_DURATION_MS = 2800;
const BIG_RIVER_FOCUS_SPAWN_INTERVAL_MS = 3200;

type BigRiverFocusSwimmingFish = {
  id: string;
  x: Animated.Value;
  y: Animated.Value;
  flip: boolean;
};

type BigRiverFocusAquariumViewProps = {
  fishCount: number;
  isRunning: boolean;
  onFishCaught: () => void;
};

function variedSpawnY() {
  return bigRiverFocusVerticalScale(95) + Math.random() * bigRiverFocusVerticalScale(85);
}

export function BigRiverFocusAquariumView({
  fishCount,
  isRunning,
  onFishCaught,
}: BigRiverFocusAquariumViewProps) {
  const [swimmingFish, setSwimmingFish] = useState<BigRiverFocusSwimmingFish[]>([]);
  const fishIdRef = useRef(0);
  const activeAnimationsRef = useRef<Animated.CompositeAnimation[]>([]);
  const onFishCaughtRef = useRef(onFishCaught);
  onFishCaughtRef.current = onFishCaught;

  const stopAllAnimations = useCallback(() => {
    activeAnimationsRef.current.forEach(animation => animation.stop());
    activeAnimationsRef.current = [];
  }, []);

  const spawnFish = useCallback(() => {
    const fromLeft = Math.random() > 0.5;
    const startX = fromLeft ? -BIG_RIVER_FOCUS_FISH_SIZE : BIG_RIVER_FOCUS_AQUARIUM_W + BIG_RIVER_FOCUS_FISH_SIZE;
    const startY = variedSpawnY();

    const x = new Animated.Value(startX);
    const y = new Animated.Value(startY);
    const id = `fish-${fishIdRef.current++}`;

    const fish: BigRiverFocusSwimmingFish = {id, x, y, flip: !fromLeft};

    setSwimmingFish(prev => [...prev, fish]);

    const animation = Animated.parallel([
      Animated.timing(x, {
        toValue: BIG_RIVER_FOCUS_HOOK_X,
        duration: BIG_RIVER_FOCUS_SWIM_DURATION_MS,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(y, {
        toValue: BIG_RIVER_FOCUS_HOOK_Y,
        duration: BIG_RIVER_FOCUS_SWIM_DURATION_MS,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    activeAnimationsRef.current.push(animation);

    animation.start(({finished}) => {
      activeAnimationsRef.current = activeAnimationsRef.current.filter(
        item => item !== animation,
      );

      InteractionManager.runAfterInteractions(() => {
        setSwimmingFish(prev => prev.filter(f => f.id !== id));
        if (finished) {
          onFishCaughtRef.current();
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!isRunning) {
      stopAllAnimations();
      setSwimmingFish([]);
      return;
    }

    spawnFish();
    const interval = setInterval(spawnFish, BIG_RIVER_FOCUS_SPAWN_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      stopAllAnimations();
    };
  }, [isRunning, spawnFish, stopAllAnimations]);

  const counterText = fishCount.toString().padStart(3, '0');

  return (
    <View style={styles.bigRiverFocusWrapper}>
      <Image
        source={require('../../../BigRiverFocusAssets/BigRiverFocusAquarium.png')}
        style={styles.bigRiverFocusAquarium}
        resizeMode="cover"
      />

      {swimmingFish.map(fish => (
        <Animated.View
          key={fish.id}
          style={[
            styles.bigRiverFocusFish,
            {
              transform: [
                {translateX: fish.x},
                {translateY: fish.y},
                {scaleX: fish.flip ? -1 : 1},
              ],
            },
          ]}>
          <Image
            source={require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')}
            style={styles.bigRiverFocusFishImage}
            resizeMode="contain"
          />
        </Animated.View>
      ))}

      <View style={styles.bigRiverFocusCounter}>
        <View style={styles.bigRiverFocusCounterIconBox}>
          <Image
            source={require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')}
            style={styles.bigRiverFocusFishIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.bigRiverFocusCounterValueBox}>
          <Text style={styles.bigRiverFocusCounterText}>{counterText}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusWrapper: {
    width: BIG_RIVER_FOCUS_AQUARIUM_W,
    height: BIG_RIVER_FOCUS_AQUARIUM_H,
    alignSelf: 'center',
    borderRadius: bigRiverFocusScale(12),
    overflow: 'hidden',
  },
  bigRiverFocusAquarium: {
    width: '100%',
    height: '100%',
  },
  bigRiverFocusFish: {
    position: 'absolute',
    width: BIG_RIVER_FOCUS_FISH_SIZE,
    height: BIG_RIVER_FOCUS_FISH_SIZE,
    top: 0,
    left: 0,
  },
  bigRiverFocusFishImage: {
    width: '100%',
    height: '100%',
  },
  bigRiverFocusCounter: {
    position: 'absolute',
    top: bigRiverFocusVerticalScale(8),
    right: bigRiverFocusScale(8),
    flexDirection: 'row',
    gap: bigRiverFocusScale(4),
  },
  bigRiverFocusCounterIconBox: {
    width: bigRiverFocusScale(36),
    height: bigRiverFocusScale(36),
    borderRadius: bigRiverFocusScale(8),
    backgroundColor: bigRiverFocusColors.counterBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusFishIcon: {
    width: bigRiverFocusScale(24),
    height: bigRiverFocusScale(24),
  },
  bigRiverFocusCounterValueBox: {
    minWidth: bigRiverFocusScale(44),
    height: bigRiverFocusScale(36),
    borderRadius: bigRiverFocusScale(8),
    backgroundColor: bigRiverFocusColors.counterBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: bigRiverFocusScale(6),
  },
  bigRiverFocusCounterText: {
    color: bigRiverFocusColors.white,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(16),
    letterSpacing: 1,
  },
});
