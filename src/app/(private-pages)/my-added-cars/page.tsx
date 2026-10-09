import { Card } from "@heroui/react";
import { CalendarDays, CarFront, MapPin, Users } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { carsType } from "@/app/api/cars.api";
import { getUserAddedCars } from "@/app/api/cars.api";
import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";
import DeleteCar from "@/components/ui/my-added-cars/DeleteCar";
import { EditCarsModal } from "@/components/ui/my-added-cars/EditCarsModal";
import { auth } from "@/lib/auth";

export default async function MyAddedCars() {
	const JWT = await auth.api.getToken({
		headers: await headers(),
	});
	const JWTToken = JWT.token;

	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) notFound();

	const cars = await getUserAddedCars(session.user.id, JWTToken);
	const newestFirstCars = [...cars].sort(
		(first, second) =>
			new Date(second.createdAt).getTime() -
			new Date(first.createdAt).getTime(),
	);

	return (
		<section className="bg-background">
			<div className="cssContainer flex flex-col gap-8">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="flex flex-col gap-2">
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
							Your fleet
						</p>
						<h1>My Added Cars</h1>
						<p className="text-muted-foreground">
							Manage your listings, availability, and vehicle details.
						</p>
					</div>
					<PrimaryCta link="/add-car" className="" fullWidth={false}>
						Add another car
					</PrimaryCta>
				</div>

				{newestFirstCars.length === 0 ? (
					<section className="flex min-h-80 flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-border bg-surface-secondary px-6 text-center">
						<span className="rounded-full bg-accent/10 p-4 text-accent">
							<CarFront className="size-8" />
						</span>
						<div className="space-y-2">
							<h2 className="card-title">You have not added any cars yet</h2>
							<p className="max-w-md text-sm text-muted-foreground">
								Add your first vehicle to start sharing it with DriveFleet
								renters.
							</p>
						</div>
						<PrimaryCta link="/add-car" className="" fullWidth={false}>
							Add your first car
						</PrimaryCta>
					</section>
				) : (
					<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
						{newestFirstCars.map((car: carsType) => (
							<Card
								key={car._id}
								className="flex h-full w-full flex-col overflow-hidden"
							>
								<div className="relative aspect-4/3 w-full overflow-hidden bg-surface-secondary">
									<span
										className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
											car.availability
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{car.availability ? "Available" : "Unavailable"}
									</span>
									<Image
										src={car.imageURL}
										alt={car.name}
										width={600}
										height={450}
										className="h-full w-full object-contain p-2 transition-transform duration-300"
										loading="lazy"
									/>
								</div>

								<div className="flex flex-1 flex-col gap-4">
									<Card.Header className="gap-1">
										<Link
											href={`/explore-cars/${car._id}`}
											className="w-fit transition-colors hover:text-accent"
										>
											<Card.Title className="card-title">{car.name}</Card.Title>
										</Link>
										<Card.Description>{car.type}</Card.Description>
									</Card.Header>

									<Card.Content className="flex flex-col gap-3 text-sm text-muted-foreground">
										<p className="flex items-center gap-2">
											<Users className="size-4 text-accent" />
											{car.seatCapacity} seats
										</p>
										<p className="flex items-center gap-2">
											<MapPin className="size-4 text-accent" />
											<span className="truncate">{car.pickupLocation}</span>
										</p>
										<p className="flex items-center gap-2">
											<CalendarDays className="size-4 text-accent" />
											Added {formatAddedDate(car.createdAt)}
										</p>
									</Card.Content>

									<Card.Footer className="mt-auto flex flex-col gap-4 border-t border-border pt-4">
										<div className="flex w-full items-end justify-between">
											<p className="text-lg font-bold">
												${car.dailyPrice}
												<span className="ml-1 text-sm font-normal text-muted-foreground">
													per day
												</span>
											</p>
											<span className="text-xs text-muted-foreground">
												{car.bookingCount} bookings
											</span>
										</div>
										<div className="flex w-full gap-3">
											<EditCarsModal id={car._id} />
											<DeleteCar id={car._id} JWTToken={JWTToken}>
												Delete
											</DeleteCar>
										</div>
									</Card.Footer>
								</div>
							</Card>
						))}
					</section>
				)}
			</div>
		</section>
	);
}

function formatAddedDate(createdAt: string) {
	const date = new Date(createdAt);

	if (Number.isNaN(date.getTime())) return createdAt;

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}
