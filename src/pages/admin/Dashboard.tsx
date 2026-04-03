import { Package, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminStats, useAdminOrders } from '@/hooks/use-admin';
import { formatPrice } from '@/lib/price';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  processing: 'bg-purple-500/20 text-purple-500',
  shipped: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
};

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: recentOrders, isLoading: ordersLoading } = useAdminOrders();

  const statCards = [
    { label: 'Total Orders', value: stats?.totalOrders ?? 0, icon: ShoppingCart, color: 'text-blue-500' },
    { label: 'Pending Orders', value: stats?.pendingOrders ?? 0, icon: AlertCircle, color: 'text-yellow-500' },
    { label: 'Revenue', value: formatPrice(stats?.totalRevenue ?? 0), icon: DollarSign, color: 'text-green-500' },
    { label: 'Active Products', value: stats?.activeProducts ?? 0, icon: Package, color: 'text-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Orders</h2>
        {ordersLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : recentOrders && recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Order #</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Total</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 10).map((order: any) => (
                  <tr key={order.id} className="border-b border-border/50">
                    <td className="py-3 px-2 text-foreground font-medium">{order.order_number}</td>
                    <td className="py-3 px-2 text-foreground">{order.shipping_name}</td>
                    <td className="py-3 px-2">
                      <Badge className={STATUS_COLORS[order.status] || ''}>{order.status}</Badge>
                    </td>
                    <td className="py-3 px-2 text-right text-foreground">{formatPrice(order.total)}</td>
                    <td className="py-3 px-2 text-right text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No orders yet</p>
        )}
      </Card>
    </div>
  );
}
