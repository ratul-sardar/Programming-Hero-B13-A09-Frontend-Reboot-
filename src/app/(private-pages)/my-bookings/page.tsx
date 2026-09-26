import { Card } from "@heroui/react";
import Image from "next/image";
import type { BookingType } from "@/app/api/bookings.api";
import { getBookedCars } from "@/app/api/bookings.api";

const MyBookings = async () => {
  const bookings: BookingType[] = await getBookedCars("ratul");

  return (
    <section className="">
      <div className="cssContainer flex flex-col items-center justify-center gap-8">
        <h1 className="">My Bookings</h1>
        <section className="w-full flex flex-wrap gap-3">
          {bookings.map((booking) => (
            <Card key={booking._id} className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative h-auto w-full   overflow-hidden rounded-2xl">
                <Image
                  src={booking.carDetails.imageURL}
                  alt="Car Image"
                  width={400}
                  height={400}
                  className="pointer-events-none h-full w-full object-contain select-none"
                  loading="lazy"
                ></Image>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <Card.Header className="gap-1">
                  <Card.Title className="pe-8">
                    {booking.carDetails.name}
                  </Card.Title>
                  <Card.Description>{booking.carDetails.type}</Card.Description>
                </Card.Header>
                <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      Total Price: {booking.carDetails.dailyPrice}
                    </span>
                    <span className="text-xs text-muted">
                      Booking Date: {booking.bookingDate}
                    </span>
                  </div>
                  {/* Add other UI info in the card */}
                </Card.Footer>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </section>
  );
};

export default MyBookings;
