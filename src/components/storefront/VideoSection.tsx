import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const VIDEO_URL = 'https://cdn.pixabay.com/video/2025/07/19/292284_large.mp4';
const POSTER_URL = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80&auto=format&fit=crop';

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => setVideoFailed(true);
    video.addEventListener('error', handleError);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.readyState < 2) {
            video.load();
          }
          video.play().catch(() => setVideoFailed(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section className="relative h-[300px] md:h-[400px] overflow-hidden">
      {!videoFailed ? (
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
      ) : (
        <img
          src={POSTER_URL}
          alt="Riding background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

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
