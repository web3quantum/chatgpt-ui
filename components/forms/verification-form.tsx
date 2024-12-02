'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { verificationSchema, type VerificationData } from '@/lib/validation';

interface VerificationFormProps {
  walletAddress: string;
}

export function VerificationForm({ walletAddress }: VerificationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VerificationData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      walletAddress,
      scaiId: '',
      email: '',
    },
  });

  async function onSubmit(values: VerificationData) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verification failed');
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="scaiId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                SCAI ID
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your SCAI ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify and Link'}
        </Button>
      </form>
    </Form>
  );
}