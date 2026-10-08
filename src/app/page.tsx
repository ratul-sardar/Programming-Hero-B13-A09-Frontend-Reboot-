import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { type carsType, getCars } from "@/app/api/cars.api";
import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";
import CarCard from "@/components/ui/explore-cars/CarCard";
import FaqSection from "@/components/ui/home/FaqSection";
import { Hero } from "@/components/ui/home/Hero/Hero";

const benefits = [
  "A curated range of cars for every kind of trip",
  "Clear daily pricing before you book",
  "Convenient pickup locations across town",
];

export default async function Home() {
  let cars: carsType[] = [];

  try {
    cars = (await getCars()).slice(0, 8);
  } catch {
    cars = [];
  }

  return (
    <div className="overflow-hidden">
      <Hero></Hero>

      <section id="available-cars" className="cssContainer">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
              Find your ride
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Available cars
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              A few favorites to get your next adventure moving.
            </p>
          </div>
          <PrimaryCta link="/explore-cars" className="" fullWidth={false}>
            See More
          </PrimaryCta>
        </div>

        {cars.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cars.map((car) => (
              <CarCard
                key={car._id}
                _id={car._id}
                name={car.name}
                dailyPrice={car.dailyPrice}
                type={car.type}
                imageURL={car.imageURL}
                seatCapacity={car.seatCapacity}
                pickupLocation={car.pickupLocation}
                availability={car.availability}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface-secondary px-6 py-12 text-center">
            <p className="text-lg font-semibold">Cars are on the way</p>
            <p className="mt-2 text-sm text-muted">
              Explore the fleet to see the latest listings.
            </p>
            <div className="mt-5">
              <PrimaryCta link="/explore-cars" className="" fullWidth={false}>
                Browse all cars
              </PrimaryCta>
            </div>
          </div>
        )}
      </section>

      <section className="bg-surface-secondary">
        <div className="cssContainer grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
              A better way to get there
            </p>
            <h2 className="max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
              Less planning. More going.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-muted">
              Whether it is a quick city errand or a weekend out of town, Drive
              Fleet makes it simple to find a ride that feels right.
            </p>
            <ul className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-800">
                    <Check size={15} />
                  </span>
                  <span className="text-sm font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl bg-foreground p-8 text-background sm:p-12">
            <div className="absolute right-8 top-8 text-accent">
              <Sparkles size={26} />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent!">
              Made for your plans
            </p>
            <p className="mt-10 text-5xl font-bold text-background!">
              Your trip.
            </p>
            <p className="text-5xl font-bold text-accent!">Your rules.</p>
            <p className="mt-5 max-w-sm leading-7 text-background/70!">
              Choose the car, set your pace, and make the most of every mile.
            </p>
            <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-background/80!">
              <ShieldCheck size={19} className="text-accent" /> A smoother
              rental experience
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
