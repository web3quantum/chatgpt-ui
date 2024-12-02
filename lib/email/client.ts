import axios from 'axios';
import { EmailPayload, ZeptoMailConfig } from './types';
import { zeptoMailConfig } from './config';

class EmailClient {
  private config: ZeptoMailConfig;

  constructor(config: ZeptoMailConfig) {
    this.config = config;
  }

  async sendEmail(payload: EmailPayload): Promise<boolean> {
    try {
      const requestData = {
        bounce_address: this.config.bounceAddress,
        from: {
          name: this.config.fromName,
          address: this.config.fromAddress
        },
        to: [{
          email_address: {
            address: payload.to.address,
            name: payload.to.name || payload.to.address
          }
        }],
        subject: payload.subject,
        htmlbody: payload.htmlBody
      };

      const response = await axios.post(this.config.apiUrl, requestData, {
        headers: {
          'accept': 'application/json',
          'authorization': `Zoho-enczapikey ${this.config.apiKey}`,
          'content-type': 'application/json'
        }
      });

      return response.status === 200;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }
}

export const emailClient = new EmailClient(zeptoMailConfig);