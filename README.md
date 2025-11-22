# AI-Native Learning Platform

A Docusaurus-based educational platform with multi-tenancy, authentication, and AI-driven content customization.

## Features

- **Multi-tenancy**: Row Level Security (RLS) for data isolation
- **Authentication**: Better-Auth with Google/GitHub SSO
- **AI Customization**: Content summarization and personalization via Google Gemini
- **Three Content Views**: Original, Summarized, and Personalized tabs for each lesson

## Tech Stack

- **Frontend**: Docusaurus 3.x (React + TypeScript)
- **Authentication**: Better-Auth with SSO support
- **Database**: Neon PostgreSQL (Serverless)
- **AI**: Google Gemini 1.5 Flash (Free tier)
- **Deployment**: Vercel (Serverless Functions)

## Project Structure

```
ai-native-book/
├── api/                    # Vercel Serverless Functions
│   ├── auth/              # Authentication endpoints
│   ├── ai/                # AI generation endpoints
│   └── user/              # User preferences endpoints
├── db/
│   ├── schema.sql         # PostgreSQL schema
│   └── seed.sql           # Sample data
├── docs/                  # Docusaurus documentation
├── src/
│   ├── components/        # React components
│   ├── context/           # React Context (AuthContext)
│   ├── lib/               # Utilities (auth, db)
│   ├── pages/             # Custom pages (signin, onboarding)
│   └── theme/             # Docusaurus theme overrides
└── ...
```

## Setup

### 1. Clone and Install

```bash
cd ai-native-book
npm install
```

### 2. Create Neon Database

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

### 3. Run Database Schema

```sql
-- Run in Neon SQL Editor
-- Copy contents of db/schema.sql
-- Then run db/seed.sql for sample data
```

### 4. Configure Environment Variables

Create `.env` file (copy from `.env.example`):

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# Better-Auth
BETTER_AUTH_SECRET=your-secret-key-at-least-32-characters-long
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (for SSO)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key

# Default Tenant ID
DEFAULT_TENANT_ID=00000000-0000-0000-0000-000000000001
```

### 5. Get API Keys

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

**Google Gemini:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key

### 6. Run Development Server

```bash
npm start
```

Visit `http://localhost:3000`

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/ai-native-book.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy

### 3. Update OAuth Redirect URLs

Update Google/GitHub OAuth settings with your Vercel domain:
- `https://your-domain.vercel.app/api/auth/callback/google`
- `https://your-domain.vercel.app/api/auth/callback/github`

## Usage

### Adding Lessons with AI Features

Add frontmatter to your docs:

```markdown
---
sidebar_position: 1
lessonId: unique-lesson-id
enableTabs: true
---

# Your Lesson Title

Content here...
```

- `lessonId`: Unique identifier (used for caching AI content)
- `enableTabs`: Set to `false` to disable AI tabs for this doc

### Content Flow

1. **Unauthenticated Users**: See "Original" tab only
2. **Authenticated Users**: Can access "Summarize" tab
3. **Users with Preferences**: Can access "Personalized" tab

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...all]` | ALL | Better-Auth handler |
| `/api/user/preferences` | GET/POST | User preferences |
| `/api/ai/summarize` | POST | Generate lesson summary |
| `/api/ai/personalize` | POST | Generate personalized content |

## Database Schema

See `db/schema.sql` for full schema. Key tables:

- `tenants` - Organizations
- `users` - User accounts with preferences
- `lessons` - Lesson content and summaries
- `personalized_content` - Cached personalized versions

## License

MIT
