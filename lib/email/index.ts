import { emailClient } from './client';
import { getVerificationEmailTemplate } from './templates';

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  return emailClient.sendEmail({
    to: { address: email },
    subject: 'Verify your SecureChain AI account',
    htmlBody: getVerificationEmailTemplate(token)
  });
}

export { emailClient } from './client';
export * from './types';