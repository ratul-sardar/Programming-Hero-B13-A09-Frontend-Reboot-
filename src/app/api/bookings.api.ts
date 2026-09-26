import type { ObjectId } from "mongodb";
import { toast } from "react-toastify";
import type { carsType } from "./cars.api";

export type BookingType = {
  _id: string;
  userId: string;
  carId: ObjectId;
  driverNeeded: boolean;
  specialNote: string;
  carDetails: carsType;
  bookingDate: string;
};

export const getBookedCars = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/${id}`,
    );
    if (!res.ok) {
      throw new Error(`bookings.api.ts response was not ok :(`);
    }
    const cars: BookingType[] = await res.json();

    return cars;
  } catch (error) {
    console.log(`Couldn't get cars in the cars.api.ts error is: ${error}`);
    toast.error("something went wrong");
    throw error;
  }
};
