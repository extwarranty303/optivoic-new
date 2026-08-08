-- Create user_bookmarks table in Supabase
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT,
    post_slug TEXT NOT NULL,
    post_title TEXT NOT NULL,
    post_category TEXT,
    post_excerpt TEXT,
    post_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_post UNIQUE (user_id, post_slug)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own bookmarks
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.user_bookmarks;
CREATE POLICY "Users can view own bookmarks" ON public.user_bookmarks
    FOR SELECT USING (
        auth.uid() = user_id 
        OR (user_email IS NOT NULL AND lower(user_email) = lower(auth.jwt() ->> 'email'))
    );

-- Allow users to insert their own bookmarks
DROP POLICY IF EXISTS "Users can insert own bookmarks" ON public.user_bookmarks;
CREATE POLICY "Users can insert own bookmarks" ON public.user_bookmarks
    FOR INSERT WITH CHECK (
        auth.uid() = user_id 
        OR (user_email IS NOT NULL AND lower(user_email) = lower(auth.jwt() ->> 'email'))
    );

-- Allow users to delete their own bookmarks
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.user_bookmarks;
CREATE POLICY "Users can delete own bookmarks" ON public.user_bookmarks
    FOR DELETE USING (
        auth.uid() = user_id 
        OR (user_email IS NOT NULL AND lower(user_email) = lower(auth.jwt() ->> 'email'))
    );
