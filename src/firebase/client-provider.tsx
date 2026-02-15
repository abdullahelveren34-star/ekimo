'use client';

import React, { useMemo, type ReactNode, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { Auth } from 'firebase/auth';
import { initiateAnonymousSignIn } from './non-blocking-login';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (!firebaseServices.auth) return; // Guard against null auth
    const auth = firebaseServices.auth as Auth;
    // This effect runs on the client after hydration.
    // It checks the auth state and initiates anonymous sign-in if no user is found.
    const unsubscribe = auth.onAuthStateChanged(user => {
      // Only sign in anonymously if there is NO user at all.
      // If a user signs out, `user` will be null, and we don't want to auto-sign-in again.
      // A better check might be to see if it's the initial load.
      // For now, this logic is disabled to allow for a clear login/logout flow.
      // A user must explicitly log in.
      // if (!user) {
      //   initiateAnonymousSignIn(auth);
      // }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firebaseServices.auth]); // Reruns if the auth instance changes

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
      storage={firebaseServices.storage}
    >
      {children}
    </FirebaseProvider>
  );
}
