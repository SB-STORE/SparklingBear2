-- ============================================================
-- Phase 2 pilot: LS2 helmets cell — populate from ls2helmetsindia.com
-- ============================================================
-- 7 new model entries + 3 enriched (FF800, FF805, MX701) + 1
-- deactivation (MX436 PIONEER II — discontinued in current
-- LS2 India lineup).
--
-- One product per model (not per colour). Sizes are seeded as
-- product_variants. MRP is the standard-colourway price from
-- ls2helmetsindia.com (cross-checked on motocentral.in for FF800,
-- FF902, MX701 — matched within ₹100). Carbon variants noted in
-- description rather than as separate SKUs to keep the catalog
-- compact during the pilot.
--
-- Stock: nominal value of 5 per variant since this catalog is
-- inquiry-based (orders confirmed in chat). Refine per-SKU later
-- if SB starts holding helmet inventory.
-- ============================================================

BEGIN;

-- 1. Upsert LS2 helmet models.
INSERT INTO products (
  slug, name, description, price, image_url, keywords,
  has_variants, is_active, display_order, brand_id, category_id, stock_quantity
)
SELECT v.slug, v.name, v.description, v.price, v.image_url, v.keywords,
       v.has_variants, v.is_active, v.display_order,
       (SELECT id FROM brands     WHERE slug='ls2'),
       (SELECT id FROM categories WHERE slug='helmets'),
       5
FROM (VALUES
  ('ls2-ff320-stream-ii',  'LS2 FF320 Stream II',
   'Entry-level full-face helmet from LS2. Lightweight KPA composite shell, large upper air intake for ventilation, anti-scratch visor, removable washable lining. ECE 22-06 certified. Available in solid and graphic colourways on inquiry.',
   7800,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/d4b31501-26dd-4fe9-8eb7-ca1b5dbbe4de.jpg?v=1751719096',
   ARRAY['LS2','FF320','Stream','Stream II','full face','full-face','entry level','commuter','ECE 22-06','helmet','LS2 helmet']::TEXT[],
   true, true, 10),

  ('ls2-ff327-challenger', 'LS2 FF327 Challenger',
   'High-performance full-face helmet with multiple ventilations. HPFC composite shell — safe and lightweight. Excellent peripheral vision, ECE 22-06 certified. Sport-touring profile.',
   15000,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/103271011_600.jpg?v=1775463321',
   ARRAY['LS2','FF327','Challenger','full face','full-face','composite','HPFC','sport','helmet']::TEXT[],
   true, true, 11),

  ('ls2-ff352-rookie',     'LS2 FF352 Rookie',
   'Budget-friendly full-face helmet with SHARP 4-Star safety rating. KPA shell, anti-scratch visor, fully removable interior. ISI + ECE certified. The most popular LS2 in India for daily commuting.',
   4200,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/LS2-FF352-Rookie-Solid-Matt-Black-Helmet-2.webp?v=1751719247',
   ARRAY['LS2','FF352','Rookie','full face','full-face','entry level','commuter','SHARP','ISI','helmet']::TEXT[],
   true, true, 12),

  ('ls2-ff386',            'LS2 FF386 Flip-Up',
   'Modular full-face helmet — chin bar flips up for fresh air or quick conversation at fuel stops. Drop-down sun visor, polycarbonate shell, ECE certified. LS2''s most affordable modular.',
   7250,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/WhatsApp_Image_2024-01-08_at_13.28.15-removebg-preview.png?v=1751719257',
   ARRAY['LS2','FF386','modular','flip up','flipup','helmet','sun visor']::TEXT[],
   true, true, 13),

  ('ls2-ff800-storm-ii',   'LS2 FF800 Storm II',
   'Touring full-face helmet for highways and city. KPA shell with large upper air intake, anti-scratch + anti-fog Pinlock-ready visor, drop-down sun shield, fully removable washable interior. ECE 22-06.',
   11800,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/FF800_STORM_II_SOLID_MATT_BLACK_168001011_ml-e1737465303190.jpg?v=1751719367',
   ARRAY['LS2','FF800','Storm','Storm II','full face','full-face','sport touring','touring','Pinlock','helmet']::TEXT[],
   true, true, 14),

  ('ls2-ff805-thunder',    'LS2 FF805 Thunder Carbon',
   'Carbon-fibre racing helmet. Aerodynamic shell shape with rear spoiler, dual D-ring closure, FIM-certifiable race version available. The flagship of LS2''s sport line.',
   32800,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/e6fdda_79104eb9b2734f23852b7958dec7c2a7_mv2.webp?v=1751719423',
   ARRAY['LS2','FF805','Thunder','Thunder Carbon','carbon','carbon fiber','racing','race','FIM','sport','track','full face','helmet']::TEXT[],
   true, true, 15),

  ('ls2-ff811-vector-ii',  'LS2 FF811 Vector II',
   'Sport-touring full-face helmet with elegant design — fiberglass shell, dynamic flow-through ventilation, wide anti-scratch visor with drop-down sun shield. ECE 22-06.',
   16000,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/168112031-l1652197445.png?v=1771848619',
   ARRAY['LS2','FF811','Vector','Vector II','full face','sport touring','touring','fiberglass','helmet']::TEXT[],
   true, true, 16),

  ('ls2-ff901-advant-x',   'LS2 FF901 Advant X Carbon',
   'The only fully-carbon convertible helmet on the market. 100% carbon fibre including the chin bar — flips fully back to convert from full-face to open-face. Dual homologation (P/J), ECE 22-06. The flagship LS2 modular.',
   41000,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/ADVANT-X-CARBON-6.png?v=1751719478',
   ARRAY['LS2','FF901','Advant X','Advant','modular','flip up','flipup','carbon','carbon fiber','dual homologation','P/J','convertible','helmet']::TEXT[],
   true, true, 17),

  ('ls2-ff902-scope-ii',   'LS2 FF902 Scope II',
   'Modular touring helmet — bold, advanced, full-face that flips up for traffic or conversation. KPA shell, drop-down sun visor, fully removable interior, ECE 22-06.',
   13500,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/1625.jpg?v=1751719498',
   ARRAY['LS2','FF902','Scope','Scope II','modular','flip up','flipup','touring','helmet']::TEXT[],
   true, true, 18),

  ('ls2-mx701-explorer',   'LS2 MX701 Explorer',
   'Adventure / dual-sport helmet with peak visor. Built for trail and tarmac — KPA shell, removable peak, anti-scratch visor with drop-down sun shield, premium washable interior. The go-to LS2 ADV lid in India.',
   19500,
   'https://cdn.shopify.com/s/files/1/0686/8742/9830/files/LS1026_1.webp?v=1767789266',
   ARRAY['LS2','MX701','Explorer','adventure','ADV','dual sport','off road','enduro','peak','helmet']::TEXT[],
   true, true, 19)

) AS v(slug, name, description, price, image_url, keywords, has_variants, is_active, display_order)
ON CONFLICT (slug) DO UPDATE SET
  name          = EXCLUDED.name,
  description   = EXCLUDED.description,
  price         = EXCLUDED.price,
  image_url     = EXCLUDED.image_url,
  keywords      = EXCLUDED.keywords,
  has_variants  = EXCLUDED.has_variants,
  is_active     = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order,
  brand_id      = EXCLUDED.brand_id,
  category_id   = EXCLUDED.category_id;


