-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    visitor_name TEXT NOT NULL,
    visitor_email TEXT,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    emotion TEXT NOT NULL,
    reply TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    is_approved BOOLEAN DEFAULT FALSE
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert new comments
-- But only with is_approved set to false by default
CREATE POLICY "Anyone can insert comments" ON public.comments
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create policy to allow anyone to read approved comments
CREATE POLICY "Anyone can read approved comments" ON public.comments
    FOR SELECT
    TO public
    USING (is_approved = TRUE);

-- Create policy to allow authenticated admin users to read all comments
CREATE POLICY "Admins can read all comments" ON public.comments
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow authenticated admin users to update comments
CREATE POLICY "Admins can update comments" ON public.comments
    FOR UPDATE
    TO authenticated
    USING (true);

-- Create policy to allow authenticated admin users to delete comments
CREATE POLICY "Admins can delete comments" ON public.comments
    FOR DELETE
    TO authenticated
    USING (true);

-- Add comments to public schema
GRANT ALL ON public.comments TO postgres, authenticated, anon;
GRANT USAGE, SELECT ON SEQUENCE public.comments_id_seq TO postgres, authenticated, anon; 