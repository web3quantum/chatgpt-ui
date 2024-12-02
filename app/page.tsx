'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { ConnectButton } from '@/components/wallet/connect-button';
import { VerificationForm } from '@/components/forms/verification-form';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/80">
      <Card className="w-full max-w-md border-border/50 backdrop-blur-sm">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10 animate-float">
              <Wallet className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
              Connect SCAI ID
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Link your SCAI ID with CoinMask wallet
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!walletAddress ? (
            <ConnectButton onConnect={setWalletAddress} isLoading={isLoading} />
          ) : (
            <>
              <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
                <p className="text-sm text-center font-mono break-all text-muted-foreground">
                  {walletAddress}
                </p>
              </div>
              <VerificationForm walletAddress={walletAddress} isLoading={isLoading} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}