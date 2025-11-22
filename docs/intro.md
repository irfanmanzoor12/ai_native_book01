---
sidebar_position: 1
lessonId: intro-lesson-001
enableTabs: true
---

# Welcome to AI-Native Learning

This platform provides **personalized educational content** powered by AI. Content adapts to your skill level automatically.

## How It Works

### Three Content Views

1. **Original**: The standard lesson content (always available)
2. **Summarize**: AI-generated summary of key concepts (requires sign-in)
3. **Personalized**: Content rewritten for your specific skill level (requires sign-in + onboarding)

### Getting Started

1. **Sign In**: Click the "Sign In" button in the top-right corner
2. **Complete Onboarding**: Tell us about your programming and AI experience
3. **Explore Content**: Switch between tabs to see different content views

## Features

### Adaptive Content

Our AI analyzes your proficiency levels and rewrites content to match:

- **Beginners** get more explanations, analogies, and step-by-step guidance
- **Intermediate** learners see balanced theory and practical examples
- **Experts** receive advanced concepts, optimizations, and edge cases

### Smart Caching

Generated content is cached in the database:
- Summaries are generated once per lesson and shared with all users
- Personalized content is generated per user/lesson combination
- Changed preferences trigger fresh personalization

## Technical Stack

This platform is built with:

- **Docusaurus** - Static site generation
- **Better-Auth** - Authentication with SSO support
- **Neon PostgreSQL** - Serverless database
- **Google Gemini** - AI content generation
- **Vercel** - Serverless deployment

## Try It Out

Click the tabs above to see the different content views. If you're not signed in, you'll be prompted to create an account when accessing AI features.
