"use client";

import { useEffect, useState } from "react";
import type { carsType } from "@/app/api/cars.api";
import { getCars } from "@/app/api/cars.api";
import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";
import LoadingSpinner from "@/components/shared/Loading Spinner/LoadingSpinner";
import CarCard from "@/components/ui/explore-cars/CarCard";

export default function ExploreCars() {
  // Filter states
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  //
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
    <section className="">
      <div className="cssContainer">
        <h1 className="">hello darkness my old friend!</h1>

        <section className="flex gap-6">
          <div className="w-[20%]">hi</div>
          <div className="w-[80%] grid grid-cols-3 gap-4">
            {loading ? (
              <LoadingSpinner />
            ) : (
              cars.map((car: carsType) => (
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
              ))
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
