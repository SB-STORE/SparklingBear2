-- ============================================================
-- Taxonomy reshape: split "Riding Gears & Luggage" into 5 cells,
-- pull BOBO out of "Bike Protection" into Mobile Mounts, add new
-- categories/brands, add keyword search infrastructure.
-- ============================================================
-- Run in Supabase Studio → SQL Editor. Single transaction; rolls
-- back if anything fails. Idempotent: ON CONFLICT clauses + guarded
-- ALTER TABLEs.
--
-- Reference: agreed taxonomy with Puru:
--   Helmets               LS2, Axor, SMK, Studds, Steelbird, Vega
--   Bike Protection       Zana, Moto Torque, Moto Care, MADDOG
--   Aux Lights            HJG, MADDOG, Future Eyes, Nighteye
--   Riding Jackets        Rynox, Viaterra, Raida
--   Riding Pants          Rynox, Viaterra, Raida
--   Riding Gloves         Rynox, Viaterra, Cramster, Raida
--   Riding Boots          Rynox, Cramster, Raida, Orazo, Korda
--   Mobile Mounts         BOBO
--   Luggage               Rynox, Viaterra, Cramster
--   Helmet Comm           Sena, BlueArmour
-- ============================================================

BEGIN;

-- 1. brands.category_id → nullable. Cross-category brands like Rynox
--    (jackets + gloves + luggage) need to be a single row not three,
--    or the BrandsPage shows duplicates. NULL = "spans categories".
ALTER TABLE brands ALTER COLUMN category_id DROP NOT NULL;


-- 2. New categories.
INSERT INTO categories (name, slug, description, display_order, is_active) VALUES
  ('Riding Jackets',           'riding-jackets',  'Mesh, all-weather, and touring riding jackets',          5, true),
  ('Riding Pants',             'riding-pants',    'Riding pants, jeans, and trousers',                       6, true),
  ('Riding Gloves',            'riding-gloves',   'Summer, all-weather, and touring gloves',                 7, true),
  ('Riding Boots',             'riding-boots',    'Adventure, touring, and racing boots',                    8, true),
  ('Mobile Mounts & Chargers', 'mobile-mounts',   'Phone mounts, USB chargers, and accessories',             9, true),
  ('Luggage',                  'luggage',         'Tank bags, saddle bags, tail bags, and panniers',        10, true),
  ('Helmet Comm & Bluetooth',  'helmet-comm',     'Bluetooth communicators for helmets',                    11, true)
ON CONFLICT (slug) DO NOTHING;


-- 3. Retire the old combined "Riding Gears & Luggage" category. Products
--    move into the new specialised categories below; the row is kept
--    for FK history but hidden from the UI.
UPDATE categories SET is_active = false WHERE slug = 'riding-gears-luggage';


-- 4. Brand cleanup.
-- 4a. Auto Engina: dropped per taxonomy.
UPDATE brands SET is_active = false WHERE slug = 'auto-engina';
UPDATE products
SET    is_active = false
WHERE  brand_id  = (SELECT id FROM brands WHERE slug = 'auto-engina');

-- 4b. Cross-category brands → category_id = NULL. Single brand row per
--     brand, with products carrying the per-product category.
UPDATE brands
SET    category_id = NULL
WHERE  slug IN ('rynox','viaterra','cramster','raida','moto-torque');

-- 4c. New brands.
INSERT INTO brands (name, slug, category_id, is_active, display_order) VALUES
  ('Steelbird',  'steelbird',  (SELECT id FROM categories WHERE slug='helmets'),      true,  90),
  ('Vega',       'vega',       (SELECT id FROM categories WHERE slug='helmets'),      true,  91),
  ('Nighteye',   'nighteye',   (SELECT id FROM categories WHERE slug='aux-lights'),   true,  92),
  ('Orazo',      'orazo',      (SELECT id FROM categories WHERE slug='riding-boots'), true,  93),
  ('Korda',      'korda',      (SELECT id FROM categories WHERE slug='riding-boots'), true,  94),
  ('Sena',       'sena',       (SELECT id FROM categories WHERE slug='helmet-comm'),  true,  95),
  ('BlueArmour', 'bluearmour', (SELECT id FROM categories WHERE slug='helmet-comm'),  true,  96)
ON CONFLICT (slug) DO NOTHING;


-- 5. Re-categorize existing products from "Riding Gears & Luggage"
--    into the new specialised categories.

