import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet() {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { success: true, address };
    } catch (error) {
      return { success: false, error: 'Failed to connect wallet' };
    }
  } else {
    return { success: false, error: 'Please install CoinMask' };
  }
}

export async function getCurrentWalletAddress() {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return await signer.getAddress();
    } catch (error) {
      return null;
    }
  }
  return null;
}