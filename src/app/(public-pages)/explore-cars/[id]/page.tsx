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
type paramsType = {
	params: Promise<{ id: string }>;
};

export default async function CarDetails({ params }: paramsType) {
	const { id } = await params;

	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/cars/${id}`);
	const car: carsType = await res.json();

	return (
		<section className="">
			<div className="cssContainer">
				<h1 className="">Cars Details!</h1>
				<p className="">{car.name}</p>
			</div>
		</section>
	);
}
