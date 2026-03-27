import { createClerkSupabaseClient } from "./supabase";

/**
 * Gets count of quotes for a user
 */
export async function getQuotesCount(token: string, userId: string): Promise<number> {
  const supabase = createClerkSupabaseClient(token);
  
  try {
    const { count, error } = await supabase
      .from("quotes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      console.error('Error fetching quotes count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getQuotesCount:', error);
    return 0;
  }
}

/**
 * Gets count of distillations for a user
 */
export async function getDistillationsCount(token: string, userId: string): Promise<number> {
  const supabase = createClerkSupabaseClient(token);
  
  try {
    const { count, error } = await supabase
      .from("distillations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      console.error('Error fetching distillations count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getDistillationsCount:', error);
    return 0;
  }
}

/**
 * Gets count of leave requests for a user
 */
export async function getLeaveRequestsCount(token: string, userId: string): Promise<number> {
  const supabase = createClerkSupabaseClient(token);
  
  try {
    const { count, error } = await supabase
      .from("leave_requests")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      console.error('Error fetching leave requests count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getLeaveRequestsCount:', error);
    return 0;
  }
}

/**
 * Gets count of cyber reports for a user
 */
export async function getCyberReportsCount(token: string, userId: string): Promise<number> {
  const supabase = createClerkSupabaseClient(token);
  
  try {
    const { count, error } = await supabase
      .from("cyber_reports")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      console.error('Error fetching cyber reports count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getCyberReportsCount:', error);
    return 0;
  }
}
