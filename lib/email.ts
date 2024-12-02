import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your SCAI ID Connection',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
        <p style="color: #666; line-height: 1.6;">
          Thank you for connecting your SCAI ID. Please click the button below to verify your email address:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${appUrl}/verify/${token}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px; text-align: center;">
          If you didn't request this verification, please ignore this email.
        </p>
      </div>
    `,
  });
}