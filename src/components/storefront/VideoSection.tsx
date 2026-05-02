import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const VIDEO_URL = '/videos/hero-zana-ktm-adv.mp4';
const POSTER_URL = '/banners/hero-protection.jpg';

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.readyState < 2) video.load();
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative h-[420px] md:h-[600px] overflow-hidden">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        poster={POSTER_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 md:mb-4 max-w-3xl leading-tight uppercase tracking-tight">
          Ride Bold. Shine Hard.<br />Rule the Road.
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-5 md:mb-7 max-w-xl">
          Premium motorcycle accessories from India's most trusted brands — built for the road, tested by riders.
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
