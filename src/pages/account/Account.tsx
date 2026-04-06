import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, LogOut, User, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { ComplaintModal } from '@/components/storefront/ComplaintModal';
import { useAuth } from '@/contexts/AuthContext';
import { useCustomerOrders } from '@/hooks/use-orders';
import { formatPrice } from '@/lib/price';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-600',
  confirmed: 'bg-blue-600',
  processing: 'bg-blue-600',
  shipped: 'bg-purple-600',
  delivered: 'bg-green-600',
  cancelled: 'bg-red-600',
};

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: orders, isLoading } = useCustomerOrders(user?.email);
  const [complaintOrder, setComplaintOrder] = useState<any>(null);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out');
    navigate('/');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Customer';

  return (
    <StorefrontLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Profile header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Order history */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Your Orders
          </h2>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-3">
              {orders.map((order: any) => (
                <Link
                  key={order.id}
                  to={`/orders/${order.order_number}`}
                  className="block"
                >
                  <Card className="p-4 bg-card border-border hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-foreground">
                            #{order.order_number}
                          </span>
                          <Badge className={`${statusColors[order.status] || 'bg-neutral-600'} text-white text-[10px] px-2`}>
                            {order.status?.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground hover:text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            setComplaintOrder(order);
                          }}
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Report
                        </Button>
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(order.total)}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-8 bg-card border-border text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No orders yet</p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/products">Start Shopping</Link>
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Complaint modal */}
      {complaintOrder && (
        <ComplaintModal
          open={!!complaintOrder}
          onClose={() => setComplaintOrder(null)}
          orderNumber={complaintOrder.order_number}
          orderId={complaintOrder.id}
          customerName={user?.user_metadata?.full_name || user?.email || ''}
          customerEmail={user?.email}
          customerPhone={user?.user_metadata?.phone}
        />
      )}
    </StorefrontLayout>
  );
}
