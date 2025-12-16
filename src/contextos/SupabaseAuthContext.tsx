import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useKV } from '@github/spark/hooks';

interface User {
  id: string;
  email: string;
  avatarUrl?: string;
  login: string;
}

interface UserData {
  id: string;
  email: string;
  full_name: string;
  role: 'family' | 'professional';
  plan?: string;
  photo_url?: string;
  phone?: string;
}

interface Session {
  user: User;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, role: 'family' | 'professional') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserData>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentSession, setCurrentSession] = useKV<Session | null>('auth-session', null);
  const [profiles, setProfiles] = useKV<Record<string, UserData>>('user-profiles', {});
  const [loading, setLoading] = useState(false);

  const user = currentSession?.user ?? null;
  const userData = user && profiles ? profiles[user.id] ?? null : null;

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const existingProfiles = await window.spark.kv.get<Record<string, UserData>>('user-profiles') ?? {};
      const userProfile = Object.values(existingProfiles).find((p: UserData) => p.email === email);
      
      if (!userProfile) {
        return { error: new Error('Usuario no encontrado') };
      }

      const passwords = await window.spark.kv.get<Record<string, string>>('user-passwords') ?? {};
      if (passwords[userProfile.id] !== password) {
        return { error: new Error('Contraseña incorrecta') };
      }

      const newSession: Session = {
        user: {
          id: userProfile.id,
          email: userProfile.email,
          login: userProfile.full_name,
          avatarUrl: userProfile.photo_url,
        },
        accessToken: `token-${Date.now()}`,
      };

      setCurrentSession(newSession);
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: 'family' | 'professional'
  ) => {
    try {
      setLoading(true);

      const existingProfiles = await window.spark.kv.get<Record<string, UserData>>('user-profiles') ?? {};
      
      if (Object.values(existingProfiles).some((p: UserData) => p.email === email)) {
        return { error: new Error('El correo electrónico ya está registrado') };
      }

      const userId = `user-${Date.now()}`;
      const newUserData: UserData = {
        id: userId,
        email,
        full_name: fullName,
        role,
      };

      await setProfiles((current) => ({
        ...(current || {}),
        [userId]: newUserData,
      }));

      const passwords = await window.spark.kv.get<Record<string, string>>('user-passwords') ?? {};
      await window.spark.kv.set('user-passwords', {
        ...passwords,
        [userId]: password,
      });

      const newSession: Session = {
        user: {
          id: userId,
          email,
          login: fullName,
        },
        accessToken: `token-${Date.now()}`,
      };

      setCurrentSession(newSession);
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setCurrentSession(null);
  };

  const updateProfile = async (updates: Partial<UserData>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      await setProfiles((current) => {
        const existingProfile = (current || {})[user.id];
        return {
          ...(current || {}),
          [user.id]: {
            ...existingProfile,
            ...updates,
          },
        };
      });

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const value: AuthContextType = {
    user,
    userData,
    loading,
    session: currentSession ?? null,
    signIn,
    signUp,
    signOut,
    updateProfile,
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
