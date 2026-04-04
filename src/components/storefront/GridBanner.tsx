import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface GridBannerProps {
  title?: string;
  image?: string;
  videoUrl?: string;
  link?: string;
  className?: string;
}

export function GridBanner({ title, image, videoUrl, link = '/products', className }: GridBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    const handleError = () => setVideoFailed(true);
    video.addEventListener('error', handleError);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Force load then play
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
  }, [videoUrl]);

  const showVideo = videoUrl && !videoFailed;

  const content = (
    <div
      className={cn(
        'relative w-full rounded-lg overflow-hidden cursor-pointer group',
        'aspect-[2/1] md:aspect-[3/1]',
        className
      )}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={image}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : image ? (
        <img
          src={image}
          alt={title || 'Banner'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-primary/30 to-card" />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      {title && (
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
            {title}
          </h3>
        </div>
      )}
    </div>
  );

  return (
    <section className="container mx-auto px-4 py-4 md:py-6">
      <Link to={link}>{content}</Link>
    </section>
  );
}
