import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ProductFilters, Product } from '@/types';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      // Pull categories that have at least one active product. Empty
      // categories (e.g., Helmet Comm before it's seeded) shouldn't
      // appear in the storefront nav — clicking them would land on
      // an empty PLP. Admin tooling can still query the table directly
      // via supabase.from('categories') without this hook.
      const { data, error } = await supabase
        .from('categories')
        .select('*, products!inner(id)')
        .eq('products.is_active', true)
        .order('display_order');
      if (error) throw error;
      // Dedupe (the inner join can return one row per matching product
      // depending on PostgREST rendering — collapse to category id).
      const seen = new Map<string, (typeof data)[number]>();
      for (const c of data ?? []) {
        if (!seen.has(c.id)) seen.set(c.id, c);
      }
      // Strip the join field before handing back.
      return Array.from(seen.values()).map(({ products: _ignored, ...rest }) => rest as Omit<typeof data[number], 'products'>);
    },
  });
}

export function useCategory(slug: string | undefined) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      if (!isSupabaseConfigured) return null;
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

// Brands that have at least one active product in the given category.
// Derived from the products table because some brands (Rynox, Viaterra,
// Cramster, Raida, Moto Torque) span multiple categories and live with
// brands.category_id = NULL — we can't filter by that column anymore.
async function brandsForCategoryId(categoryId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('brand:brands(id, name, slug, logo_url, description, display_order)')
    .eq('category_id', categoryId)
    .eq('is_active', true);
  if (error) throw error;
  const seen = new Map<string, NonNullable<(typeof data)[number]['brand']>>();
  for (const row of data ?? []) {
    const b = row.brand as unknown as { id: string } | null;
    if (b && !seen.has(b.id)) seen.set(b.id, b as never);
  }
  return Array.from(seen.values()).sort(
    (a, b) => ((a as { display_order: number }).display_order ?? 999) - ((b as { display_order: number }).display_order ?? 999)
  );
}

export function useBrands(categoryId?: string) {
  return useQuery({
    queryKey: ['brands', categoryId],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      if (categoryId) return brandsForCategoryId(categoryId);
      // No category filter — return all brands (storefront brands page).
      const { data, error } = await supabase
        .from('brands')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data;
    },
  });
}

export function useBrandsByCategory(categorySlug: string | undefined) {
  return useQuery({
    queryKey: ['brands-by-category', categorySlug],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug!)
        .single();
      if (!category) return [];
      return brandsForCategoryId(category.id);
    },
    enabled: !!categorySlug,
  });
}

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async (): Promise<Product[]> => {
      if (!isSupabaseConfigured) return [];
      let query = supabase
        .from('products')
        .select('*, brand:brands(*), category:categories(*)')
        .order('display_order');

      if (filters?.categorySlug) {
        const { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', filters.categorySlug)
          .single();
        if (cat) query = query.eq('category_id', cat.id);
      }

      if (filters?.brandSlug) {
        const { data: brand } = await supabase
          .from('brands')
          .select('id')
          .eq('slug', filters.brandSlug)
          .single();
        if (brand) query = query.eq('brand_id', brand.id);
      }

      if (filters?.search) {
        // Search by product name OR description
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);

        // Also try to find by brand name — look up matching brand IDs first
        const { data: matchingBrands } = await supabase
          .from('brands')
          .select('id')
          .ilike('name', `%${filters.search}%`);

        if (matchingBrands && matchingBrands.length > 0) {
          const brandIds = matchingBrands.map(b => b.id);
          // Re-run query to include brand matches
          const brandQuery = supabase
            .from('products')
            .select('*, brand:brands(*), category:categories(*)')
            .in('brand_id', brandIds)
            .order('display_order');

          const { data: brandProducts } = await brandQuery;

          // Get name-matched products
          const { data: nameProducts, error: nameError } = await query;
          if (nameError) throw nameError;

          // Merge and deduplicate
          const allProducts = [...(nameProducts || []), ...(brandProducts || [])];
          const seen = new Set<string>();
          return allProducts.filter(p => {
            if (seen.has(p.id)) return false;
            seen.add(p.id);
            return true;
          }) as Product[];
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Product[];
    },
  });
}

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product> => {
      if (!isSupabaseConfigured) throw new Error('Supabase not configured');
      const { data, error } = await supabase
        .from('products')
        .select('*, brand:brands(*), category:categories(*)')
        .eq('slug', slug!)
        .single();
      if (error) throw error;
      const product = data as Product;
      // Fetch variants if product has them
      if (product.has_variants) {
        const { data: variants } = await supabase
          .from('product_variants')
          .select('*')
          .eq('product_id', product.id)
          .order('display_order');
        product.variants = variants || [];
      }
      return product;
    },
    enabled: !!slug,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async (): Promise<Product[]> => {
      if (!isSupabaseConfigured) return [];
      const { data, error } = await supabase
        .from('products')
        .select('*, brand:brands(*), category:categories(*)')
        .eq('is_featured', true)
        .order('display_order')
        .limit(8);
      if (error) throw error;
      return data as Product[];
    },
  });
}
