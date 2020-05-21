import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBBbBhDy5dMaymz1rUP6fFXQiUdwdWNZxI",
    authDomain: "real-estate-cd151.firebaseapp.com",
    databaseURL: "https://real-estate-cd151.firebaseio.com",
    projectId: "real-estate-cd151",
    storageBucket: "real-estate-cd151.appspot.com",
    messagingSenderId: "180347145792",
    appId: "1:180347145792:web:f6fedd674faa601f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // const auth = firebase.auth();
  // const db = firebase.firestore();

  const config = {
    auth: firebase.auth(),
    db: firebase.firestore(),
    storage: firebase.storage(),
    functions: firebase.functions()
  }

  export default config;