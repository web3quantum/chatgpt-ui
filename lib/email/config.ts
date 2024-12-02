import { ZeptoMailConfig } from './types';

export const zeptoMailConfig: ZeptoMailConfig = {
  apiUrl: 'https://api.zeptomail.com/v1.1/email',
  apiKey: process.env.ZEPTOMAIL_API_KEY || '',
  bounceAddress: 'bounce@zohomail.securechain.ai',
  fromName: 'SecureChain AI',
  fromAddress: 'noreply@securechain.ai',
};