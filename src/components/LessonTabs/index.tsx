import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

type TabType = 'original' | 'summarize' | 'personalized';

interface LessonTabsProps {
  lessonId: string;
  originalContent: React.ReactNode;
}

// Helper to get API base URL
// When using vercel dev, API is on same port. When using npm start separately, API is on 3001
const getApiBaseURL = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  // Always use relative URL - works with vercel dev and production
  return '';
};

interface UserPreferences {
  programming_proficiency?: 'beginner' | 'intermediate' | 'expert';
  ai_proficiency?: 'beginner' | 'intermediate' | 'expert';
}

export default function LessonTabs({ lessonId, originalContent }: LessonTabsProps) {
  const [user, setUser] = useState<any>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('original');
  const [summary, setSummary] = useState<string | null>(null);
  const [personalizedContent, setPersonalizedContent] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<TabType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lessonText, setLessonText] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Check auth on mount - prioritize localStorage, verify with API
  useEffect(() => {
    const checkSession = async () => {
      if (typeof window === 'undefined') return;

      // First, check localStorage for immediate UI response
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // Invalid JSON, ignore
        }
      }

      // Also check for stored preferences
      const storedPrefs = localStorage.getItem('userPreferences');
      if (storedPrefs) {
        try {
          setPreferences(JSON.parse(storedPrefs));
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

            // Fetch user preferences
            try {
              const prefsResponse = await fetch(`${apiBase}/api/user/preferences`, {
                credentials: 'include',
              });
              if (prefsResponse.ok) {
                const prefsData = await prefsResponse.json();
                if (prefsData?.preferences) {
                  setPreferences(prefsData.preferences);
                  localStorage.setItem('userPreferences', JSON.stringify(prefsData.preferences));
                }
              }
            } catch (e) {
              console.log('Failed to fetch preferences');
            }
          } else if (data?.session === null) {
            // Explicitly no session - user logged out
            setUser(null);
            setPreferences(null);
            localStorage.removeItem('user');
            localStorage.removeItem('userPreferences');
          }
          // If no explicit session info, keep localStorage state
        } else if (response.status === 401) {
          // Explicitly unauthorized - clear session
          setUser(null);
          setPreferences(null);
          localStorage.removeItem('user');
          localStorage.removeItem('userPreferences');
        }
        // For other errors (500, network), keep localStorage state
      } catch (e) {
        // API not available - keep localStorage state as fallback
        console.log('Session check failed, using localStorage fallback');
      }
    };

    checkSession();
  }, []);

  // Extract lesson text after content renders
  useEffect(() => {
    const extractText = () => {
      if (contentRef.current) {
        const text = contentRef.current.innerText || contentRef.current.textContent || '';
        if (text.trim().length > 50) {
          setLessonText(text);
        }
      }
    };

    // Small delay to ensure content is rendered
    const timer = setTimeout(extractText, 100);
    return () => clearTimeout(timer);
  }, [originalContent]);

  const isAuthenticated = !!user;

  const handleTabClick = async (tab: TabType) => {
    if (tab === 'original') {
      setActiveTab(tab);
      setError(null);
      return;
    }

    if (!isAuthenticated) {
      window.location.href = `/signin?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    setActiveTab(tab);
    setError(null);

    if (tab === 'summarize' && !summary) {
      await fetchSummary();
    } else if (tab === 'personalized' && !personalizedContent) {
      await fetchPersonalized();
    }
  };

  const fetchSummary = async () => {
    setLoadingState('summarize');
    setError(null);

    try {
      if (!lessonText || lessonText.trim().length < 50) {
        throw new Error('Lesson content not ready. Please wait and try again.');
      }

      const apiBase = getApiBaseURL();
      const response = await fetch(`${apiBase}/api/ai/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ lessonId, content: lessonText }),
      });

      if (!response.ok) {
        const text = await response.text();
        let data: any = {};
        try { data = JSON.parse(text); } catch(e) {}
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err: any) {
      console.error('Summary fetch error:', err);
      setError(err.message || 'Failed to load summary');
    } finally {
      setLoadingState(null);
    }
  };

  const fetchPersonalized = async () => {
    setLoadingState('personalized');
    setError(null);

    try {
      if (!lessonText || lessonText.trim().length < 50) {
        throw new Error('Lesson content not ready. Please wait and try again.');
      }

      // Check if user has set their preferences
      if (!preferences?.programming_proficiency || !preferences?.ai_proficiency) {
        window.location.href = '/onboarding';
        return;
      }

      const apiBase = getApiBaseURL();
      const response = await fetch(`${apiBase}/api/ai/personalize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          lessonId,
          content: lessonText,
          programming_proficiency: preferences.programming_proficiency,
          ai_proficiency: preferences.ai_proficiency,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        let data: any = {};
        try { data = JSON.parse(text); } catch(e) {}

        if (data.needsOnboarding) {
          window.location.href = '/onboarding';
          return;
        }
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setPersonalizedContent(data.content);
    } catch (err: any) {
      console.error('Personalized fetch error:', err);
      setError(err.message || 'Failed to load personalized content');
    } finally {
      setLoadingState(null);
    }
  };

  const renderAIContent = () => {
    if (loadingState) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>
            {loadingState === 'summarize'
              ? 'Generating summary...'
              : 'Personalizing content for your level...'}
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => {
              if (activeTab === 'summarize') {
                fetchSummary();
              } else {
                fetchPersonalized();
              }
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    if (activeTab === 'summarize' && summary) {
      return (
        <div className={styles.aiContent}>
          <div className={styles.contentBadge}>
            <span>AI Summary</span>
          </div>
          <div
            className={styles.markdownContent}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(summary) }}
          />
        </div>
      );
    }

    if (activeTab === 'personalized' && personalizedContent) {
      return (
        <div className={styles.aiContent}>
          <div className={styles.contentBadge}>
            <span>Personalized Content</span>
          </div>
          <div
            className={styles.markdownContent}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(personalizedContent) }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${activeTab === 'original' ? styles.active : ''}`}
          onClick={() => handleTabClick('original')}
        >
          Original
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'summarize' ? styles.active : ''} ${
            !isAuthenticated ? styles.locked : ''
          }`}
          onClick={() => handleTabClick('summarize')}
        >
          {!isAuthenticated && <LockIcon />}
          Summarize
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'personalized' ? styles.active : ''} ${
            !isAuthenticated ? styles.locked : ''
          }`}
          onClick={() => handleTabClick('personalized')}
        >
          {!isAuthenticated && <LockIcon />}
          Personalized
        </button>
      </div>

      {/* Original content - always in DOM for text extraction */}
      <div
        ref={contentRef}
        className={styles.content}
        style={{ display: activeTab === 'original' ? 'block' : 'none' }}
      >
        {originalContent}
      </div>

      {/* AI content */}
      {activeTab !== 'original' && (
        <div className={styles.content}>
          {renderAIContent()}
        </div>
      )}
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      className={styles.lockIcon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />');
}
