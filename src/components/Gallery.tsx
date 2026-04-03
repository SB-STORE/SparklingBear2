import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import heroBike from "@/assets/hero-bike.jpg";
import helmetImg from "@/assets/helmet.jpg";
import ridingGearImg from "@/assets/riding-gear.jpg";

import samplevideo1 from "@/assets/samplevideo2.mp4";
import samplevideo2 from "@/assets/samplevideo1.mp4";

import sample1 from "@/assets/sample1.jpg";
import sample2 from "@/assets/sample2.jpg";
import sample3 from "@/assets/sample3.jpg";
import sample4 from "@/assets/sample4.jpg";
import sample5 from "@/assets/sample5.jpg";
import sample6 from "@/assets/sample6.jpg";
import sample7 from "@/assets/sample7.jpg";
import sample8 from "@/assets/sample8.jpg";
import sample9 from "@/assets/sample9.jpg";
import sample10 from "@/assets/sample10.jpg";
import sample11 from "@/assets/sample11.jpg";
import sample12 from "@/assets/sample12.jpg";
import sample13 from "@/assets/sample13.jpg";
import sample14 from "@/assets/sample14.jpg";
import sample15 from "@/assets/sample15.jpg";
import sample16 from "@/assets/sample16.jpg";

import sample111 from "@/assets/sample111.webp";
import sample222 from "@/assets/sample222.jpg";
import sample333 from "@/assets/sample333.webp";
import sample444 from "@/assets/sample444.webp";

// Using local assets for gallery (videos/slideshows need local files)
// Once Supabase Storage is populated, these can be replaced with URLs from the DB
const galleryImages = [
  { src: heroCar, alt: "Premium Car Detailing", type: "video", video: samplevideo1 },
  { src: heroBike, alt: "Superbike Showcase", type: "video", video: samplevideo2 },
  {
    src: helmetImg,
    alt: "Helmet Collection",
    type: "slideshow",
    slides: [sample1, sample2, sample3, sample4, sample5, sample6, sample7, sample8, sample9, sample10, sample11, sample12, sample13, sample14, sample15, sample16],
  },
  {
    src: ridingGearImg,
    alt: "Premium Riding Gear",
    type: "slideshow",
    slides: [sample111, sample222, sample333, sample444],
  },
];

const Gallery = () => {
  const [activeMedia, setActiveMedia] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (activeMedia && activeMedia.type === "slideshow") {
      const interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === activeMedia.slides.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeMedia]);

  const closeMedia = () => {
    setActiveMedia(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (activeMedia?.type === "slideshow") {
      setCurrentSlide((prev) =>
        prev === activeMedia.slides.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (activeMedia?.type === "slideshow") {
      setCurrentSlide((prev) =>
        prev === 0 ? activeMedia.slides.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-card to-background relative" id="gallery">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-chrome mb-4">
            Our Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Witness perfection in every detail
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setActiveMedia(image)}
              className="relative overflow-hidden rounded-lg border-gradient group cursor-pointer aspect-video"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-2xl font-bold text-foreground">{image.alt}</p>
              </div>
              <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-500 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {activeMedia && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-5xl mx-auto">
            <button
              onClick={closeMedia}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 z-20"
            >
              ✕
            </button>

            {activeMedia.type === "video" && (
              <video
                src={activeMedia.video}
                controls
                autoPlay
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            )}

            {activeMedia.type === "slideshow" && (
              <div className="relative w-full h-[70vh] overflow-hidden rounded-lg shadow-2xl flex items-center justify-center">
                <img
                  key={currentSlide}
                  src={activeMedia.slides[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full h-full object-contain transition-all duration-700 ease-in-out opacity-100 scale-105 animate-fadeZoom"
                />
                <button
                  onClick={prevSlide}
                  className="absolute left-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition"
                >
                  <ChevronRight size={32} />
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {activeMedia.slides.map((_: any, i: number) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === currentSlide ? "bg-primary scale-110" : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
