-- =================================================================
-- FIX ROW LEVEL SECURITY (RLS) POLICIES FOR PURCHASES TABLE
-- Execute this SQL script in your Supabase SQL Editor
-- =================================================================

-- 1. Enable RLS on purchases table
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- 2. Drop any legacy restrictive policies
DROP POLICY IF EXISTS "Allow select for authenticated users matching email or id" ON public.purchases;
DROP POLICY IF EXISTS "Allow insert for purchases" ON public.purchases;
DROP POLICY IF EXISTS "Admins full select access to purchases" ON public.purchases;
DROP POLICY IF EXISTS "Select policy for purchases" ON public.purchases;
DROP POLICY IF EXISTS "Insert policy for purchases" ON public.purchases;
DROP POLICY IF EXISTS "Update policy for purchases" ON public.purchases;

-- 3. Policy: Allow users to view purchases matching their auth UID or email, AND allow Admins to view ALL purchases
CREATE POLICY "Select policy for purchases"
ON public.purchases
FOR SELECT
USING (
  -- Admins can view all purchase records
  (LOWER(auth.jwt() ->> 'email') IN (SELECT LOWER(email) FROM public.admins))
  -- Users can view their own purchases by UID
  OR (user_id IS NOT NULL AND user_id = auth.uid())
  -- Users can view their own purchases by Email (e.g. manual grants before login)
  OR (user_email IS NOT NULL AND LOWER(user_email) = LOWER(auth.jwt() ->> 'email'))
);

-- 4. Policy: Allow inserts for purchasing and admin manual grants
CREATE POLICY "Insert policy for purchases"
ON public.purchases
FOR INSERT
WITH CHECK (true);

-- 5. Policy: Allow updates (e.g. auto-linking user_id upon login)
CREATE POLICY "Update policy for purchases"
ON public.purchases
FOR UPDATE
USING (
  (LOWER(auth.jwt() ->> 'email') IN (SELECT LOWER(email) FROM public.admins))
  OR (user_id IS NOT NULL AND user_id = auth.uid())
  OR (user_email IS NOT NULL AND LOWER(user_email) = LOWER(auth.jwt() ->> 'email'))
);
