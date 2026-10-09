import { toast } from "react-toastify";
import type { carsType } from "./cars.api";

export type BookingType = {
  _id: string;
  userId: string;
  carId: string;
  driverNeeded: boolean;
  specialNote: string;
  carDetails: carsType;
  bookingDate: string;
};

export type CreateBookingInput = Omit<BookingType, "_id">;

export const getBookedCars = async (id: string, JWTToken: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWTToken}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`bookings.api.ts response was not ok :(`);
    }
    const cars: BookingType[] = await res.json();

    return cars;
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
};

export const bookCar = async (
  bookingData: CreateBookingInput,
  JWTToken: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTToken}`,
      },
      body: JSON.stringify(bookingData),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Could not create booking");
  }

  return (await response.json()) as BookingType;
};
