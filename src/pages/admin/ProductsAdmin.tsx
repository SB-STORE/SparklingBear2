import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search, ChevronDown, ChevronRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAdminProducts, useUpdateProduct, useDeleteProduct } from '@/hooks/use-admin';
import { formatPrice } from '@/lib/price';
import { toast } from 'sonner';

interface GroupedProducts {
  key: string;
  brandName: string;
  categoryName: string;
  products: any[];
  totalStock: number;
}

export default function ProductsAdmin() {
  const { data: products, isLoading } = useAdminProducts();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [search, setSearch] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const filtered = products?.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Group products by Brand + Category
  const grouped = useMemo(() => {
    if (!filtered) return [];
    const map = new Map<string, GroupedProducts>();

    for (const p of filtered) {
      const brandName = p.brand?.name || 'Unknown Brand';
      const categoryName = p.category?.name || 'Uncategorized';
      const key = `${brandName}__${categoryName}`;

      if (!map.has(key)) {
        map.set(key, {
          key,
          brandName,
          categoryName,
          products: [],
          totalStock: 0,
        });
      }
      const group = map.get(key)!;
      group.products.push(p);
      group.totalStock += p.stock_quantity;
    }

    // Sort: by category name, then brand name
    return Array.from(map.values()).sort((a, b) => {
      const catCmp = a.categoryName.localeCompare(b.categoryName);
      return catCmp !== 0 ? catCmp : a.brandName.localeCompare(b.brandName);
    });
  }, [filtered]);

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      await updateProduct.mutateAsync({ id, is_active: !current });
      toast.success(`Product ${!current ? 'activated' : 'deactivated'}`);
    } catch { toast.error('Failed to update product'); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success('Product deleted');
    } catch { toast.error('Failed to delete product'); }
  };

  const totalProducts = filtered?.length || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {totalProducts} products in {grouped.length} groups
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/admin/products/new"><Plus className="h-4 w-4 mr-2" />Add Product</Link>
        </Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products, brands, categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {grouped.map((group) => {
            const isCollapsed = collapsedGroups.has(group.key);

            return (
              <Card key={group.key} className="bg-card border-border overflow-hidden">
                {/* Group Header — clickable to expand/collapse */}
                <button
                  onClick={() => toggleGroup(group.key)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Package className="h-4 w-4 text-primary" />
                    <span className="font-bold text-foreground">{group.brandName}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{group.categoryName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {group.products.length} {group.products.length === 1 ? 'product' : 'products'}
                    </Badge>
                    <Badge
                      variant={group.totalStock > 0 ? 'outline' : 'destructive'}
                      className="text-xs"
                    >
                      Stock: {group.totalStock}
                    </Badge>
                  </div>
                </button>

                {/* Product Rows */}
                {!isCollapsed && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-2 px-4 text-muted-foreground font-medium text-xs">Product</th>
                          <th className="text-right py-2 px-4 text-muted-foreground font-medium text-xs">Price</th>
                          <th className="text-center py-2 px-4 text-muted-foreground font-medium text-xs">Stock</th>
                          <th className="text-center py-2 px-4 text-muted-foreground font-medium text-xs">Sizes</th>
                          <th className="text-center py-2 px-4 text-muted-foreground font-medium text-xs">Active</th>
                          <th className="text-right py-2 px-4 text-muted-foreground font-medium text-xs">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.products.map((product: any) => (
                          <tr key={product.id} className="border-b border-border/30 hover:bg-muted/20">
                            <td className="py-2.5 px-4">
                              <div className="flex items-center gap-3">
                                {product.image_url && (
                                  <img src={product.image_url} alt="" className="w-9 h-9 object-contain rounded bg-muted flex-shrink-0" />
                                )}
                                <span className="text-foreground font-medium">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-4 text-right text-foreground whitespace-nowrap">
                              {formatPrice(product.price)}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <Badge variant={product.stock_quantity > 0 ? 'outline' : 'destructive'}>
                                {product.stock_quantity}
                              </Badge>
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              {product.has_variants ? (
                                <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30 text-[10px]">
                                  S/M/L/XL/XXL
                                </Badge>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <Switch
                                checked={product.is_active}
                                onCheckedChange={() => handleToggleActive(product.id, product.is_active)}
                              />
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                  <Link to={`/admin/products/${product.id}`}><Pencil className="h-4 w-4" /></Link>
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
