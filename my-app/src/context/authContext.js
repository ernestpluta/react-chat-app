import { createContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import {

  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [load, setLoad] = useState(true);

  // const signout = async () => {
  //   return await signOut(auth).then(() => setCurrentUser(null));
  // };

  const resetPassword = async (userEmail) => {
    return await sendPasswordResetEmail(auth, userEmail).then(() => userEmail);
  };

  

  useEffect(() => {
    return onAuthStateChanged(auth, async (currUser) => {
      // currUser ? setCurrentUser(currUser) : setCurrentUser(false);
      if(currUser){
        await setPersistence(auth, browserSessionPersistence)
      }
      setCurrentUser(currUser)
      setLoad(false);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        // signout,
        currentUser,
        setCurrentUser,
        resetPassword,
      }}
    >
      {!load && children}
    </authContext.Provider>
  );
}
