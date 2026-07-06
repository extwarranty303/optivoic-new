create or replace function get_user_purchases_with_products(p_user_id uuid)
returns table (
  id uuid,
  created_at timestamptz,
  product_id uuid,
  product_title text,
  product_category text
) as $$
begin
  return query
  select
    p.id,
    p.created_at,
    p.product_id,
    pr.title as product_title,
    pr.category_name as product_category
  from
    purchases p
    join products pr on p.product_id = pr.id
  where
    p.user_id = p_user_id
  order by
    p.created_at desc;
end;
$$ language plpgsql;
