import { z } from 'zod';

export const verificationSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
  scaiId: z.string().min(1, 'SCAI ID is required'),
  email: z.string().email('Invalid email address'),
});

export type VerificationData = z.infer<typeof verificationSchema>;