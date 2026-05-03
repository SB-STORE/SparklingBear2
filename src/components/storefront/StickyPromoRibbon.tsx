import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Tag } from 'lucide-react';

// Always-visible left-edge ribbon — Autonity's "Anniversary Offer" pattern.
// Small footprint, persistent reminder, dismissible. Drives conversion on
// active sales without taking real estate from the rest of the page.

export function StickyPromoRibbon() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden md:block">
      {open ? (
        <div className="bg-primary text-primary-foreground rounded-r-lg shadow-2xl border-r border-border/40 max-w-xs animate-in slide-in-from-left-2 duration-200">
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">
                Limited Time
              </span>
              <button
                aria-label="Close offer"
                onClick={() => setOpen(false)}
                className="opacity-70 hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <h3 className="text-sm font-bold mb-2 leading-tight">
              Free Fitment Install
            </h3>
            <p className="text-[11px] opacity-90 mb-3 leading-relaxed">
              Bought a crash guard, saddle stay or aux light? Walk in to RR Nagar — we install it free.
            </p>
            <Link
              to="/feedback?subject=Free+Fitment+Booking"
              className="inline-flex items-center text-[11px] font-bold bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground px-3 py-1.5 rounded-full transition-colors"
              onClick={() => setOpen(false)}
            >
              Book a slot →
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="block text-[10px] opacity-60 hover:opacity-100 mt-2 underline"
            >
              Don't show again
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="View limited-time offer"
          className="bg-primary text-primary-foreground py-3 px-2 rounded-r-md shadow-lg hover:bg-primary/90 transition-colors flex flex-col items-center gap-2"
          style={{ writingMode: 'vertical-rl' as const, textOrientation: 'mixed' as const }}
        >
          <Tag className="h-3.5 w-3.5 -rotate-90" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Free Install
          </span>
        </button>
      )}
    </div>
  );
}
