-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  company VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create KPIs table
CREATE TABLE kpis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  value DECIMAL(15,2) NOT NULL,
  target DECIMAL(15,2) NOT NULL,
  change DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('on-track', 'at-risk', 'critical')) NOT NULL,
  department VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create VoC feedback table
CREATE TABLE voc_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer VARCHAR(200) NOT NULL,
  sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'neutral', 'negative')) NOT NULL,
  score INTEGER CHECK (score >= 1 AND score <= 10) NOT NULL,
  category VARCHAR(100) NOT NULL,
  feedback TEXT NOT NULL,
  source VARCHAR(100) NOT NULL,
  impact VARCHAR(20) CHECK (impact IN ('high', 'medium', 'low')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create VoE feedback table
CREATE TABLE voe_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee VARCHAR(200) NOT NULL,
  department VARCHAR(100) NOT NULL,
  sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'neutral', 'negative')) NOT NULL,
  engagement_score INTEGER CHECK (engagement_score >= 1 AND engagement_score <= 10) NOT NULL,
  feedback TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create surveys table
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(300) NOT NULL,
  description TEXT,
  status VARCHAR(20) CHECK (status IN ('draft', 'active', 'completed', 'archived')) NOT NULL DEFAULT 'draft',
  type VARCHAR(20) CHECK (type IN ('customer', 'employee', 'product', 'service')) NOT NULL,
  responses INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(300) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) CHECK (type IN ('critical', 'warning', 'info')) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('active', 'acknowledged', 'resolved')) NOT NULL DEFAULT 'active',
  priority VARCHAR(20) CHECK (priority IN ('high', 'medium', 'low')) NOT NULL,
  source VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(300) NOT NULL,
  description TEXT,
  category VARCHAR(20) CHECK (category IN ('executive', 'operational', 'financial', 'customer', 'employee')) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('draft', 'published', 'archived')) NOT NULL DEFAULT 'draft',
  author VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_department ON users(department);
CREATE INDEX idx_kpis_department ON kpis(department);
CREATE INDEX idx_kpis_status ON kpis(status);
CREATE INDEX idx_voc_feedback_sentiment ON voc_feedback(sentiment);
CREATE INDEX idx_voc_feedback_category ON voc_feedback(category);
CREATE INDEX idx_voc_feedback_created_at ON voc_feedback(created_at);
CREATE INDEX idx_voe_feedback_department ON voe_feedback(department);
CREATE INDEX idx_voe_feedback_sentiment ON voe_feedback(sentiment);
CREATE INDEX idx_voe_feedback_created_at ON voe_feedback(created_at);
CREATE INDEX idx_surveys_status ON surveys(status);
CREATE INDEX idx_surveys_type ON surveys(type);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_type ON alerts(type);
CREATE INDEX idx_alerts_priority ON alerts(priority);
CREATE INDEX idx_alerts_created_at ON alerts(created_at);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_at ON reports(created_at);

-- Create functions to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kpis_updated_at BEFORE UPDATE ON kpis FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_voc_feedback_updated_at BEFORE UPDATE ON voc_feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_voe_feedback_updated_at BEFORE UPDATE ON voe_feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_surveys_updated_at BEFORE UPDATE ON surveys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE voc_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE voe_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (you can customize these based on your needs)
CREATE POLICY "Users can view all records" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert records" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own records" ON users FOR UPDATE USING (true);

CREATE POLICY "Users can view all KPIs" ON kpis FOR SELECT USING (true);
CREATE POLICY "Users can insert KPIs" ON kpis FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update KPIs" ON kpis FOR UPDATE USING (true);

CREATE POLICY "Users can view all VoC feedback" ON voc_feedback FOR SELECT USING (true);
CREATE POLICY "Users can insert VoC feedback" ON voc_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update VoC feedback" ON voc_feedback FOR UPDATE USING (true);

CREATE POLICY "Users can view all VoE feedback" ON voe_feedback FOR SELECT USING (true);
CREATE POLICY "Users can insert VoE feedback" ON voe_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update VoE feedback" ON voe_feedback FOR UPDATE USING (true);

CREATE POLICY "Users can view all surveys" ON surveys FOR SELECT USING (true);
CREATE POLICY "Users can insert surveys" ON surveys FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update surveys" ON surveys FOR UPDATE USING (true);

CREATE POLICY "Users can view all alerts" ON alerts FOR SELECT USING (true);
CREATE POLICY "Users can insert alerts" ON alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update alerts" ON alerts FOR UPDATE USING (true);

CREATE POLICY "Users can view all reports" ON reports FOR SELECT USING (true);
CREATE POLICY "Users can insert reports" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update reports" ON reports FOR UPDATE USING (true);