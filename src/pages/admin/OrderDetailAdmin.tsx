import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdminOrder, useUpdateOrderStatus } from '@/hooks/use-admin';
import { formatPrice } from '@/lib/price';
import { toast } from 'sonner';
import type { OrderStatus } from '@/types';

const STATUSES: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  processing: 'bg-purple-500/20 text-purple-500',
  shipped: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
};

export default function OrderDetailAdmin() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useAdminOrder(id);
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (status: OrderStatus) => {
    if (!id) return;
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Order status updated to ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-96 w-full" /></div>;
  }

  if (!order) {
    return <p className="text-muted-foreground">Order not found</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/orders"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Order {order.order_number}</h1>
        <Badge className={STATUS_COLORS[order.status] || ''}>{order.status}</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
        {/* Status Update */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Update Status</h2>
          <Select value={order.status} onValueChange={(v) => handleStatusChange(v as OrderStatus)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Customer Info */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-lg font-bold text-foreground mb-3">Customer</h2>
          <div className="text-muted-foreground space-y-1 text-sm">
            <p className="text-foreground font-semibold">{order.shipping_name}</p>
            <p>{order.shipping_phone}</p>
            {order.shipping_email && <p>{order.shipping_email}</p>}
            <p className="pt-2">{order.shipping_address_line1}</p>
            {order.shipping_address_line2 && <p>{order.shipping_address_line2}</p>}
            <p>{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
          </div>
        </Card>

        {/* Items */}
        <Card className="p-6 bg-card border-border md:col-span-2">
          <h2 className="text-lg font-bold text-foreground mb-4">Order Items</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium">Product</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Qty</th>
                <th className="text-right py-2 text-muted-foreground font-medium">Price</th>
                <th className="text-right py-2 text-muted-foreground font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item: any) => (
                <tr key={item.id} className="border-b border-border/50">
                  <td className="py-2 text-foreground">{item.product_name}</td>
                  <td className="py-2 text-center text-muted-foreground">{item.quantity}</td>
                  <td className="py-2 text-right text-muted-foreground">{formatPrice(item.product_price)}</td>
                  <td className="py-2 text-right text-foreground font-medium">{formatPrice(item.line_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-border mt-3 pt-3 space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span><span>{order.shipping_cost === 0 ? 'Free' : formatPrice(order.shipping_cost)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span><span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
          {order.notes && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground"><strong>Notes:</strong> {order.notes}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
