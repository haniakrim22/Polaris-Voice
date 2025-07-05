-- Insert sample users
INSERT INTO users (email, first_name, last_name, department, role, company) VALUES
('john.doe@polarisvoice.com', 'John', 'Doe', 'Executive', 'CEO', 'Polaris Voice+'),
('sarah.johnson@polarisvoice.com', 'Sarah', 'Johnson', 'Customer Success', 'VP Customer Success', 'Polaris Voice+'),
('mike.chen@polarisvoice.com', 'Mike', 'Chen', 'Engineering', 'CTO', 'Polaris Voice+'),
('emily.davis@polarisvoice.com', 'Emily', 'Davis', 'Marketing', 'Marketing Director', 'Polaris Voice+'),
('alex.wilson@polarisvoice.com', 'Alex', 'Wilson', 'Sales', 'Sales Manager', 'Polaris Voice+'),
('lisa.brown@polarisvoice.com', 'Lisa', 'Brown', 'HR', 'HR Manager', 'Polaris Voice+'),
('david.taylor@polarisvoice.com', 'David', 'Taylor', 'Finance', 'CFO', 'Polaris Voice+'),
('jennifer.white@polarisvoice.com', 'Jennifer', 'White', 'Operations', 'Operations Manager', 'Polaris Voice+');

-- Insert sample KPIs
INSERT INTO kpis (name, value, target, change, status, department) VALUES
('Time to Value', 14.2, 15.0, -5.5, 'on-track', 'Customer Success'),
('Customer Retention Rate', 94.8, 95.0, 2.1, 'on-track', 'Customer Success'),
('Average Revenue Per User', 2847.50, 3000.00, -2.8, 'at-risk', 'Sales'),
('Net Promoter Score', 72, 75, 8.2, 'on-track', 'Customer Success'),
('First Call Resolution', 87.3, 90.0, -1.2, 'at-risk', 'Customer Success'),
('Voice of Employee Index', 8.1, 8.5, -3.1, 'at-risk', 'HR'),
('Monthly Recurring Revenue', 485000.00, 500000.00, 12.5, 'on-track', 'Sales'),
('Customer Acquisition Cost', 1250.00, 1200.00, 4.2, 'at-risk', 'Marketing'),
('Employee Satisfaction', 8.4, 8.5, 1.8, 'on-track', 'HR'),
('System Uptime', 99.7, 99.9, -0.2, 'critical', 'Engineering');

-- Insert sample VoC feedback
INSERT INTO voc_feedback (customer, sentiment, score, category, feedback, source, impact) VALUES
('Acme Corp', 'positive', 9, 'Product Quality', 'The new analytics dashboard is incredibly intuitive and has saved us hours of manual reporting. Great work!', 'Email Survey', 'high'),
('TechStart Inc', 'negative', 3, 'Support Response', 'Waited 2 hours for a response to a critical issue. This is unacceptable for a premium service.', 'Support Ticket', 'high'),
('Global Solutions Ltd', 'positive', 8, 'Feature Request', 'Love the real-time alerts feature. Would be great to have mobile push notifications as well.', 'Product Feedback', 'medium'),
('Innovation Labs', 'neutral', 6, 'User Experience', 'The interface is functional but could be more modern. Some buttons are hard to find.', 'User Interview', 'medium'),
('Enterprise Systems', 'positive', 9, 'Integration', 'Seamless integration with our existing CRM. Setup was much easier than expected.', 'Implementation Review', 'high'),
('StartupXYZ', 'negative', 4, 'Pricing', 'The pricing model is confusing and seems expensive for smaller teams like ours.', 'Sales Call', 'medium'),
('MegaCorp Industries', 'positive', 10, 'ROI', 'Achieved 300% ROI within 6 months. This platform has transformed our customer insights.', 'Case Study', 'high'),
('Digital Dynamics', 'neutral', 7, 'Training', 'Good platform but needs better onboarding materials. Took our team longer to get up to speed.', 'Training Feedback', 'low'),
('Future Tech', 'positive', 8, 'Reliability', 'System has been rock solid. No downtime issues in the past 3 months.', 'Health Check', 'medium'),
('CloudFirst Co', 'negative', 2, 'Performance', 'Dashboard loading times are too slow, especially with large datasets. Needs optimization.', 'Performance Review', 'high');

-- Insert sample VoE feedback
INSERT INTO voe_feedback (employee, department, sentiment, engagement_score, feedback, category) VALUES
('Alice Johnson', 'Engineering', 'positive', 8, 'Great work-life balance and challenging projects. Love the flexible remote work policy.', 'Work Environment'),
('Bob Smith', 'Sales', 'neutral', 6, 'Commission structure could be clearer. Sometimes hard to track progress towards goals.', 'Compensation'),
('Carol Williams', 'Marketing', 'positive', 9, 'Excellent collaboration tools and supportive team culture. Feel valued and heard.', 'Team Collaboration'),
('Daniel Brown', 'Customer Success', 'negative', 4, 'Overwhelming workload lately. Need more resources to handle the growing customer base.', 'Workload'),
('Eva Martinez', 'HR', 'positive', 8, 'Good career development opportunities. Appreciate the learning and development budget.', 'Career Growth'),
('Frank Wilson', 'Finance', 'neutral', 7, 'Office facilities are good but could use better coffee and more meeting rooms.', 'Facilities'),
('Grace Lee', 'Operations', 'positive', 9, 'Leadership is transparent and communicative. Feel well-informed about company direction.', 'Leadership'),
('Henry Davis', 'Engineering', 'negative', 5, 'Too many meetings cutting into development time. Need more focus time for coding.', 'Productivity'),
('Iris Chen', 'Sales', 'positive', 8, 'Great sales tools and CRM integration. Makes my job much easier and more efficient.', 'Tools & Technology'),
('Jack Thompson', 'Marketing', 'neutral', 6, 'Benefits package is decent but health insurance could be better. Dental coverage is lacking.', 'Benefits');

