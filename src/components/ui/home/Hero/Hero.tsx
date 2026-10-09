import { ArrowUpRight, PlusIcon } from "lucide-react";
import Image from "next/image";
import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";
import SecondaryCta from "@/components/shared/CTA Buttons/SecondaryCta/SecondaryCta";
import heroCar from "../../../../../public/hero-car.jpg";

const stats = [
  { value: "500+", label: "Premium Cars" },
  { value: "24/7", label: "Customer Support" },
  { value: "50+", label: "Pickup Locations" },
  { value: "98%", label: "Customer Satisfaction" },
];

export function Hero() {
  return (
    <section id="home" className="border-b border-border">
      <div className="cssContainer pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-24 lg:pb-32">
        <p className="text-accent! font-semibold! -mb-3">
          Premium Car Rental Experience
        </p>

        <h1 className="hero-title mt-6 max-w-[18ch]">
          Drive Beyond
          <br />
          The <span className="text-accent!">Ordinary</span>
        </h1>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">
            Discover premium vehicles designed for comfort, performance, and
            unforgettable journeys. From luxury sedans to powerful SUVs,
            DriveFleet gives you access to modern vehicles with a seamless
            rental experience.
          </p>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <SecondaryCta link="/add-cars" className={``}>
              Add Cars <PlusIcon className="size-4"></PlusIcon>
            </SecondaryCta>
            <PrimaryCta link="/explore-cars" className={``}>
              Explore Cars <ArrowUpRight className="size-4" />
            </PrimaryCta>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-(--radius) border border-border md:mt-16">
          <Image
            src={heroCar}
            alt="Premium car at golden hour"
            width={1600}
            height={1024}
            loading="eager"
            className="h-[40vh] w-full object-cover md:h-[60vh] lg:h-[70vh]"
          />
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-sans text-4xl font-black tracking-tight text-foreground md:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
