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

-- Allow admins to see all purchases for support and management.
DROP POLICY IF EXISTS "Allow admin read access to all purchases" ON purchases;
CREATE POLICY "Allow admin read access to all purchases" ON purchases
  FOR SELECT USING (
    exists(select 1 from admins where user_id = auth.uid())
  );

-- NOTE: Inserts for `purchases` should only be done via a secure Edge Function.

--
-- Policies for `files` table
--
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view files for products they purchased" ON files;
CREATE POLICY "Users can view files for products they purchased" ON files
  FOR SELECT USING (
    exists (
      select 1 from products p
      join purchases pur on (pur.product_id = p.id or pur.template_id = p.id)
      where p.current_file_id = files.id
      and (
        pur.user_id = auth.uid()
        or (pur.user_email is not null and lower(pur.user_email) = lower(auth.jwt() ->> 'email'))
      )
    )
  );

-- Allow admins full access to files
DROP POLICY IF EXISTS "Allow admin full access to files" ON files;
CREATE POLICY "Allow admin full access to files" ON files
  FOR ALL USING (
    exists (select 1 from admins where user_id = auth.uid())
  );