import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Types
export interface UserPreferences {
  ai_proficiency: 'beginner' | 'intermediate' | 'expert';
  programming_proficiency: 'beginner' | 'intermediate' | 'expert';
}

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  preferences?: UserPreferences;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  needsOnboarding: boolean;
  preferences: UserPreferences | null;
  signIn: (provider: 'google' | 'github' | 'credentials', credentials?: { email: string; password: string }) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [authClient, setAuthClient] = useState<any>(null);

  const isAuthenticated = !!user;
  const needsOnboarding = isAuthenticated && (
    !preferences?.ai_proficiency || !preferences?.programming_proficiency
  );

  // Initialize auth client only on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../lib/auth-client').then((module) => {
        setAuthClient(module.authClient);
      });
    }
  }, []);

  // Fetch session when auth client is ready
  useEffect(() => {
    if (authClient) {
      refreshSession();
    } else if (typeof window === 'undefined') {
      // Server-side: just set loading to false
      setIsLoading(false);
    }
  }, [authClient]);

  const refreshSession = async () => {
    if (!authClient) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const session = await authClient.getSession();
      if (session?.user) {
        setUser(session.user as User);
        // Fetch preferences from API (use relative URL - works with vercel dev and production)
        const apiBase = '';
        try {
          const response = await fetch(`${apiBase}/api/user/preferences`, {
            credentials: 'include',
          });
          if (response.ok) {
            const data = await response.json();
            setPreferences(data.preferences);
          }
        } catch (e) {
          // API not available yet (dev mode without backend)
          console.log('Preferences API not available');
        }
      } else {
        setUser(null);
        setPreferences(null);
      }
    } catch (error) {
      console.error('Session fetch error:', error);
      setUser(null);
      setPreferences(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (
    provider: 'google' | 'github' | 'credentials',
    credentials?: { email: string; password: string }
  ) => {
    if (!authClient) throw new Error('Auth not initialized');

    try {
      if (provider === 'credentials' && credentials) {
        await authClient.signIn.email({
          email: credentials.email,
          password: credentials.password,
        });
      } else if (provider === 'google') {
        await authClient.signIn.social({
          provider: 'google',
          callbackURL: window.location.origin + '/onboarding',
        });
      } else if (provider === 'github') {
        await authClient.signIn.social({
          provider: 'github',
          callbackURL: window.location.origin + '/onboarding',
        });
      }
      await refreshSession();
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    if (!authClient) throw new Error('Auth not initialized');

    try {
      await authClient.signUp.email({
        email,
        password,
        name: name || email.split('@')[0],
      });
      await refreshSession();
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    if (!authClient) throw new Error('Auth not initialized');

    try {
      await authClient.signOut();
      setUser(null);
      setPreferences(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const updatePreferences = async (newPreferences: UserPreferences) => {
    try {
      // Use relative URLs (works with vercel dev and production)
      const response = await fetch(`/api/user/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newPreferences),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      setPreferences(newPreferences);

      // Also store in localStorage for components that don't use AuthContext
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      }
    } catch (error) {
      console.error('Update preferences error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        needsOnboarding,
        preferences,
        signIn,
        signUp,
        signOut,
        updatePreferences,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
