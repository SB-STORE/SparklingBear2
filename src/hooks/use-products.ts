import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ProductFilters, Product } from '@/types';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data;
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

export function useBrands(categoryId?: string) {
  return useQuery({
    queryKey: ['brands', categoryId],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      let query = supabase.from('brands').select('*, category:categories(*)').order('display_order');
      if (categoryId) query = query.eq('category_id', categoryId);
      const { data, error } = await query;
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
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('category_id', category.id)
        .order('display_order');
      if (error) throw error;
      return data;
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
      return data as Product;
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
