import {Platform} from 'react-native';

export const bigRiverFocusFonts = {
  jotiOne: Platform.select({
    ios: 'Joti One',
    android: 'BigRiverFocusJotiOne-Regular',
    default: 'Joti One',
  }) as string,
};
