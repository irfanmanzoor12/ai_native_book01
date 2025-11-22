import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { auth } from '../../src/lib/auth';
import { db } from '../../src/lib/db';

const cache = new Map<string, string>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const session = await auth.api.getSession({ headers: req.headers as any });
    if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });

    const { lessonId, content } = req.body;
    if (!lessonId || !content) return res.status(400).json({ error: 'Missing required fields' });

    const user = await db.getUserById(session.user.id);
    const prefs = user?.preferences ? JSON.parse(user.preferences) : null;

    if (!prefs?.ai_proficiency || !prefs?.programming_proficiency) {
      return res.status(400).json({ error: 'Complete onboarding first', needsOnboarding: true });
    }

    const cacheKey = `${lessonId}-${session.user.id}`;
    if (cache.has(cacheKey)) {
      return res.status(200).json({ content: cache.get(cacheKey), cached: true });
    }

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: `Adapt for ${prefs.programming_proficiency} programmer with ${prefs.ai_proficiency} AI knowledge:\n\n${content}`,
      temperature: 0.5,
      maxTokens: 3000,
    });

    cache.set(cacheKey, text);
    return res.status(200).json({ content: text, cached: false });
  } catch (error) {
    console.error('Personalize error:', error);
    return res.status(500).json({ error: 'Failed to personalize' });
  }
}
