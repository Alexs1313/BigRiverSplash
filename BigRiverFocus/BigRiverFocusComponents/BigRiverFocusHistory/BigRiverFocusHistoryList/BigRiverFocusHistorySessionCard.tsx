import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BigRiverFocusDeleteIcon} from '../../BigRiverFocusButtons/BigRiverFocusIcons/BigRiverFocusIconButton';
import {bigRiverFocusColors} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {
  bigRiverFocusScale,
  bigRiverFocusVerticalScale,
} from '../../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import type {BigRiverFocusFocusSession} from '../../../BigRiverFocusTypes/BigRiverFocusFocusSession';
import {
  bigRiverFocusFormatSessionDate,
  bigRiverFocusFormatTime,
} from '../../../../BigRiverFocusUtils/BigRiverFocusFormatting/BigRiverFocusTime/BigRiverFocusFormatTime';
import {bigRiverFocusShareFocusResults} from '../../../../BigRiverFocusUtils/BigRiverFocusShare/BigRiverFocusFocusShare/BigRiverFocusShareFocusResults';

type BigRiverFocusHistorySessionCardProps = {
  session: BigRiverFocusFocusSession;
  onDelete: (id: string) => void;
};

export function BigRiverFocusHistorySessionCard({
  session,
  onDelete,
}: BigRiverFocusHistorySessionCardProps) {
  const fishText = session.fishCount.toString().padStart(3, '0');

  return (
    <View style={styles.bigRiverFocusShadow}>
      <LinearGradient
        colors={[
          bigRiverFocusColors.panelYellow,
          bigRiverFocusColors.panelYellowLight,
        ]}
        style={styles.bigRiverFocusCard}>
        <View style={styles.bigRiverFocusContent}>
          <Text style={styles.bigRiverFocusDate}>
            {bigRiverFocusFormatSessionDate(session.createdAt)}
          </Text>

          <View style={styles.bigRiverFocusStatsRow}>
            <View style={styles.bigRiverFocusStatIcon}>
              <Image
                source={require('../../../BigRiverFocusAssets/BigRiverFocusYelltimer.png')}
                style={styles.bigRiverFocusTimerIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.bigRiverFocusStatValue}>
              <Text style={styles.bigRiverFocusStatText}>
                {bigRiverFocusFormatTime(session.elapsedSeconds)}
              </Text>
            </View>
            <View style={styles.bigRiverFocusStatIcon}>
              <Image
                source={require('../../../BigRiverFocusAssets/BigRiverFocusBlue_fish.png')}
                style={styles.bigRiverFocusFishIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.bigRiverFocusStatValue}>
              <Text style={styles.bigRiverFocusStatText}>{fishText}</Text>
            </View>
          </View>

          <View style={styles.bigRiverFocusActionsRow}>
            <Pressable
              style={styles.bigRiverFocusShareButton}
              onPress={() =>
                bigRiverFocusShareFocusResults(
                  session.elapsedSeconds,
                  session.fishCount,
                )
              }>
              <Text style={styles.bigRiverFocusShareText}>Share</Text>
            </Pressable>
            <Pressable
              style={styles.bigRiverFocusDeleteButton}
              onPress={() => onDelete(session.id)}>
              <BigRiverFocusDeleteIcon />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusShadow: {
    alignSelf: 'center',
    width: bigRiverFocusScale(344),
    borderRadius: bigRiverFocusScale(23),
    backgroundColor: bigRiverFocusColors.cardShadow,
    paddingBottom: bigRiverFocusVerticalScale(3),
  },
  bigRiverFocusCard: {
    borderRadius: bigRiverFocusScale(23),
    borderWidth: bigRiverFocusScale(1),
    borderColor: bigRiverFocusColors.buttonText,
    overflow: 'hidden',
  },
  bigRiverFocusContent: {
    paddingHorizontal: bigRiverFocusScale(16),
    paddingTop: bigRiverFocusVerticalScale(8),
    paddingBottom: bigRiverFocusVerticalScale(14),
    gap: bigRiverFocusVerticalScale(12),
  },
  bigRiverFocusDate: {
    color: bigRiverFocusColors.black,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(20),
    textAlign: 'center',
  },
  bigRiverFocusStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(8),
  },
  bigRiverFocusStatIcon: {
    width: bigRiverFocusScale(49),
    height: bigRiverFocusScale(49),
    borderRadius: bigRiverFocusScale(9),
    backgroundColor: bigRiverFocusColors.buttonText,
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusTimerIcon: {
    width: bigRiverFocusScale(28),
    height: bigRiverFocusScale(28),
  },
  bigRiverFocusFishIcon: {
    width: bigRiverFocusScale(32),
    height: bigRiverFocusScale(32),
  },
  bigRiverFocusStatValue: {
    minWidth: bigRiverFocusScale(95),
    height: bigRiverFocusScale(49),
    borderRadius: bigRiverFocusScale(9),
    backgroundColor: bigRiverFocusColors.buttonText,
    borderWidth: bigRiverFocusScale(0.5),
    borderColor: bigRiverFocusColors.buttonText,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: bigRiverFocusScale(8),
  },
  bigRiverFocusStatText: {
    color: bigRiverFocusColors.panelYellow,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(17),
    letterSpacing: 0.5,
  },
  bigRiverFocusActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: bigRiverFocusScale(8),
  },
  bigRiverFocusShareButton: {
    flex: 1,
    height: bigRiverFocusScale(49),
    borderRadius: bigRiverFocusScale(9),
    backgroundColor: bigRiverFocusColors.buttonText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusShareText: {
    color: bigRiverFocusColors.panelYellow,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(17),
  },
  bigRiverFocusDeleteButton: {
    width: bigRiverFocusScale(51),
    height: bigRiverFocusScale(49),
    borderRadius: bigRiverFocusScale(9),
    backgroundColor: bigRiverFocusColors.deleteRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
