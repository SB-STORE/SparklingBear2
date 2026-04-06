import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminProduct, useCreateProduct, useUpdateProduct, useProductVariants, useUpsertVariants } from '@/hooks/use-admin';
import { useCategories, useBrands } from '@/hooks/use-products';
import { SizeInventoryGrid, type VariantState } from '@/components/admin/SizeInventoryGrid';
import { PRODUCT_SIZES } from '@/types';
import { toast } from 'sonner';

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().default(''),
  price: z.coerce.number().min(0),
  compare_at_price: z.coerce.number().min(0).optional().nullable(),
  category_id: z.string().min(1, 'Select a category'),
  brand_id: z.string().min(1, 'Select a brand'),
  image_url: z.string().optional().nullable(),
  sku: z.string().optional().nullable(),
  stock_quantity: z.coerce.number().int().min(0).default(0),
  has_variants: z.boolean().default(false),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
});

type ProductForm = z.infer<typeof productSchema>;

export default function ProductEditAdmin() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const { data: product, isLoading } = useAdminProduct(isNew ? undefined : id);
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { data: existingVariants } = useProductVariants(isNew ? undefined : id);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const upsertVariants = useUpsertVariants();
  const [sizeVariants, setSizeVariants] = useState<VariantState[]>(
    PRODUCT_SIZES.map(s => ({ size: s, stock_quantity: 0 }))
  );

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: { is_active: true, is_featured: false, stock_quantity: 0, price: 0 },
  });

  const selectedCategoryId = watch('category_id');

  useEffect(() => {
    if (product && !isNew) {
      reset({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price / 100,
        compare_at_price: product.compare_at_price ? product.compare_at_price / 100 : null,
        category_id: product.category_id,
        brand_id: product.brand_id,
        image_url: product.image_url,
        sku: product.sku,
        stock_quantity: product.stock_quantity,
        has_variants: product.has_variants ?? false,
        is_active: product.is_active,
        is_featured: product.is_featured,
      });
    }
  }, [product, isNew, reset]);

  // Load existing variant stock when available
  useEffect(() => {
    if (existingVariants && existingVariants.length > 0) {
      setSizeVariants(
        PRODUCT_SIZES.map(s => {
          const existing = existingVariants.find((v: any) => v.size === s);
          return { size: s, stock_quantity: existing?.stock_quantity ?? 0 };
        })
      );
    }
  }, [existingVariants]);

  const nameValue = watch('name');
  useEffect(() => {
    if (isNew && nameValue) {
      const slug = nameValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [nameValue, isNew, setValue]);

  const filteredBrands = brands?.filter((b: any) => !selectedCategoryId || b.category_id === selectedCategoryId);

  const onSubmit = async (data: ProductForm) => {
    try {
      const payload = {
        ...data,
        price: Math.round(data.price * 100),
        compare_at_price: data.compare_at_price ? Math.round(data.compare_at_price * 100) : null,
        features: [] as string[],
        additional_images: [] as string[],
        display_order: 0,
      };

      let savedProductId = id;
      if (isNew) {
        const created = await createProduct.mutateAsync(payload);
        savedProductId = created.id;
        toast.success('Product created');
      } else {
        await updateProduct.mutateAsync({ id: id!, ...payload });
        toast.success('Product updated');
      }

      // Save size variants if has_variants is enabled
      if (data.has_variants && savedProductId) {
        await upsertVariants.mutateAsync({
          productId: savedProductId,
          variants: sizeVariants,
        });
      }

      navigate('/admin/products');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save product');
    }
  };

  if (!isNew && isLoading) {
    return <div className="space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-96 w-full" /></div>;
  }

  const isSaving = createProduct.isPending || updateProduct.isPending;

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">
        {isNew ? 'Add Product' : 'Edit Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6 bg-card border-border max-w-3xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input {...register('name')} className="bg-background border-border mt-1" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label>Slug *</Label>
              <Input {...register('slug')} className="bg-background border-border mt-1" />
              {errors.slug && <p className="text-xs text-destructive mt-1">{errors.slug.message}</p>}
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea {...register('description')} className="bg-background border-border mt-1" />
            </div>
            <div>
              <Label>Price (₹) *</Label>
              <Input type="number" step="0.01" {...register('price')} className="bg-background border-border mt-1" />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <Label>Compare At Price (₹)</Label>
              <Input type="number" step="0.01" {...register('compare_at_price')} className="bg-background border-border mt-1" />
            </div>
            <div>
              <Label>Category *</Label>
              <Select value={selectedCategoryId} onValueChange={(v) => { setValue('category_id', v); setValue('brand_id', ''); }}>
                <SelectTrigger className="bg-background border-border mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {categories?.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.category_id && <p className="text-xs text-destructive mt-1">{errors.category_id.message}</p>}
            </div>
            <div>
              <Label>Brand *</Label>
              <Select value={watch('brand_id')} onValueChange={(v) => setValue('brand_id', v)}>
                <SelectTrigger className="bg-background border-border mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {filteredBrands?.map((b: any) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.brand_id && <p className="text-xs text-destructive mt-1">{errors.brand_id.message}</p>}
            </div>
            <div>
              <Label>Image URL</Label>
              <Input {...register('image_url')} className="bg-background border-border mt-1" placeholder="https://..." />
            </div>
            <div>
              <Label>SKU</Label>
              <Input {...register('sku')} className="bg-background border-border mt-1" />
            </div>
            <div className="md:col-span-2 pt-2">
              <div className="flex items-center gap-2 mb-3">
                <Switch checked={watch('has_variants')} onCheckedChange={(v) => setValue('has_variants', v)} />
                <Label>This product has sizes (S/M/L/XL/XXL)</Label>
              </div>
              {watch('has_variants') ? (
                <SizeInventoryGrid variants={sizeVariants} onChange={setSizeVariants} />
              ) : (
                <div>
                  <Label>Stock Quantity</Label>
                  <Input type="number" {...register('stock_quantity')} className="bg-background border-border mt-1 max-w-xs" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-6 md:col-span-2 pt-2">
              <div className="flex items-center gap-2">
                <Switch checked={watch('is_active')} onCheckedChange={(v) => setValue('is_active', v)} />
                <Label>Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={watch('is_featured')} onCheckedChange={(v) => setValue('is_featured', v)} />
                <Label>Featured</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isNew ? 'Create Product' : 'Save Changes'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>Cancel</Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
