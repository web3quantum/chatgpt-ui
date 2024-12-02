import axios from 'axios';
import { EmailPayload, ZeptoMailConfig } from './types';
import { zeptoMailConfig } from './config';

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const config: ZeptoMailConfig = zeptoMailConfig;
  
  try {
    const requestData = {
      bounce_address: config.bounceAddress,
      from: {
        name: config.fromName,
        address: config.fromAddress
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

    const response = await axios.post(config.apiUrl, requestData, {
      headers: {
        'accept': 'application/json',
        'authorization': `Zoho-enczapikey ${config.apiKey}`,
        'content-type': 'application/json'
      }
    });

    return response.status === 200;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}