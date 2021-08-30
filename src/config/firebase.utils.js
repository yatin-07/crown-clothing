  
// import firebase from 'firebase';
//  import 'firebase/firestore';
//  import 'firebase/auth';
//  import firebase from "firebase/app";
//  import 'firebase/firestore';
// import "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from 'firebase/app';
 import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const config =  {
  apiKey: "AIzaSyCahI4FPIelR0a89_PdFvZ3MrREmbFf4l8",
  authDomain: "awesome-c1473.firebaseapp.com",
  projectId: "awesome-c1473",
  storageBucket: "awesome-c1473.appspot.com",
  messagingSenderId: "276199347744",
  appId: "1:276199347744:web:b9832053dc42fd48330e45",
  measurementId: "G-5NPT6BXCTN"
};
const app = initializeApp(config);

//firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);

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