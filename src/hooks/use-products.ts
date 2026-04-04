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
        query = query.or(`name.ilike.%${filters.search}%,brand.name.ilike.%${filters.search}%`);
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
