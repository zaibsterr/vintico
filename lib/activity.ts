import { createClerkSupabaseClient } from './supabase';

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  created_at: string;
}

/**
 * Logs an activity for a user
 */
export async function logActivity(token: string, userId: string, action: string): Promise<boolean> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { error } = await supabase
      .from('activity_logs')
      .insert([
        {
          user_id: userId,
          action: action
        }
      ]);

    if (error) {
      console.error('Error logging activity:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('logActivity error:', error);
    return false;
  }
}

/**
 * Fetches recent activities for a user
 */
export async function getUserActivities(token: string, userId: string, limit: number = 10): Promise<ActivityLog[]> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching activities:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('getUserActivities error:', error);
    return [];
  }
}

/**
 * Alias for getUserActivities to match expected function name
 */
export async function getActivityLogs(token: string, userId: string): Promise<ActivityLog[]> {
  return getUserActivities(token, userId, 50);
}
