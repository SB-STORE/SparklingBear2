import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/use-products";

// Fallback images
import helmetImg from "@/assets/helmet.jpg";
import ridingGearImg from "@/assets/ridinggear_luggage.png";
import aux from "@/assets/auxlight.png";
import prot from "@/assets/prot.png";

const fallbackCategories = [
  { id: '1', name: "Helmets", slug: "helmets", description: "Premium full-face helmets with advanced safety features", features: ["ECE Certified", "Anti-Fog Visor", "Aerodynamic Design"], image_url: null },
  { id: '2', name: "Riding Gears & Luggage", slug: "riding-gears-luggage", description: "High-quality jackets, gloves, and protective gear", features: ["CE Armor", "Abrasion Resistant", "All-Weather"], image_url: null },
  { id: '3', name: "Aux Lights", slug: "aux-lights", description: "High-power visibility solutions for all-weather riding", features: ["High Beam", "Waterproof", "Low Power Draw"], image_url: null },
  { id: '4', name: "Bike Protection & Fitments", slug: "bike-protection-fitments", description: "Custom cages, guards, and fitments for superior bike safety", features: ["Durable Metal Build", "Precision Fit", "Easy Installation"], image_url: null },
];

const fallbackImages: Record<string, string> = {
  helmets: helmetImg,
  'riding-gears-luggage': ridingGearImg,
  'aux-lights': aux,
  'bike-protection-fitments': prot,
};

const Products = () => {
  const { data: dbCategories, isLoading } = useCategories();
  const categories = dbCategories && dbCategories.length > 0 ? dbCategories : fallbackCategories;

  return (
    <section className="py-20 bg-card" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-chrome mb-4">
            Premium Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gear up with the best accessories and protection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))
            : categories.map((category, index) => {
                const imgSrc = category.image_url || fallbackImages[category.slug] || helmetImg;
                return (
                  <Card
                    key={category.id || index}
                    className="bg-background border border-white overflow-hidden hover:shadow-elevated transition-all duration-500 hover:scale-105 group relative"
                  >
                    <Link to={`/products?category=${category.slug}`}>
                      <div className="relative overflow-hidden h-64 rounded-md">
                        <img
                          src={imgSrc}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {category.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {category.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
                          Browse {category.name}
                        </Button>
                      </div>
                    </Link>
                  </Card>
                );
              })}
        </div>

        <div className="text-center mt-8">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-bold"
            asChild
          >
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
