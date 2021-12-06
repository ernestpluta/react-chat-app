import { createContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import { useNavigate } from 'react-router';
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
  const navigate = useNavigate()

  // const [isAuthed, setIsAuthed] = useState(localStorage.userAuthenticated)
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
  }, [navigate]);

  return (
    <authContext.Provider
      value={{
        // signout,
        // isAuthed,
        // setIsAuthed,
        currentUser,
        setCurrentUser,
        resetPassword,
      }}
    >
      {!load && children}
    </authContext.Provider>
  );
}
