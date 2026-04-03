import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data;
    },
  });
}

export function useGalleryItems() {
  return useQuery({
    queryKey: ['gallery_items'],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data;
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      if (!isSupabaseConfigured) return {};
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      if (error) throw error;
      const settings: Record<string, string> = {};
      data?.forEach((row) => { settings[row.key] = row.value; });
      return settings;
    },
  });
}
