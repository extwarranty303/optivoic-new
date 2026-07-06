-- Create contact_submissions table for OptiVoic landing page
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  help_request TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'optivoic_landing_page',
  status TEXT DEFAULT 'new'
);

-- Handle schema migrations for existing tables non-destructively.
DO $$
BEGIN
  -- Rename legacy 'created_at' column to 'submitted_at' to match current schema.
  IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='contact_submissions' AND column_name='created_at')
  AND NOT EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='contact_submissions' AND column_name='submitted_at') THEN
    ALTER TABLE contact_submissions RENAME COLUMN created_at TO submitted_at;
  END IF;
END $$;

-- Add 'status' column if it doesn't exist, for backward compatibility.
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- Add RLS (Row Level Security) policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for contact form submissions)
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_submissions;
CREATE POLICY "Allow anonymous contact form submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Allow admins to read all submissions. This is more secure than allowing any authenticated user.
-- It checks if the currently logged-in user's ID exists in the `admins` table.
DROP POLICY IF EXISTS "Allow admins to read contact submissions" ON contact_submissions;
CREATE POLICY "Allow admins to read contact submissions" ON contact_submissions
  FOR SELECT USING (
    exists(select 1 from admins where user_id = auth.uid())
  );

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);