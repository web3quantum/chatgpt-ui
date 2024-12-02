import { NextResponse } from 'next/response';
import { prisma } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import { z } from 'zod';

const verifySchema = z.object({
  walletAddress: z.string(),
  scaiId: z.string(),
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { walletAddress, scaiId, email } = verifySchema.parse(body);

    // Here you would validate the SCAI ID against your database
    // For now, we'll simulate the validation
    const isValidScaiId = true; // Replace with actual validation

    if (!isValidScaiId) {
      return NextResponse.json(
        { error: 'Invalid SCAI ID' },
        { status: 400 }
      );
    }

    const verificationToken = crypto.randomUUID();

    // Store the verification request
    await prisma.verificationRequest.create({
      data: {
        email,
        scaiId,
        walletAddress,
        token: verificationToken,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: 'Verification email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}