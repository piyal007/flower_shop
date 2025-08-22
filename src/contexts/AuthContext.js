"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/firebase.config";
import Swal from "sweetalert2";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email/Password Sign Up
  const signUp = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Email/Password Sign In
  const signIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  };

  // Sign Out with confirmation
  const signOut = async () => {
    try {
      const result = await Swal.fire({
        title: 'Sign Out?',
        text: 'Are you sure you want to sign out of your account?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, Sign Out',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

      if (result.isConfirmed) {
        await firebaseSignOut(auth);

        // Show success message after sign out
        Swal.fire({
          title: 'Signed Out Successfully!',
          text: 'You have been logged out. See you again soon!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4F46E5',
          timer: 1000,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });

        return true;
      }
      return false;
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while signing out. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EF4444'
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};