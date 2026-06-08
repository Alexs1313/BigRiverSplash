import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BigRiverFocusGradientButton} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusActions/BigRiverFocusGradientButton';
import {BigRiverFocusPaginationDots} from '../../BigRiverFocusComponents/BigRiverFocusNav/BigRiverFocusIndicators/BigRiverFocusPaginationDots';
import {bigRiverFocusColors} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {
  bigRiverFocusScale,
  bigRiverFocusVerticalScale,
} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import {BIG_RIVER_FOCUS_ONBOARDING_STEPS} from '../../BigRiverFocusConstants/BigRiverFocusOnboarding/BigRiverFocusOnboardingSteps/BigRiverFocusOnboardingSteps';

type BigRiverFocusOnboardingScreenProps = {
  onComplete: () => void;
};

export function BigRiverFocusOnboardingScreen({
  onComplete,
}: BigRiverFocusOnboardingScreenProps) {
  const insets = useSafeAreaInsets();
  const [stepIndex, setStepIndex] = useState(0);
  const step = BIG_RIVER_FOCUS_ONBOARDING_STEPS[stepIndex];

  const handlePress = () => {
    if (stepIndex < BIG_RIVER_FOCUS_ONBOARDING_STEPS.length - 1) {
      setStepIndex(prev => prev + 1);
      return;
    }

    onComplete();
  };

  return (
    <View style={styles.bigRiverFocusContainer}>
      <ImageBackground
        source={require('../../BigRiverFocusAssets/BigRiverFocusLoader_bg.png')}
        style={styles.bigRiverFocusBackground}
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={[
          styles.bigRiverFocusScrollContent,
          {
            paddingTop: insets.top + bigRiverFocusVerticalScale(24),
            paddingBottom: insets.bottom + bigRiverFocusVerticalScale(24),
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bigRiverFocusBoardSection}>
          <Image
            source={require('../../BigRiverFocusAssets/BigRiverFocusBoard.png')}
            style={styles.bigRiverFocusBoard}
            resizeMode="contain"
          />

          <Image
            source={step.character}
            style={styles.bigRiverFocusCharacter}
            resizeMode="contain"
          />
          <View style={styles.bigRiverFocusBoardContent}>
            <Text style={styles.bigRiverFocusTitle}>{step.title}</Text>
            <Text style={styles.bigRiverFocusDescription}>
              {step.description}
            </Text>
            <BigRiverFocusPaginationDots
              total={BIG_RIVER_FOCUS_ONBOARDING_STEPS.length}
              activeIndex={stepIndex}
            />
          </View>
        </View>

        <BigRiverFocusGradientButton
          label={step.buttonLabel}
          onPress={handlePress}
          style={styles.bigRiverFocusButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusContainer: {
    flex: 1,
  },
  bigRiverFocusBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  bigRiverFocusScrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    gap: bigRiverFocusVerticalScale(24),
    paddingHorizontal: bigRiverFocusScale(16),
    justifyContent: 'flex-end',
  },
  bigRiverFocusCharacter: {
    alignSelf: 'center',
    position: 'absolute',
    top: -350,
    zIndex: -1,
  },
  bigRiverFocusBoardSection: {
    width: bigRiverFocusScale(334),
    height: bigRiverFocusVerticalScale(300),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRiverFocusBoard: {
    ...StyleSheet.absoluteFillObject,
  },
  bigRiverFocusBoardContent: {
    width: bigRiverFocusScale(250),
    alignItems: 'center',
    gap: bigRiverFocusVerticalScale(16),
    justifyContent: 'center',
  },
  bigRiverFocusTitle: {
    color: bigRiverFocusColors.titleYellow,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(20),
    textAlign: 'center',
    lineHeight: bigRiverFocusScale(26),
  },
  bigRiverFocusDescription: {
    color: bigRiverFocusColors.white,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(15),
    textAlign: 'center',
    lineHeight: bigRiverFocusScale(20),
    paddingHorizontal: bigRiverFocusScale(8),
  },
  bigRiverFocusButton: {
    alignSelf: 'center',
  },
});
