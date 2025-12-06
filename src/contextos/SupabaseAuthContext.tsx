import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useKV } from '@github/spark/hooks';

interface AuthContextType {
  user: any | null;
  userData: any | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useKV<any | null>('hogar-belen-user', null);
  const [userData, setUserData] = useKV<any | null>('hogar-belen-user-data', null);
  const [loading, setLoading] = useState(false);

  const value = {
    user,
    userData,
    loading,
    signOut: () => {
      setUser(null);
      setUserData(null);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
