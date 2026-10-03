"use client";

import { useEffect, useState } from "react";
import type { carsType } from "@/app/api/cars.api";
import { getCars } from "@/app/api/cars.api";
import LoadingSpinner from "@/components/shared/Loading Spinner/LoadingSpinner";
import CarCard from "@/components/ui/explore-cars/CarCard";
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
    <section className="">
      <div className="cssContainer">
        <h1 className="">hello darkness my old friend!</h1>

        <section className="flex gap-6">
          {/* Filter side */}
          <div className="w-[20%] flex flex-col gap-8">
            <div className="flex flex-col justify-center items-start gap-2">
              <input type="text" className="border border-gray-500"></input>
              <button
                type="submit"
                className="bg-green-500 px-5 py-1.5 rounded-full text-white"
              >
                Search
              </button>
            </div>

            <div className="flex flex-col items-start justify-center gap-1.5">
              <TypeFilter
                key={type}
                active={type}
                setType={setType}
                carFilterTypes={carFilterTypes}
              ></TypeFilter>
            </div>
          </div>

          {/* Cars Listing */}
          <div className="w-[80%] h-fit grid grid-cols-3 gap-4">
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
