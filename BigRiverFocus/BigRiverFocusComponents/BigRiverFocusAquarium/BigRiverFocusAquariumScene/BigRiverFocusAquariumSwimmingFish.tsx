import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, Image, StyleSheet, View} from 'react-native';
import {BIG_RIVER_FOCUS_AQUARIUM_FISH} from '../../../BigRiverFocusConstants/BigRiverFocusAquarium/BigRiverFocusAquariumData/BigRiverFocusAquariumFish';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

const BIG_RIVER_FOCUS_FISH_SIZE = bigRiverFocusScale(40);
const BIG_RIVER_FOCUS_MAX_VISIBLE_PER_TYPE = 2;

type BigRiverFocusFishInstance = {
  id: string;
  source: number;
  x: Animated.Value;
  flip: boolean;
  y: number;
  duration: number;
};

type BigRiverFocusAquariumSwimmingFishProps = {
  counts: number[];
};

function buildFishInstances(counts: number[]): BigRiverFocusFishInstance[] {
  const instances: BigRiverFocusFishInstance[] = [];

  counts.forEach((count, typeIndex) => {
    const visibleCount = Math.min(count, BIG_RIVER_FOCUS_MAX_VISIBLE_PER_TYPE);
    const fish = BIG_RIVER_FOCUS_AQUARIUM_FISH[typeIndex];
    if (!fish || visibleCount <= 0) {
      return;
    }

    for (let i = 0; i < visibleCount; i += 1) {
      const fromLeft = (typeIndex + i) % 2 === 0;
      instances.push({
        id: `${fish.id}-${i}`,
        source: fish.source,
        x: new Animated.Value(fromLeft ? -BIG_RIVER_FOCUS_FISH_SIZE : bigRiverFocusScale(320)),
        flip: !fromLeft,
        y: bigRiverFocusVerticalScale(120) + (typeIndex * bigRiverFocusVerticalScale(55) + i * bigRiverFocusVerticalScale(35)),
        duration: 4200 + typeIndex * 600 + i * 400,
      });
    }
  });

  return instances;
}

export function BigRiverFocusAquariumSwimmingFish({counts}: BigRiverFocusAquariumSwimmingFishProps) {
  const fishInstances = useMemo(() => buildFishInstances(counts), [counts]);
  const animationsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    animationsRef.current.forEach(animation => animation.stop());
    animationsRef.current = [];

    fishInstances.forEach(fish => {
      const toValue = fish.flip ? -BIG_RIVER_FOCUS_FISH_SIZE : bigRiverFocusScale(320);
      const fromValue = fish.flip ? bigRiverFocusScale(320) : -BIG_RIVER_FOCUS_FISH_SIZE;
      fish.x.setValue(fromValue);

      const animation = Animated.loop(
        Animated.timing(fish.x, {
          toValue,
          duration: fish.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );

      animationsRef.current.push(animation);
      animation.start();
    });

    return () => {
      animationsRef.current.forEach(animation => animation.stop());
      animationsRef.current = [];
    };
  }, [fishInstances]);

  if (fishInstances.length === 0) {
    return null;
  }

  return (
    <View style={styles.bigRiverFocusTank} pointerEvents="none">
      {fishInstances.map(fish => (
        <Animated.View
          key={fish.id}
          style={[
            styles.bigRiverFocusFish,
            {
              top: fish.y,
              transform: [
                {translateX: fish.x},
                {scaleX: fish.flip ? -1 : 1},
              ],
            },
          ]}>
          <Image
            source={fish.source}
            style={styles.bigRiverFocusFishImage}
            resizeMode="contain"
          />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusTank: {
    ...StyleSheet.absoluteFillObject,
    top: bigRiverFocusVerticalScale(180),
    bottom: bigRiverFocusVerticalScale(120),
  },
  bigRiverFocusFish: {
    position: 'absolute',
    width: BIG_RIVER_FOCUS_FISH_SIZE,
    height: BIG_RIVER_FOCUS_FISH_SIZE,
    left: 0,
  },
  bigRiverFocusFishImage: {
    width: '100%',
    height: '100%',
  },
});
