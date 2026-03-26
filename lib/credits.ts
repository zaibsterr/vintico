import { createClerkSupabaseClient } from './supabase';
import { getUserProfile, updateUserCredits, UserProfile } from './user-profile';

export interface CreditCheckResult {
  hasCredits: boolean;
  credits: number;
  canProceed: boolean;
}

/**
 * Checks if user has sufficient credits for an action
 * STRICT: Always fetches from Supabase, never frontend state
 */
export async function checkUserCredits(token: string, userId: string): Promise<CreditCheckResult> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    // STRICT: Always fetch fresh credits from Supabase
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user credits from Supabase:', error);
      return { hasCredits: false, credits: 0, canProceed: false };
    }

    const credits = profile?.credits ?? 0;
    const hasCredits = credits > 0;
    
    console.log(`Credit check for user ${userId}: ${credits} credits available`);
    
    return {
      hasCredits,
      credits,
      canProceed: hasCredits
    };
  } catch (error) {
    console.error('checkUserCredits error:', error);
    return { hasCredits: false, credits: 0, canProceed: false };
  }
}

/**
 * Deducts 1 credit from user account
 * STRICT: Updates directly in Supabase
 */
export async function deductCredit(token: string, userId: string): Promise<boolean> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    // Step 1: Get current credits
    const { data: profile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching current credits:', fetchError);
      return false;
    }

    if (!profile || profile.credits <= 0) {
      console.log('No credits available to deduct');
      return false;
    }

    // Step 2: Update with new total
    const newCredits = profile.credits - 1;
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ credits: newCredits })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error deducting credit:', updateError);
      return false;
    }

    console.log(`Successfully deducted 1 credit from user ${userId}. New balance: ${newCredits}`);
    return true;
  } catch (error) {
    console.error('deductCredit error:', error);
    return false;
  }
}

/**
 * Credit plan configurations
 */
export const CREDIT_PLANS = {
  free: { credits: 3, name: 'Free' },
  starter: { credits: 100, name: 'Starter' },
  growth: { credits: 500, name: 'Growth' },
  pro: { credits: 2000, name: 'Pro' }
} as const;

export type PlanType = keyof typeof CREDIT_PLANS;
