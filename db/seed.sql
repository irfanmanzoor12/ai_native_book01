-- Seed Data for AI-Native Educational Platform
-- Run this after schema.sql

-- Use default tenant ID
DO $$
DECLARE
    tenant_uuid UUID := '00000000-0000-0000-0000-000000000001';
    book_uuid UUID;
    chapter1_uuid UUID;
    chapter2_uuid UUID;
    chapter3_uuid UUID;
BEGIN
    -- Create a sample book
    INSERT INTO books (id, tenant_id, title, description, slug, is_published)
    VALUES (
        uuid_generate_v4(),
        tenant_uuid,
        'Introduction to AI-Native Development',
        'Learn how to build applications that leverage AI capabilities from the ground up.',
        'intro-ai-native-dev',
        TRUE
    ) RETURNING id INTO book_uuid;

    -- Chapter 1: Foundations
    INSERT INTO chapters (id, tenant_id, book_id, title, slug, order_index)
    VALUES (
        uuid_generate_v4(),
        tenant_uuid,
        book_uuid,
        'Foundations of AI-Native Development',
        'foundations',
        1
    ) RETURNING id INTO chapter1_uuid;

    -- Lessons for Chapter 1
    INSERT INTO lessons (tenant_id, chapter_id, title, slug, content, order_index)
    VALUES
    (
        tenant_uuid,
        chapter1_uuid,
        'What is AI-Native Development?',
        'what-is-ai-native',
        E'# What is AI-Native Development?\n\nAI-Native development is an approach to building software where artificial intelligence is not just an add-on feature, but a fundamental component of the application''s architecture and user experience.\n\n## Key Principles\n\n### 1. AI-First Design\nInstead of adding AI capabilities to existing applications, AI-native apps are designed from the ground up to leverage machine learning and large language models.\n\n### 2. Adaptive User Experiences\nThe application learns from user behavior and adapts its interface, content, and functionality accordingly.\n\n### 3. Intelligent Automation\nRoutine tasks are automatically handled by AI, freeing users to focus on higher-value activities.\n\n## Why AI-Native Matters\n\nTraditional software development follows a deterministic approach where every possible scenario must be explicitly programmed. AI-native development, however, embraces probabilistic computing where the system can handle novel situations it wasn''t explicitly programmed for.\n\n### Benefits\n- **Personalization at Scale**: Each user gets a tailored experience\n- **Reduced Development Time**: AI handles edge cases automatically\n- **Continuous Improvement**: Systems get better with more data\n- **Natural Interfaces**: Users can interact using natural language\n\n## Example Use Cases\n\n1. **Content Platforms**: Automatically summarizing and personalizing educational content\n2. **Customer Service**: Intelligent chatbots that truly understand context\n3. **Development Tools**: AI pair programmers that understand your codebase\n4. **Healthcare**: Diagnostic tools that learn from millions of cases',
        1
    ),
    (
        tenant_uuid,
        chapter1_uuid,
        'Setting Up Your AI Development Environment',
        'setup-environment',
        E'# Setting Up Your AI Development Environment\n\nBefore we start building AI-native applications, we need to set up a proper development environment.\n\n## Prerequisites\n\n### Hardware Requirements\n- **Minimum**: 8GB RAM, modern CPU\n- **Recommended**: 16GB+ RAM, GPU for local model inference\n\n### Software Requirements\n- Node.js 18+ or Python 3.9+\n- Git for version control\n- A code editor (VS Code recommended)\n\n## Step 1: Install Node.js\n\n```bash\n# Using nvm (recommended)\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash\nnvm install 20\nnvm use 20\n```\n\n## Step 2: Set Up API Keys\n\nYou''ll need API keys from AI providers:\n\n### Google Gemini (Free Tier)\n1. Go to https://makersuite.google.com/app/apikey\n2. Create a new API key\n3. Add to your `.env` file:\n\n```env\nGOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here\n```\n\n## Step 3: Install AI SDK\n\n```bash\nnpm install ai @ai-sdk/google\n```\n\n## Step 4: Create Your First AI Script\n\n```typescript\nimport { generateText } from ''ai'';\nimport { google } from ''@ai-sdk/google'';\n\nconst { text } = await generateText({\n  model: google(''gemini-1.5-flash''),\n  prompt: ''Explain AI-native development in one sentence.'',\n});\n\nconsole.log(text);\n```\n\n## Environment Variables Best Practices\n\n- Never commit `.env` files to version control\n- Use different keys for development and production\n- Rotate keys regularly\n- Set up rate limiting to avoid unexpected costs',
        2
    ),
    (
        tenant_uuid,
        chapter1_uuid,
        'Understanding Large Language Models',
        'understanding-llms',
        E'# Understanding Large Language Models\n\nLarge Language Models (LLMs) are the foundation of modern AI-native applications. Let''s understand how they work.\n\n## What is an LLM?\n\nAn LLM is a neural network trained on vast amounts of text data to understand and generate human language. Popular examples include:\n\n- **GPT-4** (OpenAI)\n- **Claude** (Anthropic)\n- **Gemini** (Google)\n- **Llama** (Meta)\n\n## How LLMs Work\n\n### 1. Tokenization\nText is broken down into tokens (roughly word pieces):\n```\n"Hello, world!" → ["Hello", ",", " world", "!"]\n```\n\n### 2. Embedding\nTokens are converted to numerical vectors that capture semantic meaning.\n\n### 3. Attention Mechanism\nThe model weighs relationships between all tokens to understand context.\n\n### 4. Generation\nThe model predicts the next most likely token, repeatedly, to generate responses.\n\n## Key Concepts\n\n### Temperature\nControls randomness in outputs:\n- **0.0**: Deterministic, always same output\n- **0.7**: Balanced creativity\n- **1.0+**: More random/creative\n\n### Context Window\nThe maximum amount of text the model can "see" at once:\n- GPT-4: 128K tokens\n- Gemini 1.5: 1M tokens\n- Claude 3: 200K tokens\n\n### Tokens vs Words\nRoughly: 1 token ≈ 0.75 words (English)\n\n## Prompt Engineering Basics\n\n```typescript\n// Bad prompt\n"Write something about cats"\n\n// Good prompt\n"Write a 100-word paragraph explaining why cats make good pets for apartment dwellers. Focus on their independent nature and low space requirements."\n```\n\n## Limitations to Remember\n\n1. **Hallucinations**: LLMs can generate plausible but false information\n2. **Knowledge Cutoff**: Training data has a cutoff date\n3. **No True Understanding**: Pattern matching, not reasoning\n4. **Context Limitations**: Can''t remember previous conversations (by default)',
        3
    );

    -- Chapter 2: Building AI Features
    INSERT INTO chapters (id, tenant_id, book_id, title, slug, order_index)
    VALUES (
        uuid_generate_v4(),
        tenant_uuid,
        book_uuid,
        'Building AI-Powered Features',
        'building-ai-features',
        2
    ) RETURNING id INTO chapter2_uuid;

    -- Lessons for Chapter 2
    INSERT INTO lessons (tenant_id, chapter_id, title, slug, content, order_index)
    VALUES
    (
        tenant_uuid,
        chapter2_uuid,
        'Text Summarization',
        'text-summarization',
        E'# Text Summarization with AI\n\nSummarization is one of the most practical AI features you can add to an application.\n\n## Types of Summarization\n\n### Extractive Summarization\nSelects and combines existing sentences from the source text.\n- Pros: Preserves original wording\n- Cons: Can feel choppy\n\n### Abstractive Summarization\nGenerates new text that captures the main ideas.\n- Pros: More natural, concise\n- Cons: May introduce errors\n\n## Implementation with Gemini\n\n```typescript\nimport { generateText } from ''ai'';\nimport { google } from ''@ai-sdk/google'';\n\nasync function summarizeText(content: string): Promise<string> {\n  const { text } = await generateText({\n    model: google(''gemini-1.5-flash''),\n    prompt: `Summarize the following text in 2-3 paragraphs. \nFocus on the key concepts and main takeaways.\n\nText to summarize:\n${content}`,\n    temperature: 0.3, // Lower temperature for consistency\n  });\n  \n  return text;\n}\n```\n\n## Best Practices\n\n### 1. Set Clear Expectations\n```typescript\nconst prompt = `Create a summary that:\n- Is approximately 150 words\n- Includes the main argument\n- Lists key supporting points\n- Uses simple language`;\n```\n\n### 2. Handle Long Documents\nFor documents exceeding context limits:\n1. Split into chunks\n2. Summarize each chunk\n3. Combine summaries\n4. Create final summary\n\n### 3. Cache Results\n```typescript\n// Check database first\nconst cached = await db.query(\n  ''SELECT summary FROM lessons WHERE id = $1 AND is_summary_generated = true'',\n  [lessonId]\n);\n\nif (cached.rows[0]?.summary) {\n  return cached.rows[0].summary;\n}\n\n// Generate and cache\nconst summary = await summarizeText(content);\nawait db.query(\n  ''UPDATE lessons SET summary = $1, is_summary_generated = true WHERE id = $2'',\n  [summary, lessonId]\n);\n```\n\n## Quality Metrics\n\n- **ROUGE Score**: Measures overlap with reference summaries\n- **Coherence**: Does it flow logically?\n- **Relevance**: Are key points included?\n- **Conciseness**: Is it appropriately shortened?',
        1
    ),
    (
        tenant_uuid,
        chapter2_uuid,
        'Content Personalization',
        'content-personalization',
        E'# Content Personalization\n\nPersonalization transforms generic content into tailored experiences for each user.\n\n## Why Personalize?\n\n- **Improved Comprehension**: Match content to user''s level\n- **Increased Engagement**: Relevant content keeps users interested\n- **Better Learning Outcomes**: Adaptive difficulty enhances retention\n\n## User Proficiency Levels\n\n### Programming Proficiency\n| Level | Characteristics |\n|-------|----------------|\n| Beginner | New to coding, needs detailed explanations |\n| Intermediate | Knows basics, ready for deeper concepts |\n| Expert | Advanced, wants optimization and edge cases |\n\n### AI Proficiency\n| Level | Characteristics |\n|-------|----------------|\n| Beginner | New to AI, needs analogies and simple terms |\n| Intermediate | Understands basics, ready for implementation |\n| Expert | Deep knowledge, wants advanced techniques |\n\n## Implementation\n\n```typescript\ninterface UserPreferences {\n  ai_proficiency: ''beginner'' | ''intermediate'' | ''expert'';\n  programming_proficiency: ''beginner'' | ''intermediate'' | ''expert'';\n}\n\nasync function personalizeContent(\n  content: string,\n  preferences: UserPreferences\n): Promise<string> {\n  const { text } = await generateText({\n    model: google(''gemini-1.5-flash''),\n    prompt: `Rewrite the following educational content for a user with:\n- Programming proficiency: ${preferences.programming_proficiency}\n- AI proficiency: ${preferences.ai_proficiency}\n\nAdjustment guidelines:\n- For beginners: Use simple language, more examples, avoid jargon\n- For intermediate: Balance theory and practice, include code samples\n- For experts: Focus on advanced concepts, optimizations, edge cases\n\nOriginal content:\n${content}\n\nPersonalized version:`,\n    temperature: 0.5,\n  });\n  \n  return text;\n}\n```\n\n## Caching Strategy\n\nSince there are 9 possible combinations (3x3 proficiency levels), consider:\n\n1. **On-demand generation**: Generate and cache when first requested\n2. **Pre-generation**: Generate all 9 versions during content creation\n3. **Hybrid**: Pre-generate for popular content, on-demand for rest\n\n```typescript\n// Cache key structure\nconst cacheKey = `${lessonId}:${ai_proficiency}:${programming_proficiency}`;\n```',
        2
    );

    -- Chapter 3: Production Deployment
    INSERT INTO chapters (id, tenant_id, book_id, title, slug, order_index)
    VALUES (
        uuid_generate_v4(),
        tenant_uuid,
        book_uuid,
        'Deploying AI Applications',
        'deployment',
        3
    ) RETURNING id INTO chapter3_uuid;

    -- Lessons for Chapter 3
    INSERT INTO lessons (tenant_id, chapter_id, title, slug, content, order_index)
    VALUES
    (
        tenant_uuid,
        chapter3_uuid,
        'API Rate Limiting and Cost Management',
        'rate-limiting',
        E'# API Rate Limiting and Cost Management\n\nProduction AI applications must carefully manage API usage to control costs and ensure availability.\n\n## Understanding API Limits\n\n### Google Gemini Free Tier\n- 15 requests per minute (RPM)\n- 1 million tokens per month\n- 1,500 requests per day\n\n## Implementing Rate Limiting\n\n```typescript\nimport { Ratelimit } from ''@upstash/ratelimit'';\nimport { Redis } from ''@upstash/redis'';\n\nconst ratelimit = new Ratelimit({\n  redis: Redis.fromEnv(),\n  limiter: Ratelimit.slidingWindow(10, ''1 m''), // 10 requests per minute\n  analytics: true,\n});\n\nasync function generateWithLimit(userId: string, prompt: string) {\n  const { success, limit, remaining } = await ratelimit.limit(userId);\n  \n  if (!success) {\n    throw new Error(`Rate limit exceeded. Try again in ${limit}ms`);\n  }\n  \n  return generateText({ /* ... */ });\n}\n```\n\n## Cost Calculation\n\n```typescript\nfunction estimateCost(inputTokens: number, outputTokens: number): number {\n  // Gemini 1.5 Flash pricing (as of 2024)\n  const INPUT_COST_PER_1K = 0.000075;  // $0.075 per 1M tokens\n  const OUTPUT_COST_PER_1K = 0.0003;   // $0.30 per 1M tokens\n  \n  return (inputTokens / 1000 * INPUT_COST_PER_1K) + \n         (outputTokens / 1000 * OUTPUT_COST_PER_1K);\n}\n```\n\n## Caching Strategies\n\n### 1. Database Caching\nStore generated content in the database (what we''re doing).\n\n### 2. Redis Caching\nFor frequently accessed content:\n```typescript\nconst cached = await redis.get(`summary:${lessonId}`);\nif (cached) return cached;\n\nconst summary = await generateSummary(content);\nawait redis.set(`summary:${lessonId}`, summary, { ex: 86400 }); // 24h TTL\n```\n\n### 3. Edge Caching\nUse CDN caching for static personalized content.\n\n## Monitoring and Alerts\n\n```typescript\n// Track usage\nawait analytics.track({\n  event: ''ai_generation'',\n  properties: {\n    userId,\n    type: ''summary'' | ''personalization'',\n    inputTokens,\n    outputTokens,\n    latencyMs,\n    model: ''gemini-1.5-flash'',\n  },\n});\n\n// Set up alerts for\n// - Daily token usage > 80% of limit\n// - Error rate > 5%\n// - P95 latency > 5s\n```',
        1
    );

END $$;
