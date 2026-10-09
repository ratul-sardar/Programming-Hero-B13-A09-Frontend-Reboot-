import { ArrowLeft, CalendarDays, Check, MapPin, Users, X } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { carsType } from "@/app/api/cars.api";
import BookingForm from "@/components/ui/explore-cars/BookingForm/BookingForm";
import { auth } from "@/lib/auth";

type PropsType = {
  params: Promise<{ id: string }>;
};

export default async function CarDetails({ params }: PropsType) {
  const JWT = await auth.api.getToken({ headers: await headers() });
  const JWTToken = JWT?.token as string;

  const { id } = await params;
  let car: carsType;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/cars/${id}`,
    );

    if (response.status === 404) notFound();
    if (!response.ok) throw new Error("Could not load car details");
    car = await response.json();
  } catch {
    notFound();
  }

  return (
    <section className="bg-background">
      <div className="cssContainer flex flex-col gap-8">
        <Link
          href="/explore-cars"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} /> Back to all cars
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            <div className="absolute left-4 top-4 z-10 rounded-full border border-border/60 bg-surface/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              {car.type}
            </div>
            <div
              className={`absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                car.availability
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {car.availability ? <Check size={14} /> : <X size={14} />}
              {car.availability ? "Available now" : "Currently unavailable"}
            </div>
            <Image
              src={car.imageURL}
              alt={car.name}
              width={1200}
              height={800}
              priority
              className="aspect-4/3 w-full object-contain p-2"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <aside className="flex flex-col gap-6 rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                DriveFleet Collection
              </p>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                {car.name}
              </h1>
              <p className="text-muted-foreground">
                {car.description || "A great choice for your next journey."}
              </p>
            </div>

            <div className="border-y border-border py-5">
              <p className="flex items-baseline gap-2">
                <span className="text-4xl font-black">${car.dailyPrice}</span>
                <span className="text-sm text-muted-foreground">per day</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Spec
                icon={<Users size={18} />}
                label="Seats"
                value={car.seatCapacity}
              />
              <Spec
                icon={<MapPin size={18} />}
                label="Pickup location"
                value={car.pickupLocation}
              />
              <Spec
                icon={<CalendarDays size={18} />}
                label="Bookings"
                value={`${car.bookingCount}`}
              />
              <Spec
                icon={<Check size={18} />}
                label="Availability"
                value={car.availability ? "Available" : "Unavailable"}
              />
            </div>

            <BookingForm car={car} JWTToken={JWTToken} />
          </aside>
        </div>
      </div>
    </section>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 gap-3 rounded-2xl bg-surface-secondary p-4">
      <span className="mt-0.5 shrink-0 text-accent">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
