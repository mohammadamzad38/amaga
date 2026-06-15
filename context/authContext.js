"use client";

import { signUp } from "@/lib/api";
import { supplierInfo } from "../lib/api";
import { useRouter } from "next/navigation";
import { allPost, signIn } from "@/lib/api";
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

  const [isInitialized] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(storedAuth.user);
  const [token, setToken] = useState(storedAuth.token);

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

  // Login Account ?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const logIn = useCallback(
    async ({ email, password }) => {
      if (!email || !password) {
        return { error: "Email and password are required" };
      }

      setLoading(true);

      const { data, error } = await signIn({ email, password });

      setLoading(false);

      if (error) return { error };

      if (data?.user && data?.access_token) {
        persist(data.user, data.access_token);
        return { error: null, user: data.user, token: data.access_token };
      }

      return { error: "Login failed. Please try again." };
    },
    [persist],
  );

  // Register Account >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const register = useCallback(
    async ({ email, company_name, password, last_name, first_name }) => {
      const { data, error } = await signUp({
        email,
        company_name,
        password,
        last_name,
        first_name,
      });

      if (error) {
        return { error, data: null };
      }

      if (data?.user && (data.token || data?.access_token)) {
        const token = data.token || data.access_token;
        persist(data?.user, token);
        return { error: null, data };
      }

      if (data) {
        return { error: data, data: null };
      }

      return { error: "Invalid response", data: null };
    },
    [persist],
  );

  // Logout  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const clearAuth = useCallback(() => {
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

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  // POP Up with GOOGLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      persist(result.user, token);

      return { user: result.user, token };
    } catch (error) {
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // POP Up with FACEBOOK  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const signinWithFacebook = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, fbAuthProvider);
      const token = await result.user.getIdToken();
      persist(result.user, token);

      return { user: result.user, token };
    } catch (error) {
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  //  Supplier info >>>>>>>>>>>>>>>>

  const getSupplierInfo = async () => {
    setLoading(true);

    const result = await supplierInfo({
      entity_type: "FIBER",
      user_id: 119,
    });

    // console.log("SUPPLIER INFO:", result);

    setLoading(false);
    return result;
  };

  const value = {
    user,
    token,
    loading,
    isInitialized,
    logIn,
    logout,
    setUser,
    register,
    clearAuth,
    signInWithGoogle,
    signinWithFacebook,
    getSupplierInfo,
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
