export function getVerificationEmailTemplate(token: string): string {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify/${token}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .button {
          background-color: #4F46E5;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Verify Your Email</h1>
        <p>Thank you for registering with SecureChain AI. Please click the button below to verify your email address:</p>
        <a href="${verificationUrl}" class="button">Verify Email</a>
        <p>If you didn't request this verification, please ignore this email.</p>
        <p>Best regards,<br>SecureChain AI Team</p>
      </div>
    </body>
    </html>
  `;
}