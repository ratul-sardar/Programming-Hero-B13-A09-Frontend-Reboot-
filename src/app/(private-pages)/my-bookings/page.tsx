import { Card } from "@heroui/react";
import { CalendarDays, CarFront } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { BookingType } from "@/app/api/bookings.api";
import { getBookedCars } from "@/app/api/bookings.api";
import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";
import { auth } from "@/lib/auth";

const MyBookings = async () => {
	const JWT = await auth.api.getToken({
		headers: await headers(),
	});
	const JWTToken = JWT?.token as string;

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) notFound();

	const bookings = await getBookedCars(session.user.id, JWTToken);
	const newestFirstBookings = [...bookings].sort(
		(first, second) =>
			new Date(second.bookingDate).getTime() -
			new Date(first.bookingDate).getTime(),
	);

	return (
		<section className="bg-background">
			<div className="cssContainer flex flex-col gap-8">
				<div className="flex flex-col gap-2">
					<p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
						Your rentals
					</p>
					<h1>My Bookings</h1>
					<p className="text-muted-foreground">
						View your booked cars, with your most recent booking first.
					</p>
				</div>

				{newestFirstBookings.length === 0 ? (
					<section className="flex min-h-80 flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-border bg-surface-secondary px-6 text-center">
						<span className="rounded-full bg-accent/10 p-4 text-accent">
							<CarFront className="size-8" />
						</span>
						<div className="space-y-2">
							<h2 className="card-title">No bookings yet</h2>
							<p className="max-w-md text-sm text-muted-foreground">
								Your booked cars will appear here. Explore the fleet to find the
								right car for your next journey.
							</p>
						</div>
						<PrimaryCta link="/explore-cars" className="" fullWidth={false}>
							Explore Cars
						</PrimaryCta>
					</section>
				) : (
					<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
						{newestFirstBookings.map((booking: BookingType) => (
							<Card
								key={booking._id}
								className="flex h-full w-full flex-col overflow-hidden"
							>
								<div className="relative aspect-4/3 w-full overflow-hidden bg-surface-secondary">
									<Image
										src={booking.carDetails.imageURL}
										alt={booking.carDetails.name}
										width={600}
										height={450}
										className="h-full w-full object-contain p-2"
										loading="lazy"
									/>
								</div>

								<div className="flex flex-1 flex-col gap-4">
									<Card.Header className="gap-1">
										<Card.Title className="text-xl">
											{booking.carDetails.name}
										</Card.Title>
										<Card.Description>
											{booking.carDetails.type}
										</Card.Description>
									</Card.Header>

									<Card.Footer className="mt-auto flex flex-col items-start gap-3 border-t border-border pt-4">
										<p className="text-lg font-bold">
											${booking.carDetails.dailyPrice}
											<span className="ml-1 text-sm font-normal text-muted-foreground">
												per day
											</span>
										</p>
										<p className="flex items-center gap-2 text-sm text-muted-foreground">
											<CalendarDays className="size-4 text-accent" />
											Booked {formatBookingDate(booking.bookingDate)}
										</p>
									</Card.Footer>
								</div>
							</Card>
						))}
					</section>
				)}
			</div>
		</section>
	);
};

function formatBookingDate(bookingDate: string) {
	const date = new Date(bookingDate);

	if (Number.isNaN(date.getTime())) return bookingDate;

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

export default MyBookings;
