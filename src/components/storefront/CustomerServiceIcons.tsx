import { Clock, Truck, RefreshCcw, Shield } from 'lucide-react';

const items = [
  {
    icon: Clock,
    title: 'Mon-Sun: 10AM - 8PM',
    subtitle: 'Open All Days',
  },
  {
    icon: Truck,
    title: 'Free Shipping ₹999+',
    subtitle: 'All Over India',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    subtitle: '7-Day Policy',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    subtitle: '100% Protected',
  },
];

export function CustomerServiceIcons() {
  return (
    <section className="bg-card/50 border-t border-b border-border/50 py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
