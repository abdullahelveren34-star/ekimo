'use client';

import React, { useMemo, type ReactNode, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { initiateAnonymousSignIn } from './non-blocking-login';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const auth = getAuth(firebaseServices.firebaseApp);
    // This effect runs on the client after hydration.
    // It checks the auth state and initiates anonymous sign-in if no user is found.
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        initiateAnonymousSignIn(auth);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firebaseServices.firebaseApp]); // Reruns if the app instance changes, which it shouldn't.

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}
