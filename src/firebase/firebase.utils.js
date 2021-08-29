// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
const config = {
  apiKey: "AIzaSyCd4IXYYMtnTJZWLJhPJu2iHAkRzbDGct4",
  authDomain: "crown-db-f1a4c.firebaseapp.com",
  projectId: "crown-db-f1a4c",
  storageBucket: "crown-db-f1a4c.appspot.com",
  messagingSenderId: "884265948435",
  appId: "1:884265948435:web:a1f62265372dcfaa5f76e6",
  measurementId: "G-P8381FC6YP"
};

//firebase.initializeApp(config);
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
