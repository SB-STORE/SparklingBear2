import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonials } from "@/hooks/use-content";
import { useSiteSettings } from "@/hooks/use-content";

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6 mr-2">
    <path fill="#EA4335" d="M24 9.5c3.94 0 6.58 1.7 8.09 3.13l5.91-5.91C34.22 3.56 29.52 1.5 24 1.5 14.91 1.5 7.17 6.79 3.57 14.15l6.91 5.37C12.2 13.19 17.58 9.5 24 9.5z" />
    <path fill="#34A853" d="M46.5 24.5c0-1.64-.15-3.21-.44-4.73H24v9h12.75c-.55 2.83-2.2 5.22-4.64 6.83l7.1 5.5c4.15-3.83 6.79-9.48 6.79-16.6z" />
    <path fill="#4A90E2" d="M9.57 28.98A14.42 14.42 0 0 1 9 24c0-1.74.3-3.43.85-4.98l-6.91-5.37A22.43 22.43 0 0 0 1.5 24c0 3.65.88 7.11 2.45 10.15l7.09-5.17z" />
    <path fill="#FBBC05" d="M24 46.5c6.12 0 11.25-2.02 15-5.5l-7.1-5.5c-2 1.34-4.57 2.13-7.9 2.13-6.42 0-11.8-3.69-14.52-8.83l-7.09 5.17C7.17 41.21 14.91 46.5 24 46.5z" />
  </svg>
);

const fallbackTestimonials = [
  { id: '1', customer_name: "Dhrutil Krishna", rating: 5, text: "Got a full-body PPF and wash for my Himalayan 411—looks brand new! Amazing job by Mr. Abhishek and team." },
  { id: '2', customer_name: "Anirudh Shastry", rating: 5, text: "Excellent service! Maddog Scout X installed perfectly—Abhishek and team never miss." },
  { id: '3', customer_name: "Adithya Mahesh", rating: 5, text: "Sparkling Bear is my go-to for riding gear—great collection and service. Abhishek even fixed my BluArmor C30 personally!" },
];

const FALLBACK_REVIEW_URL = "https://www.google.com/maps/place/Sparkling+Bear-+Car+Detailing+%26+Bike+Accessories,+PPF+Ceramic+coating+Ls2+Axor+Helmet+Near+Me./@12.9037325,77.5059767,17z/data=!4m8!3m7!1s0x3bae3f44edb32f05:0x524baa5975533f7!8m2!3d12.9037325!4d77.5085516!9m1!1b1!16s%2Fg%2F11syrlpfk8?entry=ttu";

const Testimonials = () => {
  const { data: dbTestimonials, isLoading } = useTestimonials();
  const { data: settings } = useSiteSettings();
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;
  const reviewUrl = settings?.google_review_url || FALLBACK_REVIEW_URL;

  return (
    <section className="py-20 bg-background" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-chrome mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real reviews from satisfied riders and car enthusiasts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-4 w-32" />
                </Card>
              ))
            : testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id || index}
                  className="bg-card/50 backdrop-blur-sm border-gradient p-6 hover:shadow-elevated transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="text-foreground font-semibold">— {testimonial.customer_name}</p>
                </Card>
              ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-md hover:shadow-xl border flex items-center justify-center mx-auto transition-all duration-300"
            onClick={() => window.open(reviewUrl, "_blank", "noopener,noreferrer")}
          >
            <GoogleIcon />
            Leave a Review on Google
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
