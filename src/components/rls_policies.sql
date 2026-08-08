-- Enable RLS for all relevant tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

--
-- Policies for `products` table
--
DROP POLICY IF EXISTS "Allow public read access to active products" ON products;
CREATE POLICY "Allow public read access to active products" ON products
  FOR SELECT USING (is_active = true);

--
-- Policies for `orders` table
--
DROP POLICY IF EXISTS "Users can only view their own orders" ON orders;
CREATE POLICY "Users can only view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- NOTE: Inserts for `orders` should only be done via a secure Edge Function,
-- so we do not need an INSERT policy for client-side users.

--
-- Policies for `purchases` table
--
DROP POLICY IF EXISTS "Users can only view their own purchases" ON purchases;
DROP POLICY IF EXISTS "Users can view their own purchases" ON purchases;

CREATE POLICY "Users can view their own purchases" ON purchases
  FOR SELECT USING (
    auth.uid() = user_id
    OR
    (user_email IS NOT NULL AND lower(user_email) = lower(auth.jwt() ->> 'email'))
  );

DROP POLICY IF EXISTS "Users can update their own purchases user_id" ON purchases;
CREATE POLICY "Users can update their own purchases user_id" ON purchases
  FOR UPDATE USING (
    auth.uid() = user_id
    OR
    (user_email IS NOT NULL AND lower(user_email) = lower(auth.jwt() ->> 'email'))
  );

-- Allow admins full access to purchases for management and manual overrides
DROP POLICY IF EXISTS "Allow admin read access to all purchases" ON purchases;
DROP POLICY IF EXISTS "Allow admins full access to purchases" ON purchases;
CREATE POLICY "Allow admins full access to purchases" ON purchases
  FOR ALL USING (
    exists(select 1 from admins where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email'))
  );

--
-- Policies for `files` table
--
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view files for products they purchased" ON files;
DROP POLICY IF EXISTS "Allow read access to files for active products" ON files;

CREATE POLICY "Allow read access to files for active products" ON files
  FOR SELECT USING (
    exists (
      select 1 from products p
      where (p.current_file_id = files.id or p.id = files.product_id)
      and p.is_active = true
    )
  );

-- Allow admins full access to files
DROP POLICY IF EXISTS "Allow admin full access to files" ON files;
CREATE POLICY "Allow admin full access to files" ON files
  FOR ALL USING (
    exists (select 1 from admins where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email'))
  );