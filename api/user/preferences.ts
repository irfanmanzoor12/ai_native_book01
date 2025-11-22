import type { VercelRequest, VercelResponse } from '@vercel/node';
import { auth } from '../../src/lib/auth';
import { db } from '../../src/lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const session = await auth.api.getSession({ headers: req.headers as any });
    if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });

    if (req.method === 'GET') {
      const user = await db.getUserById(session.user.id);
      const prefs = user?.preferences ? JSON.parse(user.preferences) : null;
      return res.status(200).json({
        preferences: prefs,
        needsOnboarding: !prefs?.ai_proficiency || !prefs?.programming_proficiency,
      });
    }

    if (req.method === 'POST') {
      const { ai_proficiency, programming_proficiency } = req.body;
      const valid = ['beginner', 'intermediate', 'expert'];
      if (!valid.includes(ai_proficiency) || !valid.includes(programming_proficiency)) {
        return res.status(400).json({ error: 'Invalid proficiency level' });
      }
      await db.updateUserPreferences(session.user.id, { ai_proficiency, programming_proficiency });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Preferences error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
