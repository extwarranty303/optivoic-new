# Supabase setup for Optivoic

## 1. Create the project
- Create a new Supabase project for Optivoic.
- Copy the project URL and anon key into the Vercel / environment variables for this app.

## 2. Required environment variables
Set these in Vercel or your local environment:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_RESEND_API_KEY (optional, for purchase emails)

## 3. Tables to create
### admins
- id uuid primary key default gen_random_uuid()
- email text unique not null
- created_at timestamptz default now()

### products
- id text primary key
- title text not null
- is_active boolean default true
- current_file_id uuid null

### files
- id uuid primary key default gen_random_uuid()
- product_id text references products(id)
- storage_path text not null
- original_filename text not null
- version_notes text
- created_at timestamptz default now()

### purchases
- id uuid primary key default gen_random_uuid()
- user_id uuid not null
- user_email text not null
- template_id text not null
- created_at timestamptz default now()

### projects
- id uuid primary key default gen_random_uuid()
- client_email text not null
- project_name text not null
- status_step int default 1
- created_at timestamptz default now()

### blog_posts
- id uuid primary key default gen_random_uuid()
- title text not null
- slug text unique not null
- excerpt text
- content text not null
- category text default 'Insights'
- status text default 'draft'
- keywords text
- meta_description text
- featured_image text
- schema_type text default 'Article'
- created_at timestamptz default now()
- updated_at timestamptz default now()

## 4. Storage
Create a storage bucket named `templates` with public access disabled.

## 5. Security
- Enable Row Level Security (RLS) as needed.
- The admin panel and portal currently rely on authenticated users plus the admins table for authorization.
- For production, add RLS policies to limit access to purchases and blog content.
