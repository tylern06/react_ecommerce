// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: '870077035158',
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: 'G-S4X3CP0R98',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});
// const analytics = getAnalytics(app);
export const auth = getAuth();
// include auth and provider type to sign in with popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const createAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return;

  try {
    const response = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log({ response });
    return response;
  } catch (error) {
    console.log({ error });
  }
};

export const signOutUser = async (user) => {
  await signOut(auth);
};

export const db = getFirestore();

// create user doc in db if it doesn't exist
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalUserInfo = {}
) => {
  if (!userAuth) return;

  // create document in users collection with user id
  const userDocRef = doc(db, 'users', userAuth.uid);

  // get user doc with id in firestore
  const userSnapShot = await getDoc(userDocRef);
  console.log({ userDocRef });
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // set user doc in firestore
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalUserInfo,
      });
    } catch (err) {
      console.log('error creating the user', err);
    }
  }

  return userDocRef;
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
