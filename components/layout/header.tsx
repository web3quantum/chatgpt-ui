'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Wallet } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <nav className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold hidden sm:inline">SCAI ID Connect</span>
          <span className="text-lg font-semibold sm:hidden">Connect</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}