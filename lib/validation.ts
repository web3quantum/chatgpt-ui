import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const verificationSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
  scaiId: z.string().min(1, 'SCAI ID is required'),
  email: z.string().email('Invalid email address'),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type VerificationData = z.infer<typeof verificationSchema>;