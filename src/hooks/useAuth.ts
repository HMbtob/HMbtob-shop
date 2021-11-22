import React, { useCallback, useEffect, useState } from 'react';
import {
  getAuth,
  setPersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence
} from 'firebase/auth';
import { firebaseApp } from '../firebase';
import { AuthContextType, LogInForm } from '../models/login';
import { useNavigate } from 'react-router';

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<object | null>(null);
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async () => {
      setLoading(true);
      await onAuthStateChanged(auth, (user) => {
        user ? setAuthUser(user) : setAuthUser(null);
      });
    };
    getAuth();
    setLoading(false);
  }, []);

  const logIn = useCallback(async (form: LogInForm) => {
    const { email, password } = form;
    try {
      setPersistence(auth, browserLocalPersistence).then(async () => {
        const user = await signInWithEmailAndPassword(auth, email, password);
        setAuthUser(user);
      });
    } catch (e) {
      console.log(e);
      setAuthUser(null);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const logOut = useCallback(async () => {
    await signOut(auth);
    await navigate('/');
    return null;
  }, []);
  return {
    authState: {
      isLoading,
      authUser
    },
    authHandler: {
      logIn,
      logOut
    }
  };
}
