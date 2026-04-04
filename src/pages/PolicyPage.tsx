import { useLocation } from 'react-router-dom';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';

const policies: Record<string, { title: string; content: string }> = {
  'shipping-policy': {
    title: 'Shipping Policy',
    content: `We offer shipping across India on all orders.

FREE SHIPPING on orders above ₹999.

Standard Delivery: 5-7 business days
Express Delivery: 2-3 business days (select cities)

All orders are dispatched within 24-48 hours of confirmation. You will receive a tracking number via SMS/email once your order is shipped.

For any shipping queries, contact us at info@sparklingbear.in`,
  },
  'return-refund': {
    title: 'Return & Refund Policy',
    content: `We want you to be completely satisfied with your purchase.

RETURNS
- Items can be returned within 7 days of delivery
- Product must be unused, in original packaging with all tags intact
- Helmets cannot be returned once the visor seal is broken (hygiene reasons)

REFUNDS
- Refunds are processed within 5-7 business days after we receive the returned item
- Refund will be credited to the original payment method
- Shipping charges are non-refundable

To initiate a return, email us at info@sparklingbear.in with your order number.`,
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    content: `Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.

INFORMATION WE COLLECT
- Name, email, phone number, and shipping address when you place an order
- Payment information (processed securely through our payment gateway)
- Browsing data for improving our services

HOW WE USE YOUR INFORMATION
- To process and deliver your orders
- To send order updates and shipping notifications
- To improve our website and services
- To send promotional offers (with your consent)

DATA PROTECTION
- We use industry-standard encryption to protect your data
- We never sell or share your personal information with third parties
- You can request deletion of your data at any time

Contact: info@sparklingbear.in`,
  },
  'terms-of-service': {
    title: 'Terms of Service',
    content: `Welcome to Sparkling Bear. By using our website and services, you agree to the following terms.

GENERAL
- All products are subject to availability
- Prices are in Indian Rupees (INR) and include applicable taxes
- We reserve the right to modify prices without prior notice

ORDERS
- An order is confirmed only after payment is received
- We reserve the right to cancel orders in case of pricing errors or stock issues
- Cash on Delivery (COD) is available for select locations

PRODUCT AUTHENTICITY
- All products sold on Sparkling Bear are 100% genuine and sourced from authorized distributors
- We provide manufacturer warranty on all products

LIMITATION OF LIABILITY
- Product images are for illustration purposes; actual product may vary slightly
- We are not liable for delays caused by courier partners or force majeure events

For questions, contact us at info@sparklingbear.in

Sparkling Bear
RR Nagar, Bangalore, Karnataka 560098`,
  },
};

export default function PolicyPage() {
  const location = useLocation();
  const slug = location.pathname.replace('/', '');
  const policy = policies[slug] || null;

  if (!policy) {
    return (
      <StorefrontLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
        </div>
      </StorefrontLayout>
    );
  }

  return (
    <StorefrontLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-chrome mb-6">
          {policy.title}
        </h1>
        <div className="prose prose-invert prose-sm md:prose-base max-w-none">
          {policy.content.split('\n\n').map((paragraph, i) => {
            if (paragraph === paragraph.toUpperCase() && paragraph.length < 50) {
              return (
                <h3 key={i} className="text-lg font-bold text-foreground mt-6 mb-2">
                  {paragraph}
                </h3>
              );
            }
            return (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </StorefrontLayout>
  );
}
