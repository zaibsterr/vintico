import { createClerkSupabaseClient } from './supabase';
import { logActivity } from './activity';

export interface Quote {
  id: string;
  user_id: string;
  customer_name: string;
  phone: string;
  amount: number;
  message: string;
  status: 'sent' | 'pending' | 'accepted' | 'declined';
  created_at: string;
}

/**
 * Creates a new quote record and logs activity
 */
export async function createQuote(
  token: string, 
  userId: string, 
  customerName: string, 
  phone: string, 
  amount: number, 
  message: string
): Promise<Quote | null> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('quotes')
      .insert([
        {
          user_id: userId,
          customer_name: customerName,
          phone: phone,
          amount: amount,
          message: message,
          status: 'sent'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating quote:', error);
      return null;
    }

    // Log activity
    await logActivity(token, userId, 'Sent Quote SMS');
    
    return data;
  } catch (error) {
    console.error('createQuote error:', error);
    return null;
  }
}

/**
 * Fetches quotes for a user
 */
export async function getUserQuotes(token: string, userId: string): Promise<Quote[]> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quotes:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('getUserQuotes error:', error);
    return [];
  }
}
