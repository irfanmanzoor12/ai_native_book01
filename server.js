// Local development server for API routes
// Run with: node server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { betterAuth } = require('better-auth');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Database connection using pg Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Initialize Better-Auth with pg Pool
const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
  // Use frontend URL as baseURL so cookies are set for the correct domain
  baseURL: 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
  advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      sameSite: 'lax',
      secure: false, // false for localhost
      path: '/',
    },
    // Disable CSRF check for local development (proxy changes origin header)
    disableCSRFCheck: process.env.NODE_ENV !== 'production',
  },
});

// Auth routes handler - use regex for Express 5 compatibility
app.all(/^\/api\/auth\/.*/, async (req, res) => {
  // Use the frontend URL for the request since that's where cookies should be set
  const url = new URL(req.url, 'http://localhost:3000');

  const headers = new Headers();
  Object.entries(req.headers).forEach(([key, value]) => {
    if (value) headers.set(key, Array.isArray(value) ? value[0] : value);
  });

  // Ensure origin is set to frontend for CORS/cookie purposes
  headers.set('origin', 'http://localhost:3000');

  const webRequest = new Request(url.toString(), {
    method: req.method,
    headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });

  try {
    const response = await auth.handler(webRequest);

    // Handle cookies FIRST - extract before iterating headers
    const setCookieHeader = response.headers.get('set-cookie');
    const cookies = response.headers.getSetCookie ? response.headers.getSetCookie() : null;

    // Set response headers (skip set-cookie, we'll handle it separately)
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'set-cookie') {
        res.setHeader(key, value);
      }
    });

    // Handle cookies properly - ensure they work on localhost:3000
    if (cookies && cookies.length > 0) {
      // Modify cookies to ensure they work through the proxy
      const modifiedCookies = cookies.map(cookie => {
        // Remove any Domain attribute and ensure Path is /
        let modified = cookie
          .replace(/Domain=[^;]+;?\s*/gi, '')
          .replace(/Secure;?\s*/gi, ''); // Remove Secure for localhost

        // Ensure SameSite=Lax for cross-port requests
        if (!modified.toLowerCase().includes('samesite')) {
          modified += '; SameSite=Lax';
        }

        // Ensure Path=/
        if (!modified.toLowerCase().includes('path=')) {
          modified += '; Path=/';
        }

        return modified;
      });

      res.setHeader('Set-Cookie', modifiedCookies);
      console.log('Setting cookies:', modifiedCookies);
    } else if (setCookieHeader) {
      // Fallback for environments where getSetCookie doesn't work
      console.log('Setting cookie (fallback):', setCookieHeader);
      res.setHeader('Set-Cookie', setCookieHeader);
    }

    res.status(response.status);
    const body = await response.text();
    if (body) {
      res.send(body);
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// User preferences endpoint
app.get('/api/user/preferences', async (req, res) => {
  try {
    // For now, return empty preferences
    res.json({ preferences: null, needsOnboarding: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/user/preferences', async (req, res) => {
  try {
    const { ai_proficiency, programming_proficiency } = req.body;
    res.json({ success: true, preferences: { ai_proficiency, programming_proficiency } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: !!process.env.DATABASE_URL });
});

// Demo lesson content (in production, this would come from database or files)
const lessonContentDemo = {
  'intro': `# Introduction to AI Native Software Development

This course teaches you to build intelligent systems using AI as a core component rather than just a tool.

## The AI Development Spectrum

1. **AI Assisted** - AI enhances productivity through code completion and debugging
2. **AI Driven** - AI generates significant code from specifications; developers act as architects
3. **AI Native** - Applications where LLMs and agents are fundamental functional components

## Key Concepts

- Co-learning with AI agents as partners, not just tools
- Bilingual stack mastery (Python for intelligence, TypeScript for interaction)
- Specification-driven methodology executable by both humans and AI
- Production-ready architecture using cloud-native technologies`,

  'default': `This is a lesson about AI Native Software Development.

The content covers important concepts about building modern applications with AI at their core.`
};

// AI Summarize endpoint
app.post('/api/ai/summarize', async (req, res) => {
  try {
    const { lessonId, content } = req.body;

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return res.status(500).json({ error: 'AI service not configured' });
    }

    // Use content from request, fallback to demo content
    const lessonContent = content || lessonContentDemo[lessonId] || lessonContentDemo['default'];

    if (!lessonContent || lessonContent.trim().length < 50) {
      return res.status(400).json({ error: 'Lesson content is required' });
    }

    // Call Google Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + process.env.GOOGLE_GENERATIVE_AI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are summarizing a lesson that is part of a course on AI-Native Software Development.
This lesson may be part of a larger chapter or section.

Please provide a clear, concise summary of this lesson content:
- Start with a 1-2 sentence overview of what this lesson teaches
- List 3-5 key takeaways as bullet points
- Keep the total summary under 200 words
- Focus on the most important concepts and practical applications

Lesson Content:
${lessonContent}`
          }]
        }]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate summary';

    res.json({ summary });
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate summary' });
  }
});

// Helper function to get personalization prompt based on proficiency levels
function getPersonalizationPrompt(programmingLevel, aiLevel) {
  const programmingDescriptions = {
    beginner: 'someone who is new to programming. Explain code concepts from scratch, use simple analogies, and avoid jargon.',
    intermediate: 'someone with moderate programming experience. They understand basic concepts but may need clarification on advanced patterns.',
    expert: 'an experienced programmer. Focus on nuances, best practices, and advanced implementation details.'
  };

  const aiDescriptions = {
    beginner: 'new to AI/ML concepts. Explain AI terminology, how models work at a high level, and provide intuitive explanations.',
    intermediate: 'familiar with basic AI concepts. They understand what LLMs are but may need help with advanced topics like fine-tuning or prompt engineering.',
    expert: 'well-versed in AI/ML. Focus on cutting-edge techniques, optimization strategies, and technical depth.'
  };

  const progDesc = programmingDescriptions[programmingLevel] || programmingDescriptions.intermediate;
  const aiDesc = aiDescriptions[aiLevel] || aiDescriptions.intermediate;

  return `Adapt this lesson for a learner who is:
- Programming: ${progDesc}
- AI Knowledge: ${aiDesc}

Guidelines:
- Adjust technical depth and vocabulary to match their levels
- For beginners: add more context, analogies, and step-by-step explanations
- For intermediates: balance explanation with practical application
- For experts: focus on advanced concepts, edge cases, and optimization
- Keep the core information intact but present it appropriately for their level`;
}

// AI Personalize endpoint
app.post('/api/ai/personalize', async (req, res) => {
  try {
    const { lessonId, content, programming_proficiency, ai_proficiency } = req.body;

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return res.status(500).json({ error: 'AI service not configured' });
    }

    // Use content from request, fallback to demo content
    const lessonContent = content || lessonContentDemo[lessonId] || lessonContentDemo['default'];

    if (!lessonContent || lessonContent.trim().length < 50) {
      return res.status(400).json({ error: 'Lesson content is required' });
    }

    // Get proficiency levels (default to intermediate if not provided)
    const progLevel = programming_proficiency || 'intermediate';
    const aiLevel = ai_proficiency || 'intermediate';

    // If no preferences provided at all, prompt user to set them
    if (!programming_proficiency && !ai_proficiency) {
      return res.status(400).json({
        error: 'Please set your proficiency levels first',
        needsOnboarding: true
      });
    }

    const personalizationPrompt = getPersonalizationPrompt(progLevel, aiLevel);

    // Call Google Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + process.env.GOOGLE_GENERATIVE_AI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are personalizing educational content about AI-Native Software Development.

${personalizationPrompt}

Original Lesson Content:
${lessonContent}

Please rewrite this lesson content adapted for this learner's proficiency levels. Maintain the same topics but adjust the presentation, examples, and depth accordingly.`
          }]
        }]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      throw new Error('Failed to personalize content');
    }

    const data = await response.json();
    const personalizedContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to personalize content';

    res.json({ content: personalizedContent });
  } catch (error) {
    console.error('Personalize error:', error);
    res.status(500).json({ error: error.message || 'Failed to personalize content' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 API Server running at http://localhost:${PORT}`);
  console.log(`\n📋 Environment check:`);
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✓ Set' : '✗ Missing'}`);
  console.log(`   BETTER_AUTH_SECRET: ${process.env.BETTER_AUTH_SECRET ? '✓ Set' : '✗ Missing'}`);
  console.log(`   GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? '✓ Set' : '✗ Missing'}`);
  console.log(`   GOOGLE_GENERATIVE_AI_API_KEY: ${process.env.GOOGLE_GENERATIVE_AI_API_KEY ? '✓ Set' : '✗ Missing'}`);
  console.log(`\n💡 Make sure Docusaurus is running on http://localhost:3000`);
});
