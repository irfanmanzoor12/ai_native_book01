import { createAuthClient } from 'better-auth/react';

// Use relative URLs - works with vercel dev and production
// Both frontend and API are served from the same origin
const getBaseURL = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  // Always use same origin (works with vercel dev and production)
  return '';
};

// Client-side auth helper for React/Docusaurus
export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

// Type for user preferences
export interface UserPreferences {
  ai_proficiency: 'beginner' | 'intermediate' | 'expert';
  programming_proficiency: 'beginner' | 'intermediate' | 'expert';
}

// Helper function to check if user needs onboarding
export function needsOnboarding(user: any): boolean {
  return !user?.preferences ||
    !user.preferences.ai_proficiency ||
    !user.preferences.programming_proficiency;
}
