-- SparklingBear Seed Data
-- Run after schema.sql to populate initial data

-- ============================================
-- CATEGORIES
-- ============================================
INSERT INTO categories (id, name, slug, description, features, display_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Helmets', 'helmets', 'Premium full-face helmets with advanced safety features', ARRAY['ECE Certified', 'Anti-Fog Visor', 'Aerodynamic Design'], 1),
  ('c1000000-0000-0000-0000-000000000002', 'Riding Gears & Luggage', 'riding-gears-luggage', 'High-quality jackets, gloves, and protective gear', ARRAY['CE Armor', 'Abrasion Resistant', 'All-Weather'], 2),
  ('c1000000-0000-0000-0000-000000000003', 'Aux Lights', 'aux-lights', 'High-power visibility solutions for all-weather riding', ARRAY['High Beam', 'Waterproof', 'Low Power Draw'], 3),
  ('c1000000-0000-0000-0000-000000000004', 'Bike Protection & Fitments', 'bike-protection-fitments', 'Custom cages, guards, and fitments for superior bike safety', ARRAY['Durable Metal Build', 'Precision Fit', 'Easy Installation'], 4);

-- ============================================
-- BRANDS
-- ============================================
-- Helmet brands
INSERT INTO brands (id, name, slug, description, category_id, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'LS2', 'ls2', 'World-class safety, cutting-edge designs.', 'c1000000-0000-0000-0000-000000000001', 1),
  ('b1000000-0000-0000-0000-000000000002', 'Axor', 'axor', 'Stylish, aerodynamic, and feature-rich.', 'c1000000-0000-0000-0000-000000000001', 2),
  ('b1000000-0000-0000-0000-000000000003', 'SMK', 'smk', 'High-impact protection with Italian design.', 'c1000000-0000-0000-0000-000000000001', 3),
  ('b1000000-0000-0000-0000-000000000004', 'Studds', 'studds', 'Reliable and affordable safety gear.', 'c1000000-0000-0000-0000-000000000001', 4);

-- Riding Gear brands
INSERT INTO brands (id, name, slug, description, category_id, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000005', 'Rynox', 'rynox', 'Durable and versatile adventure gear.', 'c1000000-0000-0000-0000-000000000002', 1),
  ('b1000000-0000-0000-0000-000000000006', 'Cramster', 'cramster', 'Proven quality for long-distance touring.', 'c1000000-0000-0000-0000-000000000002', 2),
  ('b1000000-0000-0000-0000-000000000007', 'Viaterra', 'viaterra', 'Innovative luggage and accessories.', 'c1000000-0000-0000-0000-000000000002', 3),
  ('b1000000-0000-0000-0000-000000000008', 'Raida', 'raida', 'Protective apparel for diverse conditions.', 'c1000000-0000-0000-0000-000000000002', 4);

-- Aux Light brands
INSERT INTO brands (id, name, slug, description, category_id, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000009', 'HJG', 'hjg', 'Budget-friendly, high-intensity spot lights.', 'c1000000-0000-0000-0000-000000000003', 1),
  ('b1000000-0000-0000-0000-000000000010', 'MADDOG', 'maddog', 'Premium, robust, and focused auxiliary lights.', 'c1000000-0000-0000-0000-000000000003', 2),
  ('b1000000-0000-0000-0000-000000000011', 'FUTURE EYES', 'future-eyes', 'Advanced optics for superior light throw.', 'c1000000-0000-0000-0000-000000000003', 3),
  ('b1000000-0000-0000-0000-000000000012', 'BOBO', 'bobo', 'Stylish and reliable fog lamps and indicators.', 'c1000000-0000-0000-0000-000000000003', 4),
  ('b1000000-0000-0000-0000-000000000013', 'ZANA', 'zana-lights', 'Trusted brand for light mounts and clamps.', 'c1000000-0000-0000-0000-000000000003', 5);

-- Bike Protection brands
INSERT INTO brands (id, name, slug, description, category_id, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000014', 'Moto Torque', 'moto-torque', 'High-quality engine guards and crash protection.', 'c1000000-0000-0000-0000-000000000004', 1),
  ('b1000000-0000-0000-0000-000000000015', 'Moto Care', 'moto-care', 'Protective covers and cleaning essentials.', 'c1000000-0000-0000-0000-000000000004', 2),
  ('b1000000-0000-0000-0000-000000000016', 'Zana', 'zana-protection', 'Leading provider of saddle stays and carriers.', 'c1000000-0000-0000-0000-000000000004', 3),
  ('b1000000-0000-0000-0000-000000000017', 'Auto Engina', 'auto-engina', 'Custom-made metal bash plates and guards.', 'c1000000-0000-0000-0000-000000000004', 4);

-- ============================================
-- PRODUCTS (Helmets only — other categories can be added via admin)
-- ============================================
-- LS2 Helmets
INSERT INTO products (name, slug, description, price, brand_id, category_id, stock_quantity, is_featured, display_order) VALUES
  ('LS2 FF800 STORM II', 'ls2-ff800-storm-ii', 'Full-face helmet with advanced ventilation and ECE certification', 1100000, 'b1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 10, true, 1),
  ('LS2 MX436 PIONEER II', 'ls2-mx436-pioneer-ii', 'Adventure helmet with peak visor and dual-sport design', 985000, 'b1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 8, false, 2),
  ('LS2 MX701 EXPLORER', 'ls2-mx701-explorer', 'Premium off-road helmet with carbon fiber shell', 1950000, 'b1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 5, true, 3),
  ('LS2 FF805 THUNDER', 'ls2-ff805-thunder', 'Top-tier racing helmet with aerodynamic spoiler', 3400000, 'b1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 3, true, 4);

-- Axor Helmets
INSERT INTO products (name, slug, description, price, brand_id, category_id, stock_quantity, is_featured, display_order) VALUES
  ('Axor Apex', 'axor-apex', 'Feature-rich full-face helmet with dual visor system', 499400, 'b1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 12, false, 5),
  ('Axor Saber', 'axor-saber', 'Lightweight street helmet with scratch-resistant visor', 422000, 'b1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 15, false, 6),
  ('Axor Cross', 'axor-cross', 'Off-road helmet with extended peak and ventilation', 740600, 'b1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 7, false, 7),
  ('Axor Brutale', 'axor-brutale', 'Bold design with enhanced protection and comfort', 799100, 'b1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 9, false, 8);

-- SMK Helmets
INSERT INTO products (name, slug, description, price, brand_id, category_id, stock_quantity, is_featured, display_order) VALUES
  ('SMK Stellar', 'smk-stellar', 'Italian-designed helmet with pinlock-ready visor', 440000, 'b1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 10, false, 9),
  ('SMK Typhoon', 'smk-typhoon', 'All-weather helmet with advanced ventilation', 525000, 'b1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 8, false, 10),
  ('SMK Agner', 'smk-agner', 'Sport-touring helmet with aerodynamic profile', 590000, 'b1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 6, false, 11),
  ('SMK Allterra', 'smk-allterra', 'Adventure helmet with dual-sport versatility', 590000, 'b1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 7, false, 12);

-- Studds Helmets
INSERT INTO products (name, slug, description, price, brand_id, category_id, stock_quantity, is_featured, display_order) VALUES
  ('Studds HELIOS', 'studds-helios', 'Premium open-face helmet with retractable visor', 340000, 'b1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 20, false, 13),
  ('Studds Drifter', 'studds-drifter', 'Rugged half-face helmet for urban riding', 259500, 'b1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 25, false, 14),
  ('Studds Trooper', 'studds-trooper', 'Adventure-ready helmet with extended chin guard', 190000, 'b1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 18, false, 15),
  ('Studds Vogue', 'studds-vogue', 'Compact and lightweight everyday helmet', 109500, 'b1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 30, false, 16);

-- ============================================
-- SERVICES
-- ============================================
INSERT INTO services (title, slug, description, icon_name, features, display_order) VALUES
  ('Car Detailing', 'car-detailing', 'Professional interior and exterior detailing to make your car look showroom-fresh', 'car', ARRAY['Deep Cleaning', 'Polish & Wax', 'Interior Restoration'], 1),
  ('Paint Protection Film (PPF)', 'ppf', 'Ultimate protection against scratches, chips, and environmental damage', 'shield', ARRAY['Self-Healing Film', 'UV Protection', 'Long-lasting Shine'], 2),
  ('Ceramic Coating', 'ceramic-coating', 'Advanced nano-coating for unmatched gloss, hydrophobic protection, and durability', 'sparkles', ARRAY['9H Hardness', 'Hydrophobic Effect', '5+ Year Protection'], 3),
  ('Custom Detailing', 'custom-detailing', 'Tailored detailing packages designed for your specific needs', 'paintbrush', ARRAY['Engine Bay Cleaning', 'Headlight Restoration', 'Odor Removal'], 4);

-- ============================================
-- GALLERY ITEMS
-- ============================================
INSERT INTO gallery_items (title, type, display_order) VALUES
  ('Premium Car Detailing', 'video', 1),
  ('Superbike Showcase', 'video', 2),
  ('Helmet Collection', 'slideshow', 3),
  ('Premium Riding Gear', 'slideshow', 4);

-- ============================================
-- TESTIMONIALS
-- ============================================
INSERT INTO testimonials (customer_name, rating, text, is_featured) VALUES
  ('Dhrutil Krishna', 5, 'Got a full-body PPF and wash for my Himalayan 411—looks brand new! Amazing job by Mr. Abhishek and team.', true),
  ('Anirudh Shastry', 5, 'Excellent service! Maddog Scout X installed perfectly—Abhishek and team never miss.', true),
  ('Adithya Mahesh', 5, 'Sparkling Bear is my go-to for riding gear—great collection and service. Abhishek even fixed my BluArmor C30 personally!', true);

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
  ('phone', '+91 91082 47377'),
  ('address', '#2, Utharahalli Kengeri Main Rd, Opposite Shell Petrol Bunk, Banashankari 6th Stage, Srinivaspura, Bengaluru, Karnataka 560060'),
  ('address_short', 'RR Nagar, Bangalore'),
  ('hours_open', '10 AM'),
  ('hours_close', '8 PM'),
  ('instagram_url', 'https://www.instagram.com/spa_rklebear?igsh=MWk0dXJ0em9xOGJmZQ=='),
  ('facebook_url', 'https://www.facebook.com/share/1GJKzAg3cs/'),
  ('google_maps_key', 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'),
  ('google_review_url', 'https://www.google.com/maps/place/Sparkling+Bear-+Car+Detailing+%26+Bike+Accessories,+PPF+Ceramic+coating+Ls2+Axor+Helmet+Near+Me./@12.9037325,77.5059767,17z/data=!4m8!3m7!1s0x3bae3f44edb32f05:0x524baa5975533f7!8m2!3d12.9037325!4d77.5085516!9m1!1b1!16s%2Fg%2F11syrlpfk8?entry=ttu');
