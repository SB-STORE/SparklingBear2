import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useCreateOrder } from '@/hooks/use-orders';
import { formatPrice } from '@/lib/price';
import { INDIAN_STATES } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian phone number'),
  email: z.string().email('Enter a valid email').or(z.literal('')),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional().default(''),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'Select a state'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  notes: z.string().optional().default(''),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { email: '', addressLine2: '', notes: '' },
  });

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const onSubmit = async (data: CheckoutForm) => {
    try {
      const order = await createOrder.mutateAsync({
        items,
        formData: data,
        subtotal,
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${order.order_number}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to place order');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-gradient-chrome mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" {...register('name')} className="bg-background border-border mt-1" />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" {...register('phone')} placeholder="9876543210" className="bg-background border-border mt-1" />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register('email')} className="bg-background border-border mt-1" />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input id="addressLine1" {...register('addressLine1')} className="bg-background border-border mt-1" />
                    {errors.addressLine1 && <p className="text-xs text-destructive mt-1">{errors.addressLine1.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input id="addressLine2" {...register('addressLine2')} className="bg-background border-border mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" {...register('city')} className="bg-background border-border mt-1" />
                    {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select onValueChange={(v) => setValue('state', v)}>
                      <SelectTrigger className="bg-background border-border mt-1">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-xs text-destructive mt-1">{errors.state.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" {...register('pincode')} placeholder="560060" className="bg-background border-border mt-1" />
                    {errors.pincode && <p className="text-xs text-destructive mt-1">{errors.pincode.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Order Notes</Label>
                    <Textarea id="notes" {...register('notes')} placeholder="Any special instructions..." className="bg-background border-border mt-1" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <Card className="p-6 bg-card border-border h-fit sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate mr-2">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-foreground font-medium whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg"
                disabled={createOrder.isPending}
              >
                {createOrder.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Payment will be collected on delivery
              </p>
            </Card>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
