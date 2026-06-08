import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BigRiverFocusBrownButton} from '../../BigRiverFocusButtons/BigRiverFocusActions/BigRiverFocusBrownButton';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import type {BigRiverFocusStory} from '../../../BigRiverFocusConstants/BigRiverFocusStories/BigRiverFocusStoriesData/BigRiverFocusStories';

type BigRiverFocusStoryCardProps = {
  story: BigRiverFocusStory;
  onPressMore: () => void;
};

export function BigRiverFocusStoryCard({story, onPressMore}: BigRiverFocusStoryCardProps) {
  return (
    <View style={styles.bigRiverFocusShadow}>
      <LinearGradient
        colors={[bigRiverFocusColors.panelYellow, bigRiverFocusColors.panelYellowLight]}
        style={styles.bigRiverFocusCard}>
        <View style={styles.bigRiverFocusContent}>
          <Text style={styles.bigRiverFocusTitle}>{story.title}</Text>
          <Text style={styles.bigRiverFocusPreview} numberOfLines={2}>
            {story.preview}
          </Text>
          <BigRiverFocusBrownButton label="More" onPress={onPressMore} width={bigRiverFocusScale(120)} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusShadow: {
    borderRadius: bigRiverFocusScale(20),
    backgroundColor: bigRiverFocusColors.cardShadow,
    paddingBottom: bigRiverFocusVerticalScale(3),
  },
  bigRiverFocusCard: {
    borderRadius: bigRiverFocusScale(20),
    borderWidth: bigRiverFocusScale(1),
    borderColor: bigRiverFocusColors.buttonText,
    overflow: 'hidden',
  },
  bigRiverFocusContent: {
    paddingHorizontal: bigRiverFocusScale(18),
    paddingTop: bigRiverFocusVerticalScale(14),
    paddingBottom: bigRiverFocusVerticalScale(16),
    gap: bigRiverFocusVerticalScale(10),
    alignItems: 'center',
  },
  bigRiverFocusTitle: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(22),
    textAlign: 'center',
  },
  bigRiverFocusPreview: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(14),
    lineHeight: bigRiverFocusScale(18),
    textAlign: 'center',
  },
});
