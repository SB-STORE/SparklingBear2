import { Button } from "@/components/ui/button";
import { Phone, MapPin as MapIcon, Clock } from "lucide-react"; // Added Clock and aliased MapPin
import heroCar from "@/assets/hero-car.jpg";
import heroBike from "@/assets/hero-bike.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Images */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 animate-fade-in"
          style={{ 
            backgroundImage: `url(${heroCar})`,
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-glow-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
          {/* Logo/Brand */}
          <div className="inline-block">
            <h1 className="text-6xl md:text-8xl font-bold font-sans text-gradient-chrome mb-2">
              SPARKLING BEAR
            </h1>
            <div className="h-1 bg-gradient-chrome rounded-full" />
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-4xl font-semibold text-primary tracking-wide">
            Ride Bold. Shine Hard. Rule the Road.
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Premium Car Detailing, Paint Protection Film, Ceramic Coating, LS2 & Axor Helmets, 
            and the finest Riding Gear in Bengaluru
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary text-lg px-8 py-6 font-bold transition-all duration-300 hover:scale-105"
              onClick={() => window.location.href = 'tel:09108247377'}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-secondary text-foreground hover:bg-secondary/20 glow-accent text-lg px-8 py-6 font-bold transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MapIcon className="mr-2 h-5 w-5" />
              Visit Us
            </Button>
          </div>

          {/* Business Info Pills */}
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-full">
              <MapIcon className="w-4 h-4 text-accent" />
              <span className="text-accent font-semibold">RR Nagar, Bangalore</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-full">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-accent font-semibold">Open till 8 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
