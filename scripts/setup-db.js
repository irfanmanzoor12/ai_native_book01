// Database setup script for Better-Auth tables
// Run with: node scripts/setup-db.js

require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  console.log('Setting up Better-Auth database tables...');
  console.log('Database URL:', process.env.DATABASE_URL ? 'Found' : 'NOT FOUND');

  try {
    // Drop existing tables
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS verification CASCADE`;
    await sql`DROP TABLE IF EXISTS session CASCADE`;
    await sql`DROP TABLE IF EXISTS account CASCADE`;
    await sql`DROP TABLE IF EXISTS "user" CASCADE`;

    // Create user table
    console.log('Creating user table...');
    await sql`
      CREATE TABLE "user" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        "emailVerified" BOOLEAN DEFAULT FALSE,
        image TEXT,
        preferences TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create session table
    console.log('Creating session table...');
    await sql`
      CREATE TABLE session (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        token TEXT NOT NULL UNIQUE,
        "expiresAt" TIMESTAMP NOT NULL,
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create account table
    console.log('Creating account table...');
    await sql`
      CREATE TABLE account (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        "accountId" TEXT NOT NULL,
        "providerId" TEXT NOT NULL,
        "accessToken" TEXT,
        "refreshToken" TEXT,
        "accessTokenExpiresAt" TIMESTAMP,
        "refreshTokenExpiresAt" TIMESTAMP,
        scope TEXT,
        password TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create verification table
    console.log('Creating verification table...');
    await sql`
      CREATE TABLE verification (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        "expiresAt" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create indexes
    console.log('Creating indexes...');
    await sql`CREATE INDEX idx_session_user ON session("userId")`;
    await sql`CREATE INDEX idx_session_token ON session(token)`;
    await sql`CREATE INDEX idx_account_user ON account("userId")`;
    await sql`CREATE INDEX idx_verification_identifier ON verification(identifier)`;

    console.log('\n✅ Database setup complete!');
    console.log('Tables created: user, session, account, verification');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

setupDatabase();