-- 2. Wipe + repopulate size variants for these 10 SKUs.
DELETE FROM product_variants
WHERE product_id IN (
  SELECT id FROM products
  WHERE slug = ANY(ARRAY[
    'ls2-ff320-stream-ii','ls2-ff327-challenger','ls2-ff352-rookie','ls2-ff386',
    'ls2-ff800-storm-ii','ls2-ff805-thunder','ls2-ff811-vector-ii',
    'ls2-ff901-advant-x','ls2-ff902-scope-ii','ls2-mx701-explorer'
  ])
);

INSERT INTO product_variants (product_id, size, display_order, stock_quantity)
SELECT p.id, s.size, s.display_order, 5
FROM   products p
JOIN (VALUES
  -- FF320: 5 sizes
  ('ls2-ff320-stream-ii','S',1),('ls2-ff320-stream-ii','M',2),('ls2-ff320-stream-ii','L',3),
  ('ls2-ff320-stream-ii','XL',4),('ls2-ff320-stream-ii','XXL',5),
  -- FF327: 4 sizes
  ('ls2-ff327-challenger','M',1),('ls2-ff327-challenger','L',2),
  ('ls2-ff327-challenger','XL',3),('ls2-ff327-challenger','XXL',4),
  -- FF352: 4
  ('ls2-ff352-rookie','M',1),('ls2-ff352-rookie','L',2),
  ('ls2-ff352-rookie','XL',3),('ls2-ff352-rookie','XXL',4),
  -- FF386: 4
  ('ls2-ff386','M',1),('ls2-ff386','L',2),('ls2-ff386','XL',3),('ls2-ff386','XXL',4),
  -- FF800: 6
  ('ls2-ff800-storm-ii','S',1),('ls2-ff800-storm-ii','M',2),('ls2-ff800-storm-ii','L',3),
  ('ls2-ff800-storm-ii','XL',4),('ls2-ff800-storm-ii','XXL',5),('ls2-ff800-storm-ii','XXXL',6),
  -- FF805: 5
  ('ls2-ff805-thunder','S',1),('ls2-ff805-thunder','M',2),('ls2-ff805-thunder','L',3),
  ('ls2-ff805-thunder','XL',4),('ls2-ff805-thunder','XXL',5),
  -- FF811: 4
  ('ls2-ff811-vector-ii','S',1),('ls2-ff811-vector-ii','M',2),
  ('ls2-ff811-vector-ii','L',3),('ls2-ff811-vector-ii','XL',4),
  -- FF901: 6
  ('ls2-ff901-advant-x','S',1),('ls2-ff901-advant-x','M',2),('ls2-ff901-advant-x','L',3),
  ('ls2-ff901-advant-x','XL',4),('ls2-ff901-advant-x','XXL',5),('ls2-ff901-advant-x','XXXL',6),
  -- FF902: 5
  ('ls2-ff902-scope-ii','S',1),('ls2-ff902-scope-ii','M',2),('ls2-ff902-scope-ii','L',3),
  ('ls2-ff902-scope-ii','XL',4),('ls2-ff902-scope-ii','XXL',5),
  -- MX701: 4
  ('ls2-mx701-explorer','M',1),('ls2-mx701-explorer','L',2),
  ('ls2-mx701-explorer','XL',3),('ls2-mx701-explorer','XXL',4)
) AS s(slug, size, display_order) ON s.slug = p.slug;


-- 3. Deactivate MX436 PIONEER II — discontinued.
UPDATE products SET is_active = false WHERE slug = 'ls2-mx436-pioneer-ii';

COMMIT;
