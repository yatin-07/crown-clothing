// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
const config = {
  apiKey: 'AIzaSyCdHT-AYHXjF7wOrfAchX4PIm3cSj5tn14',
  authDomain: 'crwn-db.firebaseapp.com',
  databaseURL: 'https://crwn-db.firebaseio.com',
  projectId: 'crwn-db',
  storageBucket: 'crwn-db.appspot.com',
  messagingSenderId: '850995411664',
  appId: '1:850995411664:web:7ddc01d597846f65'
};

const app = initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(provider);

export default app;
