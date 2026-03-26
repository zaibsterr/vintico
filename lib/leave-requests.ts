import { createClerkSupabaseClient } from './supabase';
import { logActivity } from './activity';

export interface LeaveRequest {
  id: string;
  user_id: string;
  employee_name: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

/**
 * Checks for overlapping leave dates
 */
export async function checkOverlappingLeave(
  token: string, 
  userId: string, 
  startDate: string, 
  endDate: string, 
  excludeId?: string
): Promise<boolean> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    let query = supabase
      .from('leave_requests')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['pending', 'approved']);

    // Exclude current request if updating
    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error checking overlapping leave:', error);
      return false;
    }

    if (!data || data.length === 0) {
      return false;
    }

    // Check for overlaps
    const start = new Date(startDate);
    const end = new Date(endDate);

    return data.some((leave) => {
      const leaveStart = new Date(leave.start_date);
      const leaveEnd = new Date(leave.end_date);
      
      return (
        (start <= leaveEnd && end >= leaveStart)
      );
    });
  } catch (error) {
    console.error('checkOverlappingLeave error:', error);
    return false;
  }
}

/**
 * Creates a new leave request and logs activity
 */
export async function createLeaveRequest(
  token: string, 
  userId: string, 
  employeeName: string, 
  leaveType: string, 
  startDate: string, 
  endDate: string, 
  reason: string
): Promise<LeaveRequest | null> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('leave_requests')
      .insert([
        {
          user_id: userId,
          employee_name: employeeName,
          leave_type: leaveType,
          start_date: startDate,
          end_date: endDate,
          reason: reason,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating leave request:', error);
      return null;
    }

    // Log activity
    await logActivity(token, userId, 'Leave Request Submitted');
    
    return data;
  } catch (error) {
    console.error('createLeaveRequest error:', error);
    return null;
  }
}

/**
 * Fetches leave requests for a user
 */
export async function getUserLeaveRequests(token: string, userId: string): Promise<LeaveRequest[]> {
  try {
    const supabase = createClerkSupabaseClient(token);
    
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leave requests:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('getUserLeaveRequests error:', error);
    return [];
  }
}
