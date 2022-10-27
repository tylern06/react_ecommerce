import React, { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up/sign-up';
// auth helps keep track of authentication state in app
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
export default function SignIn() {
  useEffect(() => {
    const getRedirectData = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(
          response.user
        );
        console.log({ response, userDocRef });
      }
    };
    // getRedirectData();
  }, []);
  const logGoogleUser = async () => {
    // open google popup to login with google account and get firebase access token
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log({ user, userDocRef });
  };

  const logGoogleUserRedirect = async () => {
    // open google popup to login with google account and get firebase access token
    const { user } = await signInWithGoogleRedirect();
    // console.log({ user });
  };
  return (
    <div>
      {/* <div>SignIn Page</div>
      <button onClick={logGoogleUser}>
        Sign in with google pop up
      </button> */}
      <SignUpForm />
    </div>
  );
}
