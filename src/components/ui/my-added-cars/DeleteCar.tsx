"use client";

import { Button } from "@heroui/react";
import { deleteCar } from "@/app/api/cars.api";

export default function DeleteCar({
	id,
	children,
}: {
	id: string;
	children: React.ReactNode;
}) {
	return (
		<Button variant="danger" onClick={() => deleteCar(id)}>
			{children}
		</Button>
	);
}
