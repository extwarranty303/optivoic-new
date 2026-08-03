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
CREATE POLICY "Users can only view their own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Allow admins to see all purchases for support and management.
DROP POLICY IF EXISTS "Allow admin read access to all purchases" ON purchases;
CREATE POLICY "Allow admin read access to all purchases" ON purchases
  FOR SELECT USING (
    exists(select 1 from admins where user_id = auth.uid())
  );

-- NOTE: Inserts for `purchases` should only be done via a secure Edge Function.