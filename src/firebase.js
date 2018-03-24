import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyD3UwKWxSHDtLlxgqwlHdU1xnF6oOTph3w",
    authDomain: "one-favor.firebaseapp.com",
    databaseURL: "https://one-favor.firebaseio.com",
    projectId: "one-favor",
    storageBucket: "one-favor.appspot.com",
    messagingSenderId: "719089187093"
}

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();

export default firebase