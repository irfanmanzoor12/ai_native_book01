import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import styles from './signin.module.css';

export default function SignInPage() {
  const history = useHistory();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get redirect URL from query params
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/docs';

  // Use relative URLs (works with vercel dev and production)
  const API_BASE = '';

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const endpoint = isSignUp
        ? `${API_BASE}/api/auth/sign-up/email`
        : `${API_BASE}/api/auth/sign-in/email`;

      const body = isSignUp
        ? { email, password, name: name || email.split('@')[0] }
        : { email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const text = await response.text();

      if (!response.ok) {
        let errorMessage = 'Authentication failed';
        if (text) {
          try {
            const data = JSON.parse(text);
            errorMessage = data.message || data.error || text;
          } catch (e) {
            // The response is not JSON, so use the raw text.
            errorMessage = text;
          }
        }
        throw new Error(errorMessage);
      }

      let data: any = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.log('Successful response is not JSON:', text);
        }
      }

      // Store user info in localStorage for simple auth tracking
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      setSuccess(isSignUp ? 'Account created! Redirecting...' : 'Signed in! Redirecting...');

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);

    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title={isSignUp ? 'Create Account' : 'Sign In'}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className={styles.subtitle}>
            {isSignUp
              ? 'Start your personalized learning journey'
              : 'Sign in to access personalized content'}
          </p>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className={styles.form}>
            {isSignUp && (
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                disabled={isSubmitting}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Please wait...'
                : isSignUp
                ? 'Create Account'
                : 'Sign In'}
            </button>
          </form>

          <p className={styles.switchMode}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              className={styles.switchButton}
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setSuccess(null);
              }}
              disabled={isSubmitting}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
}
