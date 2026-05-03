import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-content";

// Maps API key comes from env, not the DB. Vite-prefixed env vars are
// shipped to the client bundle (necessary — the maps Embed URL has to
// contain the key), so the only real protection is the HTTP-referer
// restriction configured in Google Cloud Console for this key. Never
// store this key in a publicly-readable site_settings row.
const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY ?? '';

const FALLBACK = {
  phone: '+91 91082 47377',
  address: '#2, Utharahalli Kengeri Main Rd, Opposite Shell Petrol Bunk, Banashankari 6th Stage, Srinivaspura, Bengaluru, Karnataka 560060',
  hours_open: '10 AM',
  hours_close: '8 PM',
  instagram_url: 'https://www.instagram.com/spa_rklebear?igsh=MWk0dXJ0em9xOGJmZQ==',
  facebook_url: 'https://www.facebook.com/share/1GJKzAg3cs/',
};

const Contact = () => {
  const { data: settings } = useSiteSettings();
  const s = { ...FALLBACK, ...settings };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`;

  return (
    <section className="py-20 bg-card" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-chrome mb-4">
            Visit Us Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience premium service at our state-of-the-art facility
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card className="bg-background border-gradient p-6 hover:shadow-elevated transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-metallic rounded-lg flex items-center justify-center glow-primary flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Call Us</h3>
                  <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="text-lg text-accent hover:text-accent/80 transition-colors">
                    {s.phone}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-background border-gradient p-6 hover:shadow-elevated transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-metallic rounded-lg flex items-center justify-center glow-accent flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Location</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {s.address.split(',').map((part, i) => (
                      <span key={i}>{part.trim()}{i < s.address.split(',').length - 1 && <br />}</span>
                    ))}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-background border-gradient p-6 hover:shadow-elevated transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-metallic rounded-lg flex items-center justify-center glow-primary flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Hours</h3>
                  <p className="text-accent font-semibold">Opens Daily at {s.hours_open}</p>
                  <p className="text-accent font-semibold">Closes {s.hours_close}</p>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-bold"
                onClick={() => window.open(googleMapsUrl, "_blank")}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Get Directions
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href={s.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-metallic rounded-lg flex items-center justify-center hover:glow-accent transition-all duration-300 hover:scale-110"
                title="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6 text-foreground" />
              </a>
              <a
                href={s.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-metallic rounded-lg flex items-center justify-center hover:glow-accent transition-all duration-300 hover:scale-110"
                title="Connect with us on Facebook"
              >
                <Facebook className="w-6 h-6 text-foreground" />
              </a>
            </div>
          </div>

          <Card className="bg-background border-gradient p-2 overflow-hidden hover:shadow-elevated transition-all duration-500">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=${encodeURIComponent(s.address)}`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px", borderRadius: "0.5rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sparkling Bear Location"
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