-- Insert sample surveys
INSERT INTO surveys (title, description, status, type, responses, completion_rate) VALUES
('Q4 Customer Satisfaction Survey', 'Quarterly survey to measure overall customer satisfaction and identify improvement areas', 'active', 'customer', 1247, 68.5),
('Employee Engagement Survey 2024', 'Annual comprehensive survey to assess employee satisfaction, engagement, and workplace culture', 'completed', 'employee', 892, 94.2),
('Product Feature Feedback', 'Collect feedback on recently launched analytics dashboard features', 'active', 'product', 456, 72.1),
('Support Service Quality Assessment', 'Evaluate customer support experience and service quality metrics', 'active', 'service', 234, 45.8),
('New Hire Onboarding Experience', 'Gather feedback from new employees about their onboarding experience', 'draft', 'employee', 0, 0.0),
('Customer Churn Analysis Survey', 'Understand reasons behind customer churn and identify retention opportunities', 'completed', 'customer', 89, 23.4),
('Product Roadmap Priorities', 'Help prioritize upcoming product features based on customer needs', 'active', 'product', 678, 81.3),
('Remote Work Effectiveness', 'Assess the effectiveness of remote work policies and tools', 'archived', 'employee', 756, 89.7);

-- Insert sample alerts
INSERT INTO alerts (title, message, type, status, priority, source) VALUES
('Critical System Performance Issue', 'Dashboard response time has exceeded 5 seconds for the past 15 minutes. Immediate attention required.', 'critical', 'active', 'high', 'System Monitor'),
('High Customer Churn Rate Detected', 'Customer churn rate has increased by 15% this week compared to last week. Investigation needed.', 'warning', 'acknowledged', 'high', 'Analytics Engine'),
('Low Employee Satisfaction Score', 'Engineering department satisfaction score dropped below threshold (6.5). HR intervention recommended.', 'warning', 'active', 'medium', 'HR Analytics'),
('Revenue Target at Risk', 'Monthly revenue is tracking 12% below target with 5 days remaining in the month.', 'critical', 'active', 'high', 'Sales Analytics'),
('Security Audit Reminder', 'Quarterly security audit is due in 7 days. Please schedule with IT security team.', 'info', 'active', 'low', 'Compliance System'),
('Database Storage Warning', 'Database storage utilization has reached 85%. Consider scaling up storage capacity.', 'warning', 'resolved', 'medium', 'Infrastructure Monitor'),
('Customer Support Backlog', 'Support ticket backlog has increased to 150+ tickets. Additional resources may be needed.', 'warning', 'acknowledged', 'medium', 'Support System'),
('API Rate Limit Approaching', 'Third-party API usage is at 90% of monthly limit. Monitor usage closely.', 'info', 'active', 'low', 'API Monitor'),
('Positive NPS Trend', 'Net Promoter Score has improved by 8 points this quarter. Great work team!', 'info', 'resolved', 'low', 'Customer Analytics'),
('Backup Failure Alert', 'Automated backup failed for customer database. Manual backup required immediately.', 'critical', 'resolved', 'high', 'Backup System');

-- Insert sample reports
INSERT INTO reports (title, description, category, status, author) VALUES
('Q4 Executive Summary Report', 'Comprehensive quarterly report covering all key metrics, achievements, and strategic initiatives', 'executive', 'published', 'John Doe'),
('Customer Success Metrics Dashboard', 'Monthly operational report focusing on customer satisfaction, retention, and support metrics', 'operational', 'published', 'Sarah Johnson'),
('Financial Performance Analysis', 'Detailed financial analysis including revenue, costs, profitability, and budget variance', 'financial', 'published', 'David Taylor'),
('Voice of Customer Insights Report', 'Analysis of customer feedback trends, sentiment analysis, and actionable insights', 'customer', 'published', 'Emily Davis'),
('Employee Engagement Study', 'Comprehensive analysis of employee satisfaction, engagement drivers, and retention factors', 'employee', 'draft', 'Lisa Brown'),
('Product Usage Analytics', 'Detailed analysis of product feature adoption, user behavior, and engagement patterns', 'operational', 'published', 'Mike Chen'),
('Sales Performance Review', 'Monthly sales performance analysis including pipeline, conversion rates, and team metrics', 'operational', 'published', 'Alex Wilson'),
('Customer Churn Analysis', 'Deep dive into customer churn patterns, reasons, and prevention strategies', 'customer', 'draft', 'Sarah Johnson'),
('IT Infrastructure Report', 'Quarterly review of system performance, security, and infrastructure optimization', 'operational', 'published', 'Mike Chen'),
('Market Research Summary', 'Analysis of market trends, competitive landscape, and growth opportunities', 'executive', 'archived', 'Emily Davis');