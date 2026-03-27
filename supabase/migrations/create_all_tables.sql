-- Complete database schema for Vintico application
-- This creates all tables needed for the application functionality

-- Activity Logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotes table for Quote Nudge
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'pending', 'accepted', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Distillations table for Distill Guard
CREATE TABLE IF NOT EXISTS distillations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  original_text TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave Requests table for Leave Guard
CREATE TABLE IF NOT EXISTS leave_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  leave_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cyber Reports table for Cyber Guard
CREATE TABLE IF NOT EXISTS cyber_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('password', 'security')),
  content TEXT NOT NULL,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table for Stripe plan handling
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'starter', 'growth', 'pro')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  stripe_subscription_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit Transactions table for credit top-ups
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  credits_added INTEGER NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('topup', 'subscription')),
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);

CREATE INDEX IF NOT EXISTS idx_distillations_user_id ON distillations(user_id);

CREATE INDEX IF NOT EXISTS idx_leave_requests_user_id ON leave_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_dates ON leave_requests(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);

CREATE INDEX IF NOT EXISTS idx_cyber_reports_user_id ON cyber_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_cyber_reports_type ON cyber_reports(type);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE distillations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE cyber_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Activity Logs
CREATE POLICY "Users can view own activity logs" ON activity_logs
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Service role can insert activity logs" ON activity_logs
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for Quotes
CREATE POLICY "Users can view own quotes" ON quotes
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Service role can manage quotes" ON quotes
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for Distillations
CREATE POLICY "Users can view own distillations" ON distillations
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Service role can manage distillations" ON distillations
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for Leave Requests
CREATE POLICY "Users can view own leave requests" ON leave_requests
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Service role can manage leave requests" ON leave_requests
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for Cyber Reports
CREATE POLICY "Users can view own cyber reports" ON cyber_reports
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Service role can manage cyber reports" ON cyber_reports
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for Subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Service role can manage subscriptions" ON subscriptions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for Credit Transactions
CREATE POLICY "Users can view own credit transactions" ON credit_transactions
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Service role can manage credit transactions" ON credit_transactions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for subscriptions table
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