-- 5a. → Riding Jackets
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug='riding-jackets')
WHERE slug IN (
  'cramster-eclipse','cramster-flux-jacket',
  'moto-torque-blade-pro','moto-torque-vento',
  'raida-tourbine-jacket','raida-revlox-rain-jacket',
  'rynox-air-gt-4','rynox-tornado-pro-4','rynox-storm-evo','rynox-advento-pro','rynox-stealth-evo-4',
  'viaterra-spencer-jacket'
);

-- 5b. → Riding Pants
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug='riding-pants')
WHERE slug IN (
  'cramster-velocity-jeans',
  'viaterra-spencer-pants'
);

-- 5c. → Riding Gloves
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug='riding-gloves')
WHERE slug IN (
  'cramster-breezer-sp','cramster-k2k-gloves',
  'moto-torque-superior-pro','moto-torque-hostile',
  'raida-cruiserpro-ii','raida-airwave-gloves',
  'rynox-air-gt-gloves',
  'viaterra-holeshot-pro'
);

-- 5d. → Riding Boots
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug='riding-boots')
WHERE slug IN (
  'cramster-flux-boots',
  'raida-tourer-boots'
);

-- 5e. → Luggage
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug='luggage')
WHERE slug IN (
  'cramster-colt-saddlebags','cramster-stallion-saddlebags','cramster-turtle-tank-bag',
  'raida-compass-v70',
  'rynox-navigator-v3','rynox-nomad-saddlebag',
  'viaterra-claw-tailbag','viaterra-claw-mini','viaterra-hammerhead-45l',
  'viaterra-leh-saddlebags','viaterra-fly-tank-bag'
);

-- 5f. BOBO → Mobile Mounts & Chargers (was wrongly under Bike Protection).
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug='mobile-mounts')
WHERE slug IN (
  'bobo-bm4','bobo-bm4-pro','bobo-bm1','bobo-bm10','bobo-bm10h-pro','bobo-bm17h-pro'
);

-- 5g. Orphans — items that don't fit any agreed category. Deactivate
--     so they don't render anywhere; we can resurrect them later if a
--     "Body Armour" or "Bike Covers" category is added.
UPDATE products SET is_active = false
WHERE  slug IN (
  'cramster-rage-knee-guards',   -- knee armour; no Body Armour cat yet
  'raida-revlox-shoe-cover',     -- rain shoe cover; not in taxonomy
  'raida-seasonpro-cover'        -- bike cover; not in taxonomy
);


-- 6. Search infrastructure.
-- 6a. Hand-curated keyword/synonym array. Lets us teach "foglight" =
--     "aux light" = "auxiliary light" by listing them all in this column.
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS keywords TEXT[] NOT NULL DEFAULT '{}';

-- 6b. Generated tsvector built from name + description + keywords.
--     Brand and category aren't denormalised here (they live in joined
--     tables) — at query time the React layer can either include the
--     brand/category in the user's search string, or apply both an FTS
--     match AND a brand/category filter. Keeping the tsvector pure
--     means re-ranks aren't needed when a brand renames.
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS search_tsv tsvector
  GENERATED ALWAYS AS (
    to_tsvector(
      'english',
      coalesce(name, '')
        || ' ' || coalesce(description, '')
        || ' ' || coalesce(array_to_string(keywords, ' '), '')
    )
  ) STORED;

-- 6c. GIN index for fast substring/keyword lookups.
CREATE INDEX IF NOT EXISTS idx_products_search_tsv
  ON products USING GIN (search_tsv);


-- 7. Sanity counts after the move (returns rows; non-mutating).
--    Comment out if running headless; uncomment to eyeball results.
-- SELECT c.name, count(*) FROM products p
--   JOIN categories c ON c.id = p.category_id
--   WHERE p.is_active = true
--   GROUP BY c.name ORDER BY c.name;

COMMIT;


-- ============================================================
-- Verify after running:
--   SELECT c.slug, count(*) FILTER (WHERE p.is_active)
--   FROM categories c LEFT JOIN products p ON p.category_id = c.id
--   GROUP BY c.slug ORDER BY c.slug;
--
--   SELECT slug, name FROM brands ORDER BY display_order, name;
--
--   -- Smoke test FTS:
--   SELECT name FROM products
--   WHERE search_tsv @@ websearch_to_tsquery('english','zana saddle stay')
--   LIMIT 5;
-- ============================================================
