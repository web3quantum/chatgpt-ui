'use client';

import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useState } from 'react';
import { connectWallet } from '@/lib/web3';
import { toast } from 'sonner';

interface ConnectButtonProps {
  onConnect: (address: string) => void;
  isLoading?: boolean;
}

export function ConnectButton({ onConnect, isLoading }: ConnectButtonProps) {
  const [connecting, setConnecting] = useState(false);

  async function handleConnect() {
    setConnecting(true);
    try {
      const result = await connectWallet();
      if (result.success) {
        onConnect(result.address);
        toast.success('Wallet connected successfully!');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
    setConnecting(false);
  }

  return (
    <Button 
      className="w-full" 
      size="lg"
      onClick={handleConnect}
      disabled={connecting || isLoading}
    >
      <Wallet className="mr-2 h-5 w-5" />
      Connect CoinMask Wallet
    </Button>
  );
}