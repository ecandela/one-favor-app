/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Platform
} from 'react-native';


import {Scene, Router} from 'react-native-router-flux'


import HomeView from './HomeView'
import LoginView from './LoginView'
import ArtistDetail from './ArtistDetailView'

export default class App extends Component {

  
  render() {

    const isAndroid = Platform.OS === 'android'


    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={LoginView} hideNavBar />      
          <Scene key="home" component={HomeView} hideNavBar />
          <Scene key="artistDetail" component={ArtistDetail} hideNavBar={isAndroid} />
      </Scene>
    </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 50,
  }
});