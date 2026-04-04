import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useFeaturedProducts } from '@/hooks/use-products';
import { formatPrice } from '@/lib/price';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface CartDrawerProps {
  onClose: () => void;
}

export function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, updateQuantity, removeItem, addItem } =
    useCart();
  const { data: featuredProducts } = useFeaturedProducts();
  const [couponCode, setCouponCode] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Upsell products: featured products not already in cart
  const upsellProducts = featuredProducts
    ?.filter((p) => !items.find((i) => i.productId === p.id) && p.stock_quantity > 0)
    .slice(0, 3);

  const handleApplyCoupon = () => {
    // UI only - no backend validation
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle className="text-foreground">Cart ({itemCount})</SheetTitle>
      </SheetHeader>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button variant="outline" asChild onClick={onClose}>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {/* Cart items */}
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-3 p-3 bg-card rounded-lg border border-border"
              >
                {item.imageUrl && (
                  <Link
                    to={`/products/${item.slug}`}
                    onClick={onClose}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded bg-muted"
                    />
                  </Link>
                )}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${item.slug}`}
                    onClick={onClose}
                    className="hover:text-primary transition-colors"
                  >
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.name}
                    </p>
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.brandName}</p>
                  <p className="text-sm text-primary font-bold mt-1">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-6 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Separator />

            {/* Upsell section */}
            {upsellProducts && upsellProducts.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  You Might Also Like
                </p>
                <div className="space-y-2">
                  {upsellProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 rounded-lg border border-border bg-card/50"
                    >
                      <div className="w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-primary font-bold">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-2 flex-shrink-0"
                        onClick={() =>
                          addItem({
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            imageUrl: product.image_url,
                            brandName: product.brand?.name || '',
                            slug: product.slug,
                          })
                        }
                      >
                        + Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Order note */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <StickyNote className="h-3 w-3" />
                Order Note
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Any special instructions..."
                rows={2}
                className="w-full text-sm bg-background border border-border rounded-lg p-2 resize-none focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Coupon code */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <Tag className="h-3 w-3" />
                Coupon Code
              </label>
              <div className="flex gap-2">
                <Input
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setCouponApplied(false);
                  }}
                  placeholder="Enter coupon"
                  className="h-8 text-sm bg-background border-border"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                >
                  Apply
                </Button>
              </div>
              {couponApplied && (
                <p className="text-xs text-muted-foreground mt-1">
                  Coupon will be validated at checkout.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping calculated at checkout
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                asChild
                onClick={onClose}
              >
                <Link to="/cart">View Cart</Link>
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                asChild
                onClick={onClose}
              >
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
