import type { VercelRequest, VercelResponse } from '@vercel/node';
import { auth } from '../../src/lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`);

  const webRequest = new Request(url, {
    method: req.method,
    headers: req.headers as any,
    body: req.method !== 'GET' && req.method !== 'HEAD'
      ? JSON.stringify(req.body)
      : undefined,
  });

  try {
    const response = await auth.handler(webRequest);

    const cookies = response.headers.getSetCookie?.();
    if (cookies) {
      res.setHeader('Set-Cookie', cookies);
    }

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'set-cookie') {
        res.setHeader(key, value);
      }
    });

    res.status(response.status);
    const body = await response.text();
    body ? res.send(body) : res.end();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
