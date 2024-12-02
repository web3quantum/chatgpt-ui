import { NextResponse } from 'next/response';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { sendVerificationEmail } from '@/lib/email';
import crypto from 'crypto';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = registerSchema.parse(body);

    // Check if user exists
    const [existingUser] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    ) as any[];

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomUUID();
    const userId = crypto.randomUUID();

    // Create user
    await db.query(
      'INSERT INTO users (id, email, password, verify_token) VALUES (?, ?, ?, ?)',
      [userId, email, hashedPassword, verifyToken]
    );

    const emailSent = await sendVerificationEmail(email, verifyToken);

    if (!emailSent) {
      // If email fails to send, delete the user
      await db.query('DELETE FROM users WHERE id = ?', [userId]);
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}