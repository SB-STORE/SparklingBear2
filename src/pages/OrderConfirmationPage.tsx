import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrderByNumber } from '@/hooks/use-orders';
import { formatPrice } from '@/lib/price';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import type { OrderStatus } from '@/types';

const STATUS_STEPS: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
  { key: 'pending', label: 'Placed', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: MapPin },
];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  processing: 'bg-purple-500/20 text-purple-500',
  shipped: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
};

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { data: order, isLoading } = useOrderByNumber(orderNumber);

  if (isLoading) {
    return (
      <StorefrontLayout>
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Skeleton className="h-10 w-64 mb-8" />
          <Skeleton className="h-48 w-full mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </StorefrontLayout>
    );
  }

  if (!order) {
    return (
      <StorefrontLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find an order with that number.</p>
          <Button asChild><Link to="/">Go Home</Link></Button>
        </div>
      </StorefrontLayout>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);

  return (
    <StorefrontLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
          <p className="text-muted-foreground">
            Order Number: <span className="text-foreground font-semibold">{order.order_number}</span>
          </p>
        </div>

        {/* Status Timeline */}
        {order.status !== 'cancelled' && (
          <Card className="p-6 bg-card border-border mb-6">
            <div className="flex items-center justify-between">
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStepIndex;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex flex-col items-center flex-1 relative">
                    {i > 0 && (
                      <div
                        className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                          i <= currentStepIndex ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    )}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className={`text-xs mt-2 ${done ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {order.status === 'cancelled' && (
          <Card className="p-4 bg-red-500/10 border-red-500/20 mb-6 text-center">
            <Badge className="bg-red-500/20 text-red-500">Cancelled</Badge>
          </Card>
        )}

        {/* Order Details */}
        <Card className="p-6 bg-card border-border mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items?.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.product_name} x{item.quantity}
                </span>
                <span className="text-foreground font-medium">{formatPrice(item.line_total)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{order.shipping_cost === 0 ? 'Free' : formatPrice(order.shipping_cost)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </Card>

        {/* Shipping Address */}
        <Card className="p-6 bg-card border-border mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Shipping Address</h2>
          <div className="text-muted-foreground space-y-1">
            <p className="text-foreground font-semibold">{order.shipping_name}</p>
            <p>{order.shipping_phone}</p>
            <p>{order.shipping_address_line1}</p>
            {order.shipping_address_line2 && <p>{order.shipping_address_line2}</p>}
            <p>{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
          </div>
        </Card>

        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </StorefrontLayout>
  );
}
