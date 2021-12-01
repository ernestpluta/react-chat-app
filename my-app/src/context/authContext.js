import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router';
export const authContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [load, setLoad] = useState(true);
  // const userID = currentUser
  const signup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      setTimeout(() => navigate('/login'), 1000);
    });
  };
  const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
      auth.setPersistence('session').then(() => {
        setIsLogged(true);
        console.log('session active');
      });
    });
    console.log('signed in');
  };
  const signout = () => {
    auth.signOut().then(() => {
      setIsLogged(false);
      console.log('signed out');
      navigate('/login');
    });
  };
  const resetPassword = (userEmail) => {
    auth
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        console.log('change password email send');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((currUser) => {
      if (isLogged) {
        setCurrentUser(currUser);
      }
      setLoad(false);
    });
    return unsub;
  }, [currentUser]);

  return (
    <authContext.Provider
      value={{ login, signup, signout, currentUser, resetPassword, isLogged }}
    >
      {!load && children}
    </authContext.Provider>
  );
}
