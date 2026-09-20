import { Card } from "@heroui/react";
import Link from "next/link";
import type { carsType } from "@/app/api/cars.api";
import { getUserAddedCars } from "@/app/api/cars.api";
import DeleteCar from "@/components/ui/my-added-cars/DeleteCar";
import { EditCarsModal } from "@/components/ui/my-added-cars/EditCarsModal";

export default async function MyAddedCars() {
	const userId = "ratul"; // placeholder for development

	const cars = await getUserAddedCars(userId);
	return (
		<section className="">
			<div className="cssContainer flex flex-col gap-6">
				<h1 className="text-center font-bold text-4xl">My added cars</h1>
				<section className="flex flex-col gap-3">
					{cars.map((car: carsType) => (
						<Card
							key={`${car?._id}`}
							className="flex flex-row border border-gray-500/10 bg-white gap-6"
						>
							<div className="aspect-4/3 max-w-[320px] overflow-hidden bg-muted">
								Image plceholder
							</div>
							<div className="space-y-4">
								<Card.Header className="gap-2">
									<Link href={`/explore-cars/${car?._id}`}>
										<Card.Title className="text-blue-900 text-2xl!">
											{car.name}
										</Card.Title>
									</Link>
									<Card.Description className="text-blue-700">
										{car.availability}
									</Card.Description>
								</Card.Header>
								<Card.Content className="flex-row gap-4">
									<EditCarsModal id={car?._id}></EditCarsModal>
									<DeleteCar id={car?._id}>Delete</DeleteCar>
								</Card.Content>
							</div>
						</Card>
					))}
				</section>
			</div>
		</section>
	);
}
