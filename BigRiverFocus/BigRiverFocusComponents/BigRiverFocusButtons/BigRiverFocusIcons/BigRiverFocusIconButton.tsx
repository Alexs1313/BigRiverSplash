import React from 'react';
import {Image, Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusIconButtonProps = {
  onPress?: () => void;
  style?: ViewStyle;
  size?: number;
  children: React.ReactNode;
};

export function BigRiverFocusIconButton({onPress, style, size = bigRiverFocusScale(52), children}: BigRiverFocusIconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.bigRiverFocusWrapper, {width: size, height: size}, style]}>
      <LinearGradient
        colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={[styles.bigRiverFocusGradient, {borderRadius: bigRiverFocusScale(14)}]}>
        <View style={styles.bigRiverFocusContent}>{children}</View>
      </LinearGradient>
    </Pressable>
  );
}

export function BigRiverFocusTopIconButton({
  source,
  onPress,
  style,
  variant = 'yellow',
  children,
}: {
  source?: number;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'yellow' | 'aquarium' | 'muted';
  children?: React.ReactNode;
}) {
  if (variant === 'muted') {
    return (
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        style={[styles.bigRiverFocusMutedTopWrapper, {width: bigRiverFocusScale(52), height: bigRiverFocusScale(52)}, style]}>
        <View style={styles.bigRiverFocusMutedTopButton}>
          <View style={styles.bigRiverFocusContent}>
            {children ??
              (source ? (
                <Image source={source} style={styles.bigRiverFocusTopIcon} resizeMode="contain" />
              ) : null)}
          </View>
        </View>
      </Pressable>
    );
  }

  if (variant === 'aquarium') {
    return (
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        style={[styles.bigRiverFocusAquariumTopWrapper, {width: bigRiverFocusScale(52), height: bigRiverFocusScale(52)}, style]}>
        <View style={styles.bigRiverFocusAquariumTopButton}>
          <View style={styles.bigRiverFocusContent}>
            {children ??
              (source ? (
                <Image source={source} style={styles.bigRiverFocusTopIcon} resizeMode="contain" />
              ) : null)}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <BigRiverFocusIconButton onPress={onPress} style={style} size={bigRiverFocusScale(52)}>
      {children ??
        (source ? (
          <Image source={source} style={styles.bigRiverFocusTopIcon} resizeMode="contain" />
        ) : null)}
    </BigRiverFocusIconButton>
  );
}

export function BigRiverFocusPauseIcon() {
  return (
    <View style={styles.bigRiverFocusPauseRow}>
      <View style={styles.bigRiverFocusPauseBar} />
      <View style={styles.bigRiverFocusPauseBar} />
    </View>
  );
}

export function BigRiverFocusPlayIcon() {
  return (
    <View style={styles.bigRiverFocusPlayTriangle} />
  );
}

export function BigRiverFocusClockIcon() {
  return (
    <View style={styles.bigRiverFocusClock}>
      <View style={styles.bigRiverFocusClockHandHour} />
      <View style={styles.bigRiverFocusClockHandMinute} />
    </View>
  );
}

export function BigRiverFocusBackIcon() {
  return <Text style={styles.bigRiverFocusBackArrow}>←</Text>;
}

export function BigRiverFocusHomeIcon() {
  return (
    <View style={styles.bigRiverFocusHomeIcon}>
      <View style={styles.bigRiverFocusHomeRoof} />
      <View style={styles.bigRiverFocusHomeBody} />
    </View>
  );
}

export function BigRiverFocusShareIcon() {
  return (
    <View style={styles.bigRiverFocusShareIcon}>
      <View style={styles.bigRiverFocusShareNodeTop} />
      <View style={styles.bigRiverFocusShareStem} />
      <View style={styles.bigRiverFocusShareNodesRow}>
        <View style={styles.bigRiverFocusShareNode} />
        <View style={styles.bigRiverFocusShareNode} />
      </View>
    </View>
  );
}

export function BigRiverFocusDeleteIcon() {
  return (
    <View style={styles.bigRiverFocusDeleteIcon}>
      <View style={styles.bigRiverFocusDeleteLid} />
      <View style={styles.bigRiverFocusDeleteBin} />
    </View>
  );
}

const iconColor = bigRiverFocusColors.buttonText;

const styles = StyleSheet.create({
  bigRiverFocusWrapper: {
    alignSelf: 'center',
  },
  bigRiverFocusGradient: {
    flex: 1,
  },
  bigRiverFocusContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusTopIcon: {
    width: bigRiverFocusScale(28),
    height: bigRiverFocusScale(28),
  },
  bigRiverFocusPauseRow: {
    flexDirection: 'row',
    gap: bigRiverFocusScale(6),
  },
  bigRiverFocusPauseBar: {
    width: bigRiverFocusScale(6),
    height: bigRiverFocusScale(22),
    borderRadius: bigRiverFocusScale(2),
    backgroundColor: iconColor,
  },
  bigRiverFocusPlayTriangle: {
    width: 0,
    height: 0,
    marginLeft: bigRiverFocusScale(4),
    borderTopWidth: bigRiverFocusScale(12),
    borderBottomWidth: bigRiverFocusScale(12),
    borderLeftWidth: bigRiverFocusScale(18),
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: iconColor,
  },
  bigRiverFocusClock: {
    width: bigRiverFocusScale(24),
    height: bigRiverFocusScale(24),
    borderRadius: bigRiverFocusScale(12),
    borderWidth: bigRiverFocusScale(2.5),
    borderColor: iconColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusClockHandHour: {
    position: 'absolute',
    width: bigRiverFocusScale(2),
    height: bigRiverFocusScale(7),
    backgroundColor: iconColor,
    borderRadius: bigRiverFocusScale(1),
    top: bigRiverFocusScale(5),
    transform: [{rotate: '-30deg'}],
  },
  bigRiverFocusClockHandMinute: {
    position: 'absolute',
    width: bigRiverFocusScale(2),
    height: bigRiverFocusScale(9),
    backgroundColor: iconColor,
    borderRadius: bigRiverFocusScale(1),
    top: bigRiverFocusScale(3),
    transform: [{rotate: '45deg'}],
  },
  bigRiverFocusBackArrow: {
    color: iconColor,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(28),
    lineHeight: bigRiverFocusScale(32),
  },
  bigRiverFocusMutedTopWrapper: {
    alignSelf: 'center',
  },
  bigRiverFocusMutedTopButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: bigRiverFocusScale(14),
    backgroundColor: bigRiverFocusColors.topButtonMuted,
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
  },
  bigRiverFocusAquariumTopWrapper: {
    alignSelf: 'center',
  },
  bigRiverFocusAquariumTopButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: bigRiverFocusScale(14),
    backgroundColor: bigRiverFocusColors.aquariumTopButton,
  },
  bigRiverFocusHomeIcon: {
    width: bigRiverFocusScale(26),
    height: bigRiverFocusScale(24),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bigRiverFocusHomeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: bigRiverFocusScale(14),
    borderRightWidth: bigRiverFocusScale(14),
    borderBottomWidth: bigRiverFocusScale(10),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: iconColor,
    marginBottom: bigRiverFocusScale(1),
  },
  bigRiverFocusHomeBody: {
    width: bigRiverFocusScale(18),
    height: bigRiverFocusScale(12),
    borderRadius: bigRiverFocusScale(2),
    backgroundColor: iconColor,
  },
  bigRiverFocusShareIcon: {
    width: bigRiverFocusScale(22),
    height: bigRiverFocusScale(22),
    alignItems: 'center',
  },
  bigRiverFocusShareNodeTop: {
    width: bigRiverFocusScale(7),
    height: bigRiverFocusScale(7),
    borderRadius: bigRiverFocusScale(4),
    backgroundColor: iconColor,
    marginBottom: bigRiverFocusScale(2),
  },
  bigRiverFocusShareStem: {
    width: bigRiverFocusScale(2),
    height: bigRiverFocusScale(6),
    backgroundColor: iconColor,
    marginBottom: bigRiverFocusScale(2),
  },
  bigRiverFocusShareNodesRow: {
    flexDirection: 'row',
    gap: bigRiverFocusScale(8),
  },
  bigRiverFocusShareNode: {
    width: bigRiverFocusScale(7),
    height: bigRiverFocusScale(7),
    borderRadius: bigRiverFocusScale(4),
    backgroundColor: iconColor,
  },
  bigRiverFocusDeleteIcon: {
    width: bigRiverFocusScale(24),
    height: bigRiverFocusScale(24),
    alignItems: 'center',
  },
  bigRiverFocusDeleteLid: {
    width: bigRiverFocusScale(20),
    height: bigRiverFocusScale(3),
    borderRadius: bigRiverFocusScale(1),
    backgroundColor: iconColor,
    marginBottom: bigRiverFocusScale(2),
  },
  bigRiverFocusDeleteBin: {
    width: bigRiverFocusScale(16),
    height: bigRiverFocusScale(14),
    borderRadius: bigRiverFocusScale(2),
    borderWidth: bigRiverFocusScale(2),
    borderColor: iconColor,
  },
});
