-- ============================================================
-- Pre-launch blockers — applied to live DB on 2026-05-04
-- ============================================================
-- Three things this addresses:
--   1. Every product had a NULL/empty sku, so the "SKU" row in the
--      detail-page Specifications accordion rendered blank.
--   2. The brand 'BlueArmour' was inserted with the wrong spelling;
--      the actual brand is 'BluArmor' (per thebluarmor.com).
--   3. Helmet Comm category had zero products → category nav tab
--      rendered as a dead end. Seeded 3 Sena + 3 BluArmor flagship
--      and entry models so the category lights up.
--
-- The corresponding code-side fixes (filter empty categories, drop
-- the fake newsletter form, remove dead CartContext / CartProvider,
-- delete CartPage / CheckoutPage / CartDrawer) live in the same
-- commit but aren't part of this SQL.
-- ============================================================

BEGIN;

-- 1. SKU backfill from slug.
UPDATE products SET sku = upper(slug) WHERE sku IS NULL OR sku = '';

-- 2. Brand spelling.
UPDATE brands SET name = 'BluArmor', slug = 'bluarmor' WHERE slug = 'bluearmour';

-- 3. Helmet Comm seed (prices in PAISE).
INSERT INTO products (
  slug, name, description, price, image_url, keywords,
  has_variants, is_active, display_order, brand_id, category_id, stock_quantity, sku
)
SELECT
  v.slug, v.name, v.description, v.price, v.image_url, v.keywords,
  false, true, v.display_order,
  CASE WHEN v.slug LIKE 'sena-%' THEN (SELECT id FROM brands WHERE slug='sena')
       ELSE                            (SELECT id FROM brands WHERE slug='bluarmor')
  END,
  (SELECT id FROM categories WHERE slug='helmet-comm'),
  5,
  upper(v.slug)
FROM (VALUES
  ('sena-5s', 'Sena 5S Bluetooth Headset',
   'Sena 5S Bluetooth communication system — entry-level intercom with 4-rider conferencing up to 700 m, multipair Bluetooth, 8 hr talk time, water-resistant. Designed for the daily commuter and weekend rider.',
   1259900,
   'https://senaindia.com/wp-content/uploads/2024/05/5s_main.png',
   ARRAY['Sena','5S','bluetooth','communicator','intercom','helmet bluetooth','headset']::TEXT[],
   10),
  ('sena-50s', 'Sena 50S Mesh Intercom',
   'Flagship Sena 50S Mesh Intercom with SOUND BY Harman Kardon. Multi-Channel Open Mesh + Group Mesh + Bluetooth modes, range up to 8 km, voice commands, BT 5.0. The benchmark for group rides.',
   3799900,
   'https://senaindia.com/wp-content/uploads/2024/05/50s_main.png',
   ARRAY['Sena','50S','Mesh','Harman Kardon','bluetooth','communicator','intercom','helmet bluetooth','flagship']::TEXT[],
   11),
  ('sena-smh10', 'Sena SMH-10 Bluetooth Headset',
   'Sena SMH-10 — long-running multipoint Bluetooth headset with 900 m intercom range, 12 hr talk time, 4-way conference. The legacy classic that still ships in 2026.',
   1399900,
   'https://senaindia.com/wp-content/uploads/2024/05/smh10_main.png',
   ARRAY['Sena','SMH-10','SMH10','bluetooth','communicator','intercom','helmet bluetooth','headset']::TEXT[],
   12),
  ('bluarmor-c10', 'BluArmor C10',
   'BluArmor C10 — entry helmet Bluetooth headset for music, calls, and turn-by-turn navigation. Made in India, fits all helmet types (full-face, modular, half-shell, motocross). Up to 20 hrs single-charge.',
   499900,
   'https://cdn.shopify.com/s/files/1/2632/4162/files/Product-Image.jpg?v=1774532162',
   ARRAY['BluArmor','C10','HS1','bluetooth','communicator','helmet bluetooth','intercom','navigation']::TEXT[],
   13),
  ('bluarmor-c50-plus', 'BluArmor C50 Plus',
   'BluArmor C50 Plus — premium helmet communication device with 2-rider intercom, music sharing, voice commands. India-engineered for Indian helmet shapes.',
   1899900,
   'https://cdn.shopify.com/s/files/1/2632/4162/files/C50_Plus_Box.jpg?v=1733299239',
   ARRAY['BluArmor','C50','C50 Plus','bluetooth','communicator','intercom','helmet bluetooth','HD audio']::TEXT[],
   14),
  ('bluarmor-c60-pro', 'BluArmor C60 Pro',
   'BluArmor C60 Pro — flagship India-made intercom: mesh-style group ride support, premium audio, dust + rain resistant. Designed for tour groups.',
   2499900,
   'https://cdn.shopify.com/s/files/1/2632/4162/files/C60-Pro_Product-img.jpg?v=1774528464',
   ARRAY['BluArmor','C60','C60 Pro','bluetooth','communicator','intercom','helmet bluetooth','flagship','mesh']::TEXT[],
   15)
) AS v(slug, name, description, price, image_url, keywords, display_order)
ON CONFLICT (slug) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  price       = EXCLUDED.price,
  image_url   = EXCLUDED.image_url,
  keywords    = EXCLUDED.keywords,
  is_active   = EXCLUDED.is_active,
  brand_id    = EXCLUDED.brand_id,
  category_id = EXCLUDED.category_id,
  sku         = EXCLUDED.sku;

COMMIT;

-- 4. Backfill keywords[] for the 84 products that previously had
--    an empty array. Was applied via a separate ad-hoc query in the
--    Studio editor — see commit message for the full command.
