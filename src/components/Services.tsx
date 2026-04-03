import { Sparkles, Shield, Paintbrush, Car, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useServices } from "@/hooks/use-content";

const ICON_MAP: Record<string, LucideIcon> = {
  car: Car,
  shield: Shield,
  sparkles: Sparkles,
  paintbrush: Paintbrush,
};

// Fallback data when Supabase is not connected
const fallbackServices = [
  { id: '1', icon_name: 'car', title: "Car Detailing", description: "Professional interior and exterior detailing to make your car look showroom-fresh", features: ["Deep Cleaning", "Polish & Wax", "Interior Restoration"] },
  { id: '2', icon_name: 'shield', title: "Paint Protection Film (PPF)", description: "Ultimate protection against scratches, chips, and environmental damage", features: ["Self-Healing Film", "UV Protection", "Long-lasting Shine"] },
  { id: '3', icon_name: 'sparkles', title: "Ceramic Coating", description: "Advanced nano-coating for unmatched gloss, hydrophobic protection, and durability", features: ["9H Hardness", "Hydrophobic Effect", "5+ Year Protection"] },
  { id: '4', icon_name: 'paintbrush', title: "Custom Detailing", description: "Tailored detailing packages designed for your specific needs", features: ["Engine Bay Cleaning", "Headlight Restoration", "Odor Removal"] },
];

const Services = () => {
  const { data: dbServices, isLoading } = useServices();
  const services = dbServices && dbServices.length > 0 ? dbServices : fallbackServices;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-chrome mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium automotive care that sets the standard
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="w-16 h-16 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </Card>
              ))
            : services.map((service, index) => {
                const Icon = ICON_MAP[service.icon_name] || Sparkles;
                return (
                  <Card
                    key={service.id || index}
                    className="bg-card/50 backdrop-blur-sm border-gradient hover:shadow-elevated transition-all duration-500 hover:scale-105 p-6 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-metallic rounded-lg flex items-center justify-center glow-primary group-hover:glow-accent transition-all duration-300">
                        <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Services;
