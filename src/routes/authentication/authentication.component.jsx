import React, { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

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
    // redirect back to homepage page after authenication
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
    <div className="authentication-container">
      {/* <div>SignIn Page</div>
      <button onClick={logGoogleUser}>
        Sign in with google pop up
      </button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
