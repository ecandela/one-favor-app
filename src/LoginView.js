import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'

import { Actions } from 'react-native-router-flux'

import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyD3UwKWxSHDtLlxgqwlHdU1xnF6oOTph3w",
  authDomain: "one-favor.firebaseapp.com",
  databaseURL: "https://one-favor.firebaseio.com",
  projectId: "one-favor",
  storageBucket: "one-favor.appspot.com",
  messagingSenderId: "719089187093"
};
firebase.initializeApp(config);

const { FacebookAuthProvider } = firebase.auth;
const firebaseAuth = firebase.auth();

export default class LoginView extends Component {
  
  state = {
    credential: null
  }

  componentWillMount() {
    this.authenticateUser();
  }
  
  authenticateUser = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken } = data
      const credential = FacebookAuthProvider.credential(accessToken)
      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        this.setState({ credentials })
      }, (error) => {
        console.log("Sign in error", error)
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bienvenidos a 1Favor</Text>
        <Text style={styles.welcome}>
          {this.state.credentials && this.state.credentials.displayName}
        </Text>
        <Button onPress={this.handleButtonPress} title='Seguir' />
        <LoginButton
          readPermissions={['public_profile','email']}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }

    handleLoginFinished = (error, result) => {
        if (error) {
            console.error(error)
     
        } else if (result.isCancelled) {
          console.error(result)
        
        } else {
          this.authenticateUser()
        }
      }
  
      handleButtonPress = () => {
        Actions.home()
      }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray', 
    justifyContent:'center',
    alignItems:'center',
  }, 
  welcome: {
      fontSize:24,
      fontWeight:'600',
      marginBottom: 20 
  },
});