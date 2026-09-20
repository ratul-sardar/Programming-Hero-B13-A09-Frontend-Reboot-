"use client";

import { useEffect, useState } from "react";
import { carsType, getCars } from "@/app/api/cars.api";
import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";
import LoadingSpinner from "@/components/shared/Loading Spinner/LoadingSpinner";

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

				<section className="flex flex-col gap-3">
					{loading ? (
						<LoadingSpinner />
					) : (
						cars.map((car: carsType) => carsPlaceholder(car))
					)}
					{/*{cars.map((car: carsType) => carsPlaceholder(car))}*/}
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
