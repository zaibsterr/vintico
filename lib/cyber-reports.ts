import { createClerkSupabaseClient } from './supabase';
import { logActivity } from './activity';

export interface CyberReport {
  id: string;
  user_id: string;
  type: 'password' | 'security';
  content: string;
  score?: number;
  created_at: string;
}

/**
 * Creates a new cyber report and logs activity
 */
export async function createCyberReport(
  token: string, 
  userId: string, 
  type: 'password' | 'security', 
  content: string, 
  score?: number
): Promise<CyberReport | null> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('cyber_reports')
      .insert([
        {
          user_id: userId,
          type: type,
          content: content,
          score: score
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating cyber report:', error);
      return null;
    }

    // Log activity
    await logActivity(token, userId, 'Generated Security Report');
    
    return data;
  } catch (error) {
    console.error('createCyberReport error:', error);
    return null;
  }
}

/**
 * Fetches cyber reports for a user
 */
export async function getUserCyberReports(token: string, userId: string): Promise<CyberReport[]> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('cyber_reports')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cyber reports:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('getUserCyberReports error:', error);
    return [];
  }
}
