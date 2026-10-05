import { ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-surface-secondary to-background" />

      {/* Decorative accent shapes */}
      <div className="absolute -top-24 -right-24 size-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 size-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="cssContainer relative flex flex-col lg:items-center gap-10 py-12 md:py-16 lg:flex-row lg:gap-16 lg:py-20">
        {/* Left contents */}
        <div className="flex flex-1 flex-col items-start gap-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <Zap size={14} />
            Premium Car Rentals
          </span>

          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Find Your Perfect
            <span className="text-accent"> Ride</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Browse our curated fleet of luxury, SUV, sports, and everyday
            vehicles. Transparent pricing, instant booking, and 24/7 support for
            every journey.
          </p>

          {/* Trust indicators */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-accent" />
              Verified vehicles
            </span>
            <span className="flex items-center gap-2">
              <Zap size={16} className="text-accent" />
              Instant booking
            </span>
          </div>
        </div>

        {/* Right: Hero image */}
        <div className="relative w-full max-w-md shrink-0 lg:max-w-xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/40 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Luxury cars"
              width={600}
              height={400}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
