import React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusBoatSceneProps = {
  characterSource: number;
  compact?: boolean;
  style?: ViewStyle;
};

export function BigRiverFocusBoatScene({
  characterSource,
  compact = false,
  style,
}: BigRiverFocusBoatSceneProps) {
  return (
    <View style={[styles.bigRiverFocusScene, compact ? styles.bigRiverFocusSceneCompact : styles.bigRiverFocusSceneIdle, style]}>
      <Image
        source={require('../../../BigRiverFocusAssets/BigRiverFocusBoat.png')}
        style={[styles.bigRiverFocusBoat, compact && styles.bigRiverFocusBoatCompact]}
        resizeMode="contain"
      />
      <Image
        source={characterSource}
        style={[styles.bigRiverFocusCharacter, compact && styles.bigRiverFocusCharacterCompact]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusScene: {
    alignSelf: 'center',
    width: bigRiverFocusScale(340),
  },
  bigRiverFocusSceneIdle: {
    height: bigRiverFocusVerticalScale(360),
  },
  bigRiverFocusSceneCompact: {
    height: bigRiverFocusVerticalScale(240),
  },
  bigRiverFocusBoat: {
    position: 'absolute',
    bottom: bigRiverFocusVerticalScale(8),
    alignSelf: 'center',
    width: bigRiverFocusScale(280),
    height: bigRiverFocusVerticalScale(115),
  },
  bigRiverFocusBoatCompact: {
    width: bigRiverFocusScale(240),
    height: bigRiverFocusVerticalScale(95),
    bottom: bigRiverFocusVerticalScale(4),
  },
  bigRiverFocusCharacter: {
    position: 'absolute',
    bottom: bigRiverFocusVerticalScale(48),
    alignSelf: 'center',
    width: bigRiverFocusScale(220),
    height: bigRiverFocusVerticalScale(250),
  },
  bigRiverFocusCharacterCompact: {
    width: bigRiverFocusScale(175),
    height: bigRiverFocusVerticalScale(195),
    bottom: bigRiverFocusVerticalScale(38),
  },
});
