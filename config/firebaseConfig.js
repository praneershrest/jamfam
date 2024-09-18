// src/config/firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/storage';
import Constants from 'expo-constants'; // Expo Constants to access environment variables

// Initialize Firebase using environment variables
const firebaseConfig = {
  apiKey: Constants.extra.firebaseApiKey,
  authDomain: Constants.extra.firebaseAuthDomain,
  projectId: Constants.extra.firebaseProjectId,
  storageBucket: Constants.extra.firebaseStorageBucket,
  messagingSenderId: Constants.extra.firebaseMessagingSenderId,
  appId: Constants.extra.firebaseAppId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
