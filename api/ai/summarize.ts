import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { auth } from '../../src/lib/auth';

const summaryCache = new Map<string, string>();

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

    if (summaryCache.has(lessonId)) {
      return res.status(200).json({ summary: summaryCache.get(lessonId), cached: true });
    }

    const { text: summary } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: `Summarize this lesson:\n\n${content}`,
      temperature: 0.3,
      maxTokens: 1000,
    });

    summaryCache.set(lessonId, summary);
    return res.status(200).json({ summary, cached: false });
  } catch (error) {
    console.error('Summarize error:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
}
