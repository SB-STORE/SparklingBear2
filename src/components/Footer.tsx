import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Send,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const quickLinks = [
  { label: 'Shop All', href: '/products' },
  { label: 'Helmets', href: '/products?category=helmets' },
  { label: 'Riding Gear', href: '/products?category=riding-gears-luggage' },
  { label: 'Accessories', href: '/products?category=bike-protection-fitments' },
  { label: 'Brands', href: '/brands' },
];

const policyLinks = [
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Return & Refund', href: '/return-refund' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Feedback', href: '/feedback' },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Thanks for subscribing!', {
      description: 'You\'ll receive updates on new arrivals and deals.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Newsletter bar — crimson accent band */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-white/80">
                Get updates on new arrivals, deals & exclusive offers.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto max-w-md gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1 md:w-64"
              />
              <Button
                type="submit"
                className="bg-white text-primary hover:bg-white/90 font-bold"
              >
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand info */}
          <div>
            <Link to="/" className="text-2xl font-bold text-gradient-chrome">
              SPARKLING BEAR
            </Link>
            <p className="text-primary font-semibold text-sm mt-1 mb-4">
              Ride Bold. Shine Hard. Rule the Road.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your one-stop destination for premium motorcycle accessories, riding gear,
              helmets, and professional car detailing services in Bangalore.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Customer Policies
            </h4>
            <ul className="space-y-2.5">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>RR Nagar, Bangalore, Karnataka 560098</span>
              </div>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="mailto:info@sparklingbear.in"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@sparklingbear.in</span>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Social links — to be updated with actual URLs */}
              <span className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground cursor-default" title="To be updated">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground cursor-default" title="To be updated">
                <Facebook className="h-4 w-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground cursor-default" title="To be updated">
                <Youtube className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods + trust band */}
      <Separator />
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider">
            <span>We Accept</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-white text-[10px] font-bold text-[#1a1f71] tracking-tighter">VISA</span>
              <span className="px-1.5 py-1 rounded bg-white flex items-center gap-0.5">
                <span className="w-3 h-3 rounded-full bg-[#eb001b]" />
                <span className="w-3 h-3 rounded-full bg-[#f79e1b] -ml-1.5 mix-blend-multiply" />
              </span>
              <span className="px-2 py-1 rounded bg-white text-[10px] font-bold tracking-tight">
                <span className="text-[#097939]">Ru</span>
                <span className="text-[#ed1c24]">Pay</span>
              </span>
              <span className="px-2 py-1 rounded bg-white text-[10px] font-bold tracking-tight">
                <span className="text-[#097939]">U</span>
                <span className="text-[#ed752e]">P</span>
                <span className="text-[#000]">I</span>
              </span>
              <span className="px-2 py-1 rounded bg-white text-[10px] font-bold tracking-tight text-[#5f259f]">
                PhonePe
              </span>
              <span className="px-2 py-1 rounded bg-white text-[10px] font-bold tracking-tight">
                <span className="text-[#4285f4]">G</span>
                <span className="text-[#ea4335]">o</span>
                <span className="text-[#fbbc04]">o</span>
                <span className="text-[#4285f4]">g</span>
                <span className="text-[#34a853]">l</span>
                <span className="text-[#ea4335]">e</span>
                <span className="text-foreground/80 ml-0.5">Pay</span>
              </span>
              <span className="px-2 py-1 rounded bg-white text-[10px] font-bold text-foreground/80 tracking-wider">COD</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/60 bg-card/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              100% Secure Checkout
            </span>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <Separator />
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Sparkling Bear. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <p>
              Made with care by{' '}
              <a
                href="https://www.instagram.com/trivision_group"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-medium hover:underline hover:text-primary transition-colors"
              >
                Trivision Group
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
