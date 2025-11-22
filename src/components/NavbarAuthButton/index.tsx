import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

// Helper to get API base URL - use relative URLs (works with vercel dev and production)
const getApiBaseURL = () => {
  return '';
};

// Wrapper component that only renders on client-side
export default function NavbarAuthButton() {
  return (
    <BrowserOnly fallback={<div className={styles.container}><div className={styles.skeleton}></div></div>}>
      {() => <NavbarAuthButtonClient />}
    </BrowserOnly>
  );
}

// Client-only component with simple auth logic
function NavbarAuthButtonClient() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch session from better-auth on mount
  useEffect(() => {
    const checkSession = async () => {
      // First, check localStorage for immediate UI response
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // Invalid JSON, ignore
        }
      }

      try {
        const apiBase = getApiBaseURL();
        const response = await fetch(`${apiBase}/api/auth/session`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          } else if (data?.session === null) {
            // Explicitly no session - user is logged out
            setUser(null);
            localStorage.removeItem('user');
          }
          // If response is ok but no explicit session info, keep localStorage state
        } else if (response.status === 401) {
          // Explicitly unauthorized - clear session
          setUser(null);
          localStorage.removeItem('user');
        }
        // For other errors (500, network), keep localStorage state as fallback
      } catch (e) {
        // Network error - keep localStorage state as fallback
        console.log('Session check failed, using localStorage fallback');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleSignIn = () => {
    window.location.href = '/signin';
  };

  const handleSignOut = async () => {
    localStorage.removeItem('user');
    setUser(null);

    const apiBase = getApiBaseURL();
    // Clear any cookies by calling the API
    try {
      await fetch(`${apiBase}/api/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      console.error('Sign out error:', e);
    }
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className={styles.container}>
        <div className={styles.userMenu}>
          <div className={styles.avatarPlaceholder}>
            {(user?.name || user?.email || 'U')[0].toUpperCase()}
          </div>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.signInButton} onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}
