import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminOrders } from '@/hooks/use-admin';
import { formatPrice } from '@/lib/price';
import type { OrderStatus } from '@/types';

const STATUS_TABS: { key: OrderStatus | undefined; label: string }[] = [
  { key: undefined, label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  processing: 'bg-purple-500/20 text-purple-500',
  shipped: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
};

export default function OrdersAdmin() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>();
  const { data: orders, isLoading } = useAdminOrders(statusFilter);

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Orders</h1>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_TABS.map((tab) => (
          <Badge
            key={tab.label}
            variant={statusFilter === tab.key ? 'default' : 'outline'}
            className="cursor-pointer px-3 py-1.5"
            onClick={() => setStatusFilter(tab.key)}
          >
            {tab.label}
          </Badge>
        ))}
      </div>

      <Card className="bg-card border-border overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Order #</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Phone</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Total</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Date</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-4 text-foreground font-medium">{order.order_number}</td>
                    <td className="py-3 px-4 text-foreground">{order.shipping_name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.shipping_phone}</td>
                    <td className="py-3 px-4">
                      <Badge className={STATUS_COLORS[order.status] || ''}>{order.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right text-foreground">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link to={`/admin/orders/${order.id}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">No orders found</p>
        )}
      </Card>
    </div>
  );
}
