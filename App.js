/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';

console.disableYellowBox = true

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />} */}
        <AppContainer ref={nav => {
          this.navigator = nav;
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  barColor: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

export default App;