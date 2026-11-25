'use server';

import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';
import { sql } from '@/lib/db';

export type FormState = { error?: string } | undefined;

const SignupSchema = z.object({
  name: z.string().trim().min(2, 'Name must have at least 2 characters.').max(100),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must have at least 8 characters.'),
  businessName: z.string().trim().min(2, 'Business name must have at least 2 characters.').max(150),
});

export async function authenticate(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password.' };
    }
    // signIn throws a redirect on success, so other errors must be re-thrown
    throw error;
  }
  return undefined;
}

export async function signup(_prevState: FormState, formData: FormData): Promise<FormState> {
  const parsed = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    businessName: formData.get('businessName'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Please check the form fields.' };
  }

  const { name, email, password, businessName } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const users = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email}, ${passwordHash})
      RETURNING id
    `;
    await sql`
      INSERT INTO businesses (user_id, name)
      VALUES (${users[0].id}, ${businessName})
    `;
  } catch (error) {
    // 23505 = unique_violation (the email already exists)
    if ((error as { code?: string }).code === '23505') {
      return { error: 'An account with this email already exists.' };
    }
    console.error('Sign up failed:', error);
    return { error: 'Something went wrong. Please try again.' };
  }

  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/login');
    }
    throw error;
  }
  return undefined;
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: '/' });
}
