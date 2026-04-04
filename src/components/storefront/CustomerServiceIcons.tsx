import { Clock, Truck, RefreshCcw, Shield } from 'lucide-react';

const items = [
  {
    icon: Clock,
    title: 'Mon-Sun: 10AM - 8PM',
    subtitle: 'Open All Days',
  },
  {
    icon: Truck,
    title: 'Free Shipping \u20B9999+',
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
    <section className="bg-card py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
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
