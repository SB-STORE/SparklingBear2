import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/price';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface CartDrawerProps {
  onClose: () => void;
}

export function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle className="text-foreground">Cart ({itemCount})</SheetTitle>
      </SheetHeader>

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3 p-3 bg-card rounded-lg border border-border">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain rounded bg-muted" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.brandName}</p>
                  <p className="text-sm text-primary font-bold">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-auto text-destructive"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild onClick={onClose}>
                <Link to="/cart">View Cart</Link>
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90" asChild onClick={onClose}>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
