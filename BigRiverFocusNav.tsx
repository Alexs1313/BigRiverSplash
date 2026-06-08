import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {BigRiverFocusHomeTab} from './BigRiverFocus/BigRiverFocusConstants/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusTabs';
import {BigRiverFocusAquariumScreen} from './BigRiverFocus/BigRiverFocusScreens/BigRiverFocusAquariumScreen/BigRiverFocusAquariumScreen';
import {BigRiverFocusFocusSpaceScreen} from './BigRiverFocus/BigRiverFocusScreens/BigRiverFocusFocusSpaceScreen/BigRiverFocusFocusSpaceScreen';
import {BigRiverFocusHistoryScreen} from './BigRiverFocus/BigRiverFocusScreens/BigRiverFocusHistoryScreen/BigRiverFocusHistoryScreen';
import {BigRiverFocusLoaderScreen} from './BigRiverFocus/BigRiverFocusScreens/BigRiverFocusLoaderScreen/BigRiverFocusLoaderScreen';
import {BigRiverFocusOnboardingScreen} from './BigRiverFocus/BigRiverFocusScreens/BigRiverFocusOnboardingScreen/BigRiverFocusOnboardingScreen';
import {BigRiverFocusShopScreen} from './BigRiverFocus/BigRiverFocusScreens/BigRiverFocusShopScreen/BigRiverFocusShopScreen';
import {BigRiverFocusStoriesScreen} from './BigRiverFocus/BigRiverFocusScreens/BigRiverFocusStoriesScreen/BigRiverFocusStoriesScreen';

const BIG_RIVER_FOCUS_LOADER_DURATION_MS = 5000;

export type BigRiverFocusRootStackParamList = {
  Loader: undefined;
  Onboarding: undefined;
  Focus: undefined;
  Aquarium: undefined;
  Stories: undefined;
  History: undefined;
  Shop: undefined;
};

export type BigRiverFocusRootNavProp =
  StackNavigationProp<BigRiverFocusRootStackParamList>;

const Stack = createStackNavigator<BigRiverFocusRootStackParamList>();

function bigRiverFocusCreateTabPressHandler(
  navigation: BigRiverFocusRootNavProp,
) {
  return (tab: BigRiverFocusHomeTab) => {
    switch (tab) {
      case 'aquarium':
        navigation.navigate('Aquarium');
        break;
      case 'stories':
        navigation.navigate('Stories');
        break;
      default:
        navigation.navigate('Focus');
        break;
    }
  };
}

function BigRiverFocusLoaderPath({
  navigation,
}: {
  navigation: BigRiverFocusRootNavProp;
}) {
  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      await new Promise<void>(resolve => {
        setTimeout(resolve, BIG_RIVER_FOCUS_LOADER_DURATION_MS);
      });

      if (!isMounted) {
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{name: 'Onboarding'}],
      });
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [navigation]);

  return <BigRiverFocusLoaderScreen />;
}

function BigRiverFocusOnboardingPath({
  navigation,
}: {
  navigation: BigRiverFocusRootNavProp;
}) {
  const handleComplete = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Focus'}],
    });
  };

  return <BigRiverFocusOnboardingScreen onComplete={handleComplete} />;
}

function BigRiverFocusFocusPath({
  navigation,
}: {
  navigation: BigRiverFocusRootNavProp;
}) {
  return (
    <BigRiverFocusFocusSpaceScreen
      activeTab="focus"
      onTabPress={bigRiverFocusCreateTabPressHandler(navigation)}
      onOpenHistory={() => navigation.navigate('History')}
      onOpenShop={() => navigation.navigate('Shop')}
    />
  );
}

function BigRiverFocusAquariumPath({
  navigation,
}: {
  navigation: BigRiverFocusRootNavProp;
}) {
  return (
    <BigRiverFocusAquariumScreen
      onTabPress={bigRiverFocusCreateTabPressHandler(navigation)}
      onOpenHistory={() => navigation.navigate('History')}
      onOpenShop={() => navigation.navigate('Shop')}
    />
  );
}

function BigRiverFocusStoriesPath({
  navigation,
}: {
  navigation: BigRiverFocusRootNavProp;
}) {
  return (
    <BigRiverFocusStoriesScreen
      onTabPress={bigRiverFocusCreateTabPressHandler(navigation)}
      onOpenHistory={() => navigation.navigate('History')}
      onOpenShop={() => navigation.navigate('Shop')}
    />
  );
}

function BigRiverFocusHistoryPath({
  navigation,
}: {
  navigation: BigRiverFocusRootNavProp;
}) {
  return (
    <BigRiverFocusHistoryScreen
      onTabPress={bigRiverFocusCreateTabPressHandler(navigation)}
      onGoToFocus={() => navigation.navigate('Focus')}
      onOpenShop={() => navigation.navigate('Shop')}
    />
  );
}

function BigRiverFocusShopPath({
  navigation,
}: {
  navigation: BigRiverFocusRootNavProp;
}) {
  return (
    <BigRiverFocusShopScreen
      onTabPress={bigRiverFocusCreateTabPressHandler(navigation)}
      onOpenHistory={() => navigation.navigate('History')}
    />
  );
}

export function BigRiverFocusNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loader"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: '#000000'},
        }}>
        <Stack.Screen name="Loader" component={BigRiverFocusLoaderPath} />
        <Stack.Screen
          name="Onboarding"
          component={BigRiverFocusOnboardingPath}
        />
        <Stack.Screen name="Focus" component={BigRiverFocusFocusPath} />
        <Stack.Screen name="Aquarium" component={BigRiverFocusAquariumPath} />
        <Stack.Screen name="Stories" component={BigRiverFocusStoriesPath} />
        <Stack.Screen name="History" component={BigRiverFocusHistoryPath} />
        <Stack.Screen name="Shop" component={BigRiverFocusShopPath} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
