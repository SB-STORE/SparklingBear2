import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/price';
import type { Product } from '@/types';

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inStock = product.stock_quantity > 0;
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  const handleAdd = () => {
    // For variant products, redirect to detail page for size selection
    if (product.has_variants) {
      onClose();
      window.location.href = `/products/${product.slug}`;
      return;
    }
    addItem(
      {
        productId: product.id,
        variantId: null,
        size: null,
        name: product.name,
        price: product.price,
        imageUrl: product.image_url,
        brandName: product.brand?.name || '',
        slug: product.slug,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Image */}
          <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-muted-foreground">No Image</span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.brand?.name && (
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {product.brand.name}
              </p>
            )}
            <h2 className="text-xl font-bold text-foreground mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compare_at_price!)}
                </span>
              )}
            </div>

            {!inStock && (
              <Badge variant="outline" className="text-red-500 border-red-500 w-fit mb-4">
                Out of Stock
              </Badge>
            )}

            {inStock && (
              <>
                {/* Quantity selector */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-muted-foreground">Qty:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setQuantity(Math.min(product.stock_quantity, quantity + 1))
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3"
                  onClick={handleAdd}
                >
                  {added ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </>
            )}

            <Button
              variant="outline"
              className="w-full"
              asChild
              onClick={onClose}
            >
              <Link to={`/products/${product.slug}`}>View Full Details</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
