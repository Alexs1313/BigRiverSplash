import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

type BigRiverFocusMessageBannerProps = {
  message: string;
  showThumbnail?: boolean;
  avatarSource?: number;
};

export function BigRiverFocusMessageBanner({
  message,
  showThumbnail = true,
  avatarSource = require('../../../BigRiverFocusAssets/BigRiverFocusHeader_logo.png'),
}: BigRiverFocusMessageBannerProps) {
  return (
    <View style={styles.bigRiverFocusRow}>
      <View style={styles.bigRiverFocusBannerWrapper}>
        <LinearGradient
          colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.bigRiverFocusBanner}>
          <View style={styles.bigRiverFocusBannerContent}>
            <View style={styles.bigRiverFocusAvatarInset}>
              <Image source={avatarSource} style={styles.bigRiverFocusAvatar} />
            </View>
            <Text style={styles.bigRiverFocusMessage}>{message}</Text>
          </View>
        </LinearGradient>
      </View>
      {showThumbnail && (
        <Image
          source={require('../../../BigRiverFocusAssets/BigRiverFocusHeader_fish.png')}
          style={styles.bigRiverFocusThumbnail}
          resizeMode="cover"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: bigRiverFocusScale(6),
  },
  bigRiverFocusBannerWrapper: {
    flex: 1,
    height: bigRiverFocusVerticalScale(72),
    borderRadius: bigRiverFocusScale(16),
    overflow: 'hidden',
  },
  bigRiverFocusBanner: {
    flex: 1,
  },
  bigRiverFocusBannerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: bigRiverFocusScale(8),
    paddingVertical: bigRiverFocusScale(8),
    gap: bigRiverFocusScale(8),
  },
  bigRiverFocusAvatarInset: {
    width: bigRiverFocusScale(52),
    height: bigRiverFocusScale(52),
    borderRadius: bigRiverFocusScale(10),
    backgroundColor: bigRiverFocusColors.inactiveDot,
    overflow: 'hidden',
  },
  bigRiverFocusAvatar: {
    width: '100%',
    height: '100%',
  },
  bigRiverFocusMessage: {
    flex: 1,
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(13),
    lineHeight: bigRiverFocusScale(17),
  },
  bigRiverFocusThumbnail: {
    width: bigRiverFocusScale(52),
    height: bigRiverFocusScale(52),
    borderRadius: bigRiverFocusScale(10),
  },
});
