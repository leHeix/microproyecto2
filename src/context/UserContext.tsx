import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import { supabase } from "../supabase";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setAuthenticated(!!session);
        setUser(session?.user || null);
      } else if (event === "SIGNED_OUT") {
        setAuthenticated(false);
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const initializeAuth = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        setAuthenticated(false);
        setUser(null);
      } else {
        setAuthenticated(!!session);
        setUser(session?.user || null);
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;

      setUser(user);
      setAuthenticated(!!user);
    } catch (error) {
      console.error("Error refreshing user:", error);
      setAuthenticated(false);
      setUser(null);
    }
  };

  const value: UserContextType = {
    authenticated,
    user,
    loading,
    signOut,
    refreshUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook personalizado para usar el contexto
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};

export { UserContext, UserProvider, useUser };
