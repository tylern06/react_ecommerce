import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  signOutUser,
} from '../utils/firebase/firebase.utils';

// create default value for context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  signOutUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log('on auth change', user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
