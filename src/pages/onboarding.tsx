import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '../context/AuthContext';
import { useHistory } from '@docusaurus/router';
import styles from './onboarding.module.css';

type ProficiencyLevel = 'beginner' | 'intermediate' | 'expert';

export default function OnboardingPage() {
  const { user, isLoading, isAuthenticated, needsOnboarding, updatePreferences } = useAuth();
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [programmingLevel, setProgrammingLevel] = useState<ProficiencyLevel | null>(null);
  const [aiLevel, setAiLevel] = useState<ProficiencyLevel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated or already completed onboarding
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        history.push('/signin');
      } else if (!needsOnboarding) {
        history.push('/docs');
      }
    }
  }, [isLoading, isAuthenticated, needsOnboarding, history]);

  const handleNext = () => {
    if (step === 1 && programmingLevel) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async () => {
    if (!programmingLevel || !aiLevel) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await updatePreferences({
        programming_proficiency: programmingLevel,
        ai_proficiency: aiLevel,
      });
      history.push('/docs');
    } catch (err) {
      setError('Failed to save preferences. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Welcome - Set Your Preferences">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>

          <h1 className={styles.title}>
            {step === 1 ? 'Welcome! Let\'s personalize your experience' : 'Almost there!'}
          </h1>

          <p className={styles.subtitle}>
            {step === 1
              ? 'What\'s your programming experience level?'
              : 'What\'s your experience with AI and Machine Learning?'}
          </p>

          {step === 1 ? (
            <div className={styles.options}>
              <OptionCard
                title="Beginner"
                description="I'm new to programming or just getting started"
                icon="🌱"
                selected={programmingLevel === 'beginner'}
                onClick={() => setProgrammingLevel('beginner')}
              />
              <OptionCard
                title="Intermediate"
                description="I know the basics and have built some projects"
                icon="🚀"
                selected={programmingLevel === 'intermediate'}
                onClick={() => setProgrammingLevel('intermediate')}
              />
              <OptionCard
                title="Expert"
                description="I'm experienced and comfortable with advanced concepts"
                icon="⚡"
                selected={programmingLevel === 'expert'}
                onClick={() => setProgrammingLevel('expert')}
              />
            </div>
          ) : (
            <div className={styles.options}>
              <OptionCard
                title="Beginner"
                description="I'm new to AI and want to learn the fundamentals"
                icon="🤖"
                selected={aiLevel === 'beginner'}
                onClick={() => setAiLevel('beginner')}
              />
              <OptionCard
                title="Intermediate"
                description="I understand basic AI concepts and have used some tools"
                icon="🧠"
                selected={aiLevel === 'intermediate'}
                onClick={() => setAiLevel('intermediate')}
              />
              <OptionCard
                title="Expert"
                description="I have deep knowledge of ML models and architectures"
                icon="🎯"
                selected={aiLevel === 'expert'}
                onClick={() => setAiLevel('expert')}
              />
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttons}>
            {step === 2 && (
              <button
                className={styles.backButton}
                onClick={handleBack}
                disabled={isSubmitting}
              >
                Back
              </button>
            )}

            {step === 1 ? (
              <button
                className={styles.nextButton}
                onClick={handleNext}
                disabled={!programmingLevel}
              >
                Next
              </button>
            ) : (
              <button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={!aiLevel || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Start Learning'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface OptionCardProps {
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

function OptionCard({ title, description, icon, selected, onClick }: OptionCardProps) {
  return (
    <div
      className={`${styles.optionCard} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <span className={styles.icon}>{icon}</span>
      <h3 className={styles.optionTitle}>{title}</h3>
      <p className={styles.optionDescription}>{description}</p>
    </div>
  );
}
