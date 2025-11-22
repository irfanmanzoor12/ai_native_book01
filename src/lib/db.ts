import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export { sql };

export interface UserPreferences {
  ai_proficiency: 'beginner' | 'intermediate' | 'expert';
  programming_proficiency: 'beginner' | 'intermediate' | 'expert';
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  preferences: string | null;
}

export const db = {
  async getUserById(userId: string): Promise<User | null> {
    const result = await sql`SELECT * FROM "user" WHERE id = ${userId}`;
    return result[0] as User | null;
  },

  async updateUserPreferences(userId: string, preferences: UserPreferences): Promise<void> {
    await sql`UPDATE "user" SET preferences = ${JSON.stringify(preferences)}, "updatedAt" = NOW() WHERE id = ${userId}`;
  },
};
