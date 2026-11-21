import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { sql } from '@/lib/db';
import type { UserWithPassword } from '@/lib/definitions';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function getUserByEmail(email: string): Promise<UserWithPassword | null> {
  const rows = await sql`
    SELECT
      id,
      name,
      email,
      created_at    AS "createdAt",
      password_hash AS "passwordHash"
    FROM users
    WHERE email = ${email.toLowerCase()}
  `;
  return (rows[0] as UserWithPassword | undefined) ?? null;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordsMatch) {
          return null;
        }

        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
});
