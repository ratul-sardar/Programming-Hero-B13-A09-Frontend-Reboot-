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

export const getCars = async (search?: string, type?: string) => {
	const params = new URLSearchParams({});
	if (search) params.set("search", search);
	if (type) params.set("type", type);

	const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URI}/cars`);
	url.search = params.toString();

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`cars.api.ts response was not ok :(`);
	}
	const cars: carsType[] = await res.json();

	return cars;
};
