"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn as apiSignIn } from "@/lib/api";

const STORAGE_KEY = "agama_it_auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Restore auth from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { user: storedUser, token: storedToken } = JSON.parse(stored);
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (e) {
      console.warn("Auth restore failed:", e);
    }
    setIsInitialized(true);
  }, []);

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

  const logIn = useCallback(
    async ({ email, password }) => {
      if (!email || !password) {
        return { error: "Email and password are required" };
      }

      setLoading(true);
      const { data, error } = await apiSignIn({ email, password });

      if (error) {
        setLoading(false);
        return { error };
      }

      if (data?.token && data?.user) {
        persist(data.user, data.token);
        setLoading(false);
        // Redirect to dashboard after successful login
        router.push("/dashboard");
        return { error: null, user: data.user };
      }

      setLoading(false);
      return { error: "Invalid response from server" };
    },
    [persist, router],
  );

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

  const value = { user, token, loading, logIn, logOut, isInitialized };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
