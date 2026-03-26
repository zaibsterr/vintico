'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { checkUserCredits, deductCredit } from '@/lib/credits';
import { createClerkSupabaseClient } from '@/lib/supabase';

interface UseCreditsReturn {
  credits: number;
  loading: boolean;
  checkCredits: () => Promise<boolean>;
  useCredit: () => Promise<boolean>;
  refreshCredits: () => Promise<void>;
}

export function useCredits(): UseCreditsReturn {
  const { userId, getToken } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // STRICT: Always fetch fresh credits from Supabase
  const refreshCredits = useCallback(async () => {
    if (!userId) {
      setCredits(0);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        setCredits(0);
        return;
      }
      
      const supabase = createClerkSupabaseClient(token);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('credits')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching credits:', error);
        setCredits(0);
      } else {
        setCredits(data?.credits ?? 0);
        console.log(`Fetched credits for user ${userId}: ${data?.credits ?? 0}`);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
      setCredits(0);
    } finally {
      setLoading(false);
    }
  }, [userId, getToken]);

  const checkCredits = useCallback(async (): Promise<boolean> => {
    if (!userId) {
      toast.error('User not authenticated');
      return false;
    }

    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication error');
        return false;
      }

      const creditCheck = await checkUserCredits(token, userId);
      if (!creditCheck.canProceed) {
        toast.error('You have used all your credits. Start with our plan to continue.');
        return false;
      }

      // Update local state with fresh credits
      setCredits(creditCheck.credits);
      return true;
    } catch (error) {
      console.error('Error checking credits:', error);
      toast.error('Error checking credits');
      return false;
    }
  }, [userId, getToken]);

  const useCredit = useCallback(async (): Promise<boolean> => {
    if (!userId) {
      toast.error('User not authenticated');
      return false;
    }

    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication error');
        return false;
      }

      const creditDeducted = await deductCredit(token, userId);
      if (!creditDeducted) {
        toast.error('Failed to deduct credit');
        return false;
      }

      // Refresh credits to update display
      await refreshCredits();
      
      return true;
    } catch (error) {
      console.error('Error using credit:', error);
      toast.error('Error using credit');
      return false;
    }
  }, [userId, getToken, refreshCredits]);

  // Auto-refresh credits on mount and when userId changes
  useEffect(() => {
    refreshCredits();
  }, [refreshCredits]);

  return {
    credits,
    loading,
    checkCredits,
    useCredit,
    refreshCredits,
  };
}
