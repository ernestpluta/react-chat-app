import { createContext, useReducer, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { Navigate, useNavigate } from 'react-router';
export const authContext = createContext();


export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null);

  const signup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password);
  };
  const login =  (email, password) => {
          auth.signInWithEmailAndPassword(email, password).then(() => {
              auth.setPersistence('session').then(() => {
                  navigate('/dashboard')
                  console.log('session active')
              })
          })
          console.log('signed in')
      }
  const signout = () => {
    auth.signOut().then(() => console.log('signed out'));
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((currUser) => {
      setCurrentUser(currUser);
      navigate('/')
    });
    return unsub
  }, []);



  return (
    <authContext.Provider value={{ login, signup, signout, currentUser}}>
      {children}
    </authContext.Provider>
  );
}
