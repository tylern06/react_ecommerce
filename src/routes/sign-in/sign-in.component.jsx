import React from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
export default function SignIn() {
  const logGoogleUser = async () => {
    // open google popup to login with google account and get firebase access token
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log({ user, userDocRef });
  };
  return (
    <div>
      <div>SignIn Page</div>
      <button onClick={logGoogleUser}>
        Sign in with google pop up
      </button>
    </div>
  );
}
