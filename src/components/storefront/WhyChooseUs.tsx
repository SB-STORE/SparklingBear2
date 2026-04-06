import { MapPin, Users, Award, Wrench } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: "Bangalore's Riding Hub",
    description: 'Visit our store in RR Nagar. Try before you buy — test fit helmets, jackets, and gear in person.',
  },
  {
    icon: Users,
    title: 'Expert Riders on Staff',
    description: 'Our team rides too. We give honest advice based on real riding experience, not just specs.',
  },
  {
    icon: Award,
    title: '16+ Premium Brands',
    description: 'LS2, Rynox, Cramster, Viaterra, Zana, MADDOG & more — all top Indian motorcycle brands under one roof.',
  },
  {
    icon: Wrench,
    title: 'Installation Service',
    description: 'We install what we sell — crash guards, aux lights, saddle stays, and more. Professional fitment guaranteed.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-center mb-3 text-gradient-chrome">
          Why Choose Sparkling Bear?
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          More than just an online store — we're riders who understand what you need.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
