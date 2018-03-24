import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ImageBackground
} from 'react-native';

import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'

import { Actions } from 'react-native-router-flux'

import firebase, { firebaseAuth } from "./firebase";
const { FacebookAuthProvider } = firebase.auth;


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
        Actions.home()
      }, (error) => {
        console.log("Sign in error", error)
      })
    })
  }

  render() {
    return (
      <ImageBackground source={require('./background.jpg')} style={styles.container}>
        <Text style={styles.welcome}>Bienvenidos a PlatziMusic</Text>
        <Image source={require('./logo.png')} style={styles.logo} />
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={ this.handleLoginFinished }
          onLogoutFinished={() => alert("logout.")}/>
    </ImageBackground>
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
    

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: 'white',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15
  }
});