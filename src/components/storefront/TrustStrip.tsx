import { Truck, Shield, RefreshCcw, Lock } from 'lucide-react';

const items = [
  { icon: Truck, text: 'Free Shipping ₹999+' },
  { icon: Shield, text: '100% Genuine Products' },
  { icon: RefreshCcw, text: '7-Day Easy Returns' },
  { icon: Lock, text: 'Secure Payments' },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border/30 bg-card/40 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <span className="font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
