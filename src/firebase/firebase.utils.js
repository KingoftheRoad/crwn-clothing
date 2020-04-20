import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBd6qCXqzxDDsA4cU7PfYrcwdyvnYT3fvE",
  authDomain: "crwn-db-eb1d3.firebaseapp.com",
  databaseURL: "https://crwn-db-eb1d3.firebaseio.com",
  projectId: "crwn-db-eb1d3",
  storageBucket: "crwn-db-eb1d3.appspot.com",
  messagingSenderId: "610695645668",
  appId: "1:610695645668:web:56911140dc4011a90c1ff1",
  measurementId: "G-7PBYMCRQDS"
};

firebase.initializeApp(config);

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
