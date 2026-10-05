"use client";

import { useEffect, useState } from "react";
import type { carsType } from "@/app/api/cars.api";
import { getCars } from "@/app/api/cars.api";
import LoadingSpinner from "@/components/shared/Loading Spinner/LoadingSpinner";
import CarCard from "@/components/ui/explore-cars/CarCard";
import HeroSection from "@/components/ui/explore-cars/HeroSection/HeroSection";
import TypeFilter from "@/components/ui/explore-cars/TypeFilter";

export default function ExploreCars() {
  // Filter states
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const [carFilterTypes, setCarFilterTypes] = useState<string[]>([]);
  useEffect(() => {
    async function getCarsTypes() {
      try {
        const cars = await getCars();
        const carTypes = cars.map((car) => car.type);
        setCarFilterTypes([...new Set(carTypes)]);
      } catch (err) {
        console.log(`error loading cars data, error details : ${err}`);
      }
    }

    getCarsTypes();
  }, []);

  // Data fetching and loading
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<carsType[]>([]);

  useEffect(() => {
    setLoading(true);
    async function getCarsUse() {
      try {
        const cars = await getCars(search, type);

        setCars(cars);
        setLoading(false);
      } catch (err) {
        console.log(`error loading cars data, error details : ${err}`);
        setCars([]);
        setLoading(false);
      }
    }

    getCarsUse();
  }, [search, type]);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Filters + Car Listing */}
      <div id="fleet" className="cssContainer flex flex-col gap-8">
        <section className="flex flex-col gap-8 lg:flex-row lg:gap-6">
          {/* Filter side */}
          <div className="w-full lg:w-[20%] flex flex-col gap-8">
            <div className="flex flex-col justify-center items-start gap-2">
              <label
                htmlFor="search"
                className="text-sm font-medium text-muted-foreground"
              >
                Search cars
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by name..."
                className="w-full rounded-(--field-radius) border border-border bg-field-background px-3 py-2 text-sm text-field-foreground placeholder:text-field-placeholder focus:outline-none focus:ring-2 focus:ring-focus"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-col items-start justify-center gap-1.5">
              <TypeFilter
                active={type}
                setType={setType}
                carFilterTypes={carFilterTypes}
              ></TypeFilter>
            </div>
          </div>

          {/* Cars Listing */}
          <div className="w-full lg:w-[80%] h-fit">
            {loading ? (
              <div className="flex items-center justify-center min-h-60">
                <LoadingSpinner />
              </div>
            ) : cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 min-h-60 text-center">
                <p className="text-lg font-medium">No cars found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  Showing {cars.length} {cars.length === 1 ? "car" : "cars"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cars.map((car: carsType) => (
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
                    ></CarCard>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
