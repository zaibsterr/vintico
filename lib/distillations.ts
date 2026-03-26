import { createClerkSupabaseClient } from './supabase';
import { logActivity } from './activity';

export interface Distillation {
  id: string;
  user_id: string;
  original_text: string;
  summary: string;
  created_at: string;
}

/**
 * Creates a new distillation record and logs activity
 */
export async function createDistillation(
  token: string, 
  userId: string, 
  originalText: string, 
  summary: string
): Promise<Distillation | null> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('distillations')
      .insert([
        {
          user_id: userId,
          original_text: originalText,
          summary: summary
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating distillation:', error);
      return null;
    }

    // Log activity
    await logActivity(token, userId, 'Generated Summary');
    
    return data;
  } catch (error) {
    console.error('createDistillation error:', error);
    return null;
  }
}

/**
 * Fetches distillations for a user
 */
export async function getUserDistillations(token: string, userId: string): Promise<Distillation[]> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('distillations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching distillations:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('getUserDistillations error:', error);
    return [];
  }
}
