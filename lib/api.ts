interface VerifyScaiIdParams {
  walletAddress: string;
  scaiId: string;
  email: string;
}

export async function verifyScaiId({ walletAddress, scaiId, email }: VerifyScaiIdParams) {
  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress, scaiId, email }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Verification failed');
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Verification failed' 
    };
  }
}