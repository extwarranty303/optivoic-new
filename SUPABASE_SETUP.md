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
*Note: It's best practice to use foreign key constraints (e.g., `references auth.users(id)`) to ensure data integrity between tables.*

### Core Auth & E-commerce Tables

#### `auth.users` (Built-in)
- This table is managed by Supabase Auth. Other tables will reference its `id` column.

#### `products`
- `id` text primary key (can be a slug or UUID)
- `title` text not null
- `price_cents` integer not null (storing currency as integers is best practice)
- `description` text
- `icon` text
- `category_name` text
- `route` text
- `format` text
- `hero_heading` text
- `hero_sub` text
- `problem_copy` jsonb
- `features` jsonb
- `who_for` jsonb
- `deliverables` jsonb
- `is_active` boolean default true
- `current_file_id` uuid null (can reference `files.id`)

#### `files`
- `id` uuid primary key default `gen_random_uuid()`
- `product_id` text references `products(id)` on delete set null
- `storage_path` text not null
- `original_filename` text not null
- `version_notes` text
- `created_at` timestamptz default `now()`

#### `orders` (New, based on `CheckoutModal.jsx`)
- `id` uuid primary key default `gen_random_uuid()`
- `user_id` uuid references `auth.users(id)` not null
- `paypal_transaction_id` text
- `total_amount_cents` integer not null
- `status` text default 'pending'
- `created_at` timestamptz default `now()`

#### `purchases` (Updated, based on `CheckoutModal.jsx`)
- *This schema is more robust than the original. It links a purchase to a user, a product, and a specific order.*
- `id` uuid primary key default `gen_random_uuid()`
- `user_id` uuid references `auth.users(id)` not null
- `product_id` text references `products(id)` not null
- `user_email` text
- `order_id` uuid references `orders(id)`
- `created_at` timestamptz default `now()`

### Content Tables

#### `blog_posts`
- `id` uuid primary key default `gen_random_uuid()`
- `title` text not null
- `slug` text unique not null
- `excerpt` text
- `content` text not null
- `category` text default 'Insights'
- `status` text default 'draft'
- `keywords` text
- `meta_description` text
- `featured_image` text
- `schema_type` text default 'Article'
- `created_at` timestamptz default `now()`
- `updated_at` timestamptz default `now()`

### Operational Tables

#### `admins`
- `id` uuid primary key default `gen_random_uuid()`
- `user_id` uuid references `auth.users(id)` unique
- `email` text unique not null
- `created_at` timestamptz default `now()`

#### `contact_submissions` (New, based on `OptiVoicLanding.jsx`)
- `id` integer primary key (auto-incrementing)
- `name` text not null
- `email` text not null
- `phone` text
- `help_request` text not null
- `submitted_at` timestamptz default `now()`
- `source` text default 'optivoic_landing_page'
- `status` text default 'new'

#### `projects`
- `id` uuid primary key default `gen_random_uuid()`
- `client_email` text not null
- `project_name` text not null
- `status_step` int default 1
- `created_at` timestamptz default `now()`

## 4. Storage
Create a storage bucket named `templates` with public access disabled.

## 5. Security
- Enable Row Level Security (RLS) as needed.
- The admin panel and portal currently rely on authenticated users plus the `admins` table for authorization.
- For production, add RLS policies to limit access. For example:
  - Users should only be able to see their own `purchases` and `orders`.
  - Public users should only be able to read `blog_posts` with a 'published' status.
  - Only authenticated users should be able to create `contact_submissions`.
