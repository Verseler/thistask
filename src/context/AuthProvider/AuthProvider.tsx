import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/services/supabase/supabaseClient";
import { login, getUser, logout } from "@/services/api";
import {
  type TAuthContext,
  type AuthProviderProps,
  type User,
} from "./AuthProvider.type";

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuth = (): TAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser(setUser, setLoading);

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        if (!session?.user) {
          console.error("User not found");
          return;
        }
        setUser(session?.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
