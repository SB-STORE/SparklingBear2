import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { CartItem, CheckoutFormData, Order } from '@/types';

interface CreateOrderInput {
  items: CartItem[];
  formData: CheckoutFormData;
  subtotal: number;
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items, formData, subtotal }: CreateOrderInput) => {
      // 1. Create or find customer
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2 || null,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        })
        .select()
        .single();

      if (customerError) throw customerError;

      const shippingCost = 0; // Free shipping for now
      const total = subtotal + shippingCost;

      // 2. Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customer.id,
          status: 'pending',
          subtotal,
          shipping_cost: shippingCost,
          total,
          shipping_name: formData.name,
          shipping_phone: formData.phone,
          shipping_email: formData.email || null,
          shipping_address_line1: formData.addressLine1,
          shipping_address_line2: formData.addressLine2 || null,
          shipping_city: formData.city,
          shipping_state: formData.state,
          shipping_pincode: formData.pincode,
          notes: formData.notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 3. Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        line_total: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useOrderByNumber(orderNumber: string | undefined) {
  return useQuery({
    queryKey: ['order', orderNumber],
    queryFn: async (): Promise<Order> => {
      const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber!)
        .single();

      if (error) throw error;

      const { data: items } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', order.id);

      return { ...order, items: items || [] } as Order;
    },
    enabled: !!orderNumber,
  });
}
