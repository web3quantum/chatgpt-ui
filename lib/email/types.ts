export interface EmailRecipient {
  address: string;
  name?: string;
}

export interface EmailPayload {
  to: EmailRecipient;
  subject: string;
  htmlBody: string;
}

export interface ZeptoMailConfig {
  apiUrl: string;
  apiKey: string;
  bounceAddress: string;
  fromName: string;
  fromAddress: string;
}