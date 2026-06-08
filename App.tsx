import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BigRiverFocusNav} from './BigRiverFocusNav';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.bigRiverFocusRoot}>
      <SafeAreaProvider>
        <View style={styles.bigRiverFocusRoot}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <BigRiverFocusNav />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusRoot: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default App;
