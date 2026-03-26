import { createClerkSupabaseClient } from './supabase';
import { logActivity } from './activity';
import { CREDIT_PLANS, PlanType } from './credits';

export interface Subscription {
  id: string;
  user_id: string;
  plan: PlanType;
  status: 'active' | 'canceled' | 'past_due';
  stripe_subscription_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  credits_added: number;
  source: 'topup' | 'subscription';
  stripe_payment_id?: string;
  created_at: string;
}

/**
 * Updates user plan and credits after successful Stripe payment
 */
export async function updateUserPlanAfterPayment(
  token: string, 
  userId: string, 
  plan: PlanType, 
  stripeSubscriptionId: string
): Promise<boolean> {
  try {
    const supabase = createClerkSupabaseClient(token);
    const credits = CREDIT_PLANS[plan].credits;
    
    // Update user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({ 
        plan: plan, 
        credits: credits 
      })
      .eq('user_id', userId);

    if (profileError) {
      console.error('Error updating user plan:', profileError);
      return false;
    }

    // Create subscription record
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert([
        {
          user_id: userId,
          plan: plan,
          status: 'active',
          stripe_subscription_id: stripeSubscriptionId
        }
      ]);

    if (subscriptionError) {
      console.error('Error creating subscription:', subscriptionError);
      return false;
    }

    // Log activity
    await logActivity(token, userId, `Upgraded to ${plan} plan`);
    
    return true;
  } catch (error) {
    console.error('updateUserPlanAfterPayment error:', error);
    return false;
  }
}

/**
 * Adds credits from top-up purchase
 */
export async function addCreditsFromTopup(
  token: string, 
  userId: string, 
  creditsAdded: number, 
  stripePaymentId: string
): Promise<boolean> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    // Get current credits
    const { data: profile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching current credits:', fetchError);
      return false;
    }

    // Update credits
    const newCredits = profile.credits + creditsAdded;
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ credits: newCredits })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating credits:', updateError);
      return false;
    }

    // Create transaction record
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert([
        {
          user_id: userId,
          credits_added: creditsAdded,
          source: 'topup',
          stripe_payment_id: stripePaymentId
        }
      ]);

    if (transactionError) {
      console.error('Error creating credit transaction:', transactionError);
      return false;
    }

    // Log activity
    await logActivity(token, userId, `Added ${creditsAdded} credits`);
    
    return true;
  } catch (error) {
    console.error('addCreditsFromTopup error:', error);
    return false;
  }
}

/**
 * Fetches user subscriptions
 */
export async function getUserSubscriptions(token: string, userId: string): Promise<Subscription[]> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('getUserSubscriptions error:', error);
    return [];
  }
}

/**
 * Fetches credit transactions
 */
export async function getUserCreditTransactions(token: string, userId: string): Promise<CreditTransaction[]> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching credit transactions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('getUserCreditTransactions error:', error);
    return [];
  }
}
