import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function StoreLocation() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-center mb-10 text-gradient-chrome">
          Visit Our Store
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl overflow-hidden border border-border/30">
          {/* Map */}
          <div className="h-[300px] lg:h-auto min-h-[350px] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.52!3d12.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU1JzQ4LjAiTiA3N8KwMzEnMTIuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sparkling Bear Store Location"
            />
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col justify-center bg-card/50">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Sparkling Bear
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">RR Nagar, Bangalore, Karnataka 560098</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Store Hours</p>
                  <p className="text-sm text-muted-foreground">Mon - Sun: 10:00 AM - 8:00 PM</p>
                  <p className="text-xs text-primary font-medium mt-1">Open All Days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">To be updated</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a
                  href="https://maps.google.com/?q=RR+Nagar+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-green-600 text-green-500 hover:bg-green-600/10"
              >
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
