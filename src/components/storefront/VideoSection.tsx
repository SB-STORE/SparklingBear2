import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import sampleVideo from '@/assets/samplevideo1.mp4';

export function VideoSection() {
  return (
    <section className="relative h-[300px] md:h-[400px] overflow-hidden">
      {/* Background video */}
      <video
        src={sampleVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 max-w-3xl leading-tight">
          Freedom Feels Like Wind On Your Face
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/70 mb-5 md:mb-6 max-w-xl">
          Explore our curated collection of riding gear and accessories built for the open road.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wider"
        >
          <Link to="/products">
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
