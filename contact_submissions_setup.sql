-- Create contact_submissions table for OptiVoic landing page
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  help_request TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'optivoic_landing_page',
  status TEXT DEFAULT 'new'
);

-- Add RLS (Row Level Security) policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for contact form submissions)
CREATE POLICY "Allow anonymous contact form submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all submissions (for admin access)
CREATE POLICY "Allow authenticated users to read contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create index for better query performance
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);