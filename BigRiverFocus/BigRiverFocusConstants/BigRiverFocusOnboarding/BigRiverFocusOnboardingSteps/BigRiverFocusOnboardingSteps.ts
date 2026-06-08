import {ImageSourcePropType} from 'react-native';

export type BigRiverFocusOnboardingStep = {
  title: string;
  description: string;
  buttonLabel: string;
  character: ImageSourcePropType;
};

export const BIG_RIVER_FOCUS_ONBOARDING_STEPS: BigRiverFocusOnboardingStep[] = [
  {
    title: 'Welcome to your calm fishing journey.',
    description:
      'Start a focus session, stay concentrated, and collect fish while you work, study, or relax without distractions.',
    buttonLabel: 'Next',
    character: require('../../../BigRiverFocusAssets/BigRiverFocusOboard1.png'),
  },
  {
    title: 'Every minute of focus helps your aquarium grow.',
    description:
      'The longer your session lasts, the more fish you earn and add to your personal collection.',
    buttonLabel: 'Okay',
    character: require('../../../BigRiverFocusAssets/BigRiverFocusOboard2.png'),
  },
  {
    title: 'Trade fish for rare species and beautiful backgrounds.',
    description:
      'Unlock new aquarium styles, discover special fish, and collect themed wallpapers in the Shop.',
    buttonLabel: 'Continue',
    character: require('../../../BigRiverFocusAssets/BigRiverFocusOboard3.png'),
  },
  {
    title: 'Read stories, complete quizzes, and track your progress.',
    description:
      'Explore short fishing stories, test your attention, and view your focus statistics in the History section.',
    buttonLabel: 'Start',
    character: require('../../../BigRiverFocusAssets/BigRiverFocusOboard4.png'),
  },
];

export const BIG_RIVER_FOCUS_ONBOARDING_PERSIST_KEY = '@big_river_splash_onboarding_complete';
