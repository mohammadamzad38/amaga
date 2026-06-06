"use client";

import { signIn } from "@/lib/api";
import { signUp } from "@/lib/api";
import { useRouter } from "next/navigation";
import auth from "../app/firebase/firebase.init";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { createContext, useCallback, useContext, useState } from "react";

// https://agama-it.firebaseapp.com/__/auth/handler

const STORAGE_KEY = "agama_it_auth";
const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const fbAuthProvider = new FacebookAuthProvider();

const getStoredAuth = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
};

const storedAuth = getStoredAuth();

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(storedAuth.user);
  const [token, setToken] = useState(storedAuth.token);
  const [loading, setLoading] = useState(false);
  const [isInitialized] = useState(true);

  const persist = useCallback((userData, authToken) => {
    const payload = { user: userData, token: authToken };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      localStorage.setItem("token", authToken);
    } catch (e) {
      console.warn("Auth persist failed:", e);
    }

    setUser(userData);
    setToken(authToken);
  }, []);

  // Login Account

  const logIn = useCallback(
    async ({ email, password }) => {
      if (!email || !password) {
        return { error: "Email and password are required" };
      }

      setLoading(true);

      const { data, error } = await signIn({ email, password });

      setLoading(false);

      if (error) return { error };

      if (data?.token && data?.user) {
        persist(data.user, data.token);
        return { error: null, user: data.user };
      }

      return { error: "Invalid response from server" };
    },
    [persist],
  );

  // Register Account

  const register = useCallback(
    async ({ email, company_name, password, last_name, first_name }) => {
      const { data, error } = await signUp({
        email,
        company_name,
        password,
        last_name,
        first_name,
      });
      if (error) return error;
      if (data?.token && data?.user) {
        persist(data?.user, data.token);
        return { error: null };
      }
      return { error: "Invalid response" };
    },
    [persist],
  );

  // Logout

  const logOut = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("token");
    } catch (e) {
      console.warn("Logout failed:", e);
    }

    setUser(null);
    setToken(null);
    router.push("/login");
  }, [router]);

  // POP Up with GOOGLE
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // POP Up with FACEBOOK
  const signinWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, fbAuthProvider);
  };

  const value = {
    user,
    token,
    loading,
    isInitialized,
    logIn,
    logOut,
    setUser,
    register,
    signInWithGoogle,
    signinWithFacebook,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
