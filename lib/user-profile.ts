import { createClerkSupabaseClient } from './supabase';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  credits: number;
  plan: 'free' | 'starter' | 'growth' | 'pro';
  created_at: string;
  updated_at: string;
}

/**
 * Creates or fetches user profile on first signup/login
 * STRICT ANTI-ABUSE: Only gives 3 credits ONCE at signup
 * NEVER resets credits on subsequent logins
 */
export async function ensureUserProfile(token: string, clerkUserId: string, email: string): Promise<UserProfile | null> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    // Step 1: Check if user already exists (ANTI-ABUSE CHECK)
    const { data: existingUser, error: fetchError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', clerkUserId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Error fetching user profile:', fetchError);
      return null;
    }

    // Step 2: If user exists, return existing profile (NO CREDIT RESET)
    if (existingUser) {
      console.log(`User ${clerkUserId} already exists, returning existing profile`);
      return existingUser;
    }

    // Step 3: Only create new user if NOT exists (ANTI-ABUSE)
    console.log(`Creating new user profile for ${clerkUserId} with 3 credits`);
    const { data: newUser, error: insertError } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: clerkUserId,
          email: email,
          credits: 3, // EXACTLY 3 credits ONLY ONCE
          plan: 'free'
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Error creating user profile:', insertError);
      return null;
    }

    console.log(`Successfully created user profile for ${clerkUserId} with 3 credits`);
    return newUser;
  } catch (error) {
    console.error('ensureUserProfile error:', error);
    return null;
  }
}

/**
 * Fetches user profile by user_id
 */
export async function getUserProfile(token: string, userId: string): Promise<UserProfile | null> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('getUserProfile error:', error);
    return null;
  }
}

/**
 * Updates user credits
 */
export async function updateUserCredits(token: string, userId: string, credits: number): Promise<boolean> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { error } = await supabase
      .from('user_profiles')
      .update({ credits })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating user credits:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('updateUserCredits error:', error);
    return false;
  }
}

/**
 * Updates user plan and credits (for Stripe payments)
 */
export async function updateUserPlan(token: string, userId: string, plan: 'free' | 'starter' | 'growth' | 'pro', credits: number): Promise<boolean> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { error } = await supabase
      .from('user_profiles')
      .update({ plan, credits })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating user plan:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('updateUserPlan error:', error);
    return false;
  }
}

/**
 * Adds credits to user account (for top-ups)
 */
export async function addCredits(token: string, userId: string, creditsToAdd: number): Promise<boolean> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    // First get current credits
    const { data: profile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching current credits:', fetchError);
      return false;
    }

    // Update with new total
    const newCredits = profile.credits + creditsToAdd;
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ credits: newCredits })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error adding credits:', updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('addCredits error:', error);
    return false;
  }
}
