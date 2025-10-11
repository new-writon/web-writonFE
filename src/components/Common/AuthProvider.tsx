// hooks/useAuth.ts
import { createContext, useContext, useEffect, useState } from "react";
import { getCookieToken } from "@/apis/login";

const AuthContext = createContext<{ isAuthenticated: boolean | null }>({ isAuthenticated: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { token } = await getCookieToken();
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
