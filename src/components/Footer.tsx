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

const quickLinks = [
  { label: 'Shop All', href: '/products' },
  { label: 'Helmets', href: '/products?category=helmets' },
  { label: 'Riding Gear', href: '/products?category=riding-gears-luggage' },
  { label: 'Accessories', href: '/products?category=bike-protection-fitments' },
  { label: 'About Us', href: '/#about' },
];

const policyLinks = [
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Return & Refund', href: '/return-refund' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only for now
    setEmail('');
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Newsletter bar */}
      <div className="bg-card">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-muted-foreground">
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
                className="bg-background border-border flex-1 md:w-64"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>To be updated</span>
              </div>
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

      {/* Copyright bar */}
      <Separator />
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Sparkling Bear. All rights reserved.
          </p>
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
    </footer>
  );
};

export default Footer;
