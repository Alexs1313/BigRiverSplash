import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';

export function BigRiverFocusLoaderScreen() {
  return (
    <View style={styles.bigRiverFocusContainer}>
      <ImageBackground
        source={require('../../BigRiverFocusAssets/BigRiverFocusLoader_bg.png')}
        style={styles.bigRiverFocusBackground}
        resizeMode="cover"
      />
      <ScrollView
        contentContainerStyle={styles.bigRiverFocusScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bigRiverFocusIconCard}>
          <Image
            source={require('../../BigRiverFocusAssets/BigRiverFocusIcon.png')}
            style={styles.bigRiverFocusIcon}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  bigRiverFocusBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  bigRiverFocusScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: bigRiverFocusVerticalScale(48),
  },
  bigRiverFocusIconCard: {
    width: bigRiverFocusScale(347),
    height: bigRiverFocusScale(347),
    borderRadius: bigRiverFocusScale(34),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  bigRiverFocusIcon: {
    width: '100%',
    height: '100%',
  },
});
