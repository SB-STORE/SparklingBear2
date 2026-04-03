import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
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

export default function ProductsAdmin() {
  const { data: products, isLoading } = useAdminProducts();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [search, setSearch] = useState('');

  const filtered = products?.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/admin/products/new"><Plus className="h-4 w-4 mr-2" />Add Product</Link>
        </Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      <Card className="bg-card border-border overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Brand</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Category</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Price</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Stock</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Active</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered?.map((product: any) => (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {product.image_url && (
                          <img src={product.image_url} alt="" className="w-10 h-10 object-contain rounded bg-muted" />
                        )}
                        <span className="text-foreground font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{product.brand?.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{product.category?.name}</td>
                    <td className="py-3 px-4 text-right text-foreground">{formatPrice(product.price)}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={product.stock_quantity > 0 ? 'outline' : 'destructive'}>
                        {product.stock_quantity}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Switch
                        checked={product.is_active}
                        onCheckedChange={() => handleToggleActive(product.id, product.is_active)}
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
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
    </div>
  );
}
