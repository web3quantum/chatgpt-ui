"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { connectWallet, getCurrentWalletAddress } from '@/lib/web3';
import { Wallet, User, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [scaiId, setScaiId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  async function checkWalletConnection() {
    const address = await getCurrentWalletAddress();
    if (address) {
      setWalletAddress(address);
    }
  }

  async function handleConnectWallet() {
    setIsLoading(true);
    const result = await connectWallet();
    if (result.success) {
      setWalletAddress(result.address);
      toast.success('Wallet connected successfully!');
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  }

  async function handleSaveScaiId() {
    setIsLoading(true);
    try {
      // Here you would integrate with your backend to validate and save the SCAI ID
      toast.success('SCAI ID saved successfully!');
    } catch (error) {
      toast.error('Failed to save SCAI ID');
    }
    setIsLoading(false);
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Manage your account settings and set up your wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    CoinMask Wallet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your CoinMask wallet to interact with the staking system
                  </p>
                </div>
                {!walletAddress ? (
                  <Button onClick={handleConnectWallet} disabled={isLoading}>
                    Connect Wallet
                  </Button>
                ) : (
                  <p className="text-sm font-mono bg-secondary p-2 rounded">
                    {walletAddress}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  SCAI ID
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enter your SCAI ID for verification
                </p>
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter your SCAI ID"
                    value={scaiId}
                    onChange={(e) => setScaiId(e.target.value)}
                  />
                  <Button onClick={handleSaveScaiId} disabled={isLoading || !scaiId}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}