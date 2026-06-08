import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import {BIG_RIVER_FOCUS_HISTORY_MESSAGES} from '../../../BigRiverFocusConstants/BigRiverFocusHistory/BigRiverFocusHistoryMessages/BigRiverFocusHistoryMessages';

export function BigRiverFocusHistoryEmptyPanel() {
  return (
    <View style={styles.bigRiverFocusRow}>
      <View style={styles.bigRiverFocusAvatarShadow}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          style={styles.bigRiverFocusAvatarCard}>
          <View style={styles.bigRiverFocusAvatarContent}>
            <Image
              source={require('../../../BigRiverFocusAssets/BigRiverFocusOboard2.png')}
              style={styles.bigRiverFocusAvatar}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.bigRiverFocusMessageShadow}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          style={styles.bigRiverFocusMessageCard}>
          <View style={styles.bigRiverFocusMessageContent}>
            <Text style={styles.bigRiverFocusMessage}>{BIG_RIVER_FOCUS_HISTORY_MESSAGES.empty}</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(12),
    paddingHorizontal: bigRiverFocusScale(16),
  },
  bigRiverFocusAvatarShadow: {
    width: bigRiverFocusScale(120),
    height: bigRiverFocusScale(120),
    borderRadius: bigRiverFocusScale(23),
    backgroundColor: bigRiverFocusColors.cardShadow,
    paddingBottom: bigRiverFocusVerticalScale(3),
  },
  bigRiverFocusAvatarCard: {
    flex: 1,
    borderRadius: bigRiverFocusScale(23),
    borderWidth: bigRiverFocusScale(1),
    borderColor: bigRiverFocusColors.buttonText,
    overflow: 'hidden',
  },
  bigRiverFocusAvatarContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bigRiverFocusAvatar: {
    width: bigRiverFocusScale(78),
    height: bigRiverFocusVerticalScale(110),
    marginBottom: bigRiverFocusVerticalScale(-8),
  },
  bigRiverFocusMessageShadow: {
    width: bigRiverFocusScale(234),
    height: bigRiverFocusScale(120),
    borderRadius: bigRiverFocusScale(23),
    backgroundColor: bigRiverFocusColors.cardShadow,
    paddingBottom: bigRiverFocusVerticalScale(3),
  },
  bigRiverFocusMessageCard: {
    flex: 1,
    borderRadius: bigRiverFocusScale(23),
    borderWidth: bigRiverFocusScale(1),
    borderColor: bigRiverFocusColors.buttonText,
    overflow: 'hidden',
  },
  bigRiverFocusMessageContent: {
    flex: 1,
    paddingHorizontal: bigRiverFocusScale(14),
    paddingVertical: bigRiverFocusVerticalScale(14),
    justifyContent: 'center',
  },
  bigRiverFocusMessage: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(20),
    textAlign: 'center',
    lineHeight: bigRiverFocusScale(24),
  },
});
