import React from 'react';
import { AuthProvider } from '../context/AuthContext';

// Root component wraps the entire app with AuthProvider
export default function Root({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
