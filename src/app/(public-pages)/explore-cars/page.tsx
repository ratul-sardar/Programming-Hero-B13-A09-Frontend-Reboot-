import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";

type carsType = {
	_id: string;
	name: string;
	dailyPrice: string;
	type: string;
	imageURL: string;
	seatCapacity: string;
	pickupLocation: string;
	description: string;
	availability: boolean;
	bookingCount: number;
	owner: string;
	createdAt: string;
	updatedAt: string;
};

export default async function ExploreCars() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/cars`);
	const cars = await res.json();

	return (
		<section className="">
			<div className="cssContainer">
				<h1 className="">hello darkness my old friend!</h1>

				<section className="flex flex-col gap-3">
					{cars.map((car: carsType) => carsPlaceholder(car))}
				</section>
			</div>
		</section>
	);
}

function carsPlaceholder(car: carsType) {
	return (
		<div key={car._id} className="flex gap-3">
			<p className="">{car.name}</p>
			<PrimaryCta
				link={`/explore-cars/${car._id}`}
				key={car._id}
				className=""
				fullWidth={false}
			>
				View details
			</PrimaryCta>
		</div>
	);
}
