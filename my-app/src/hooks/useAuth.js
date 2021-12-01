import { useContext } from 'react';
import { authContext } from '../context/authContext';

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
      throw new Error('useAuth() must be used inside a AuthProvider')
  }
  return context;
};
