const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          {/* Logo and tagline */}
          <div>
            <h3 className="text-3xl font-bold text-gradient-chrome mb-2">
              SPARKLING BEAR
            </h3>
            <p className="text-primary font-semibold text-lg">
              Ride Bold. Shine Hard. Rule the Road.
            </p>
          </div>

          {/* Description */}
          <div className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            <p className="mb-4">
              Are you looking for{" "}
              <span className="text-accent font-semibold">
                Bike Accessories & Car Detailing Near me RR Nagar
              </span>
              ? Sparkling Bear is your ultimate choice — offering a premium range
              of{" "}
              <span className="text-accent font-semibold">
                Riding Gear, LS2 & Axor Helmets near RR Nagar, Bangalore
              </span>
              . Our experts deliver flawless{" "}
              <span className="text-accent font-semibold">
                Paint Protection Film
              </span>
              , advanced{" "}
              <span className="text-accent font-semibold">Ceramic Coating</span>,
              and professional{" "}
              <span className="text-accent font-semibold">car detailing</span>.
            </p>
            <p>
              We also stock high-quality motorcycle clothing, riding shoes, and
              accessories — making us your one-stop destination for{" "}
              <span className="text-accent font-semibold">
                car detailing near me, LS2 helmet near me, Axor helmet near me,
                ceramic coating near me, riding gears near me, paint protection
                film near me, and bike accessories near me
              </span>
              .
            </p>
          </div>

          {/* Footer bottom */}
          <div className="pt-6 border-t border-border">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Sparkling Bear. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Made with ❤️ by{" "}
              <a
                href="https://www.instagram.com/trivision_group?igsh=cXA4a2VhZDNjbTNi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-medium hover:underline hover:text-primary transition-colors duration-200"
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
