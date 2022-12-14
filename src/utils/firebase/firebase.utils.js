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
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
} from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // create collection from key
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    // create doc based on the title of the object
    const docRef = doc(collectionRef, object.title.toLowerCase());
    console.log('batch set object', docRef, object);
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async (label) => {
  const collectionRef = collection(db, label);
  const q = query(collectionRef);
  // get docs from categories collection
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};
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
