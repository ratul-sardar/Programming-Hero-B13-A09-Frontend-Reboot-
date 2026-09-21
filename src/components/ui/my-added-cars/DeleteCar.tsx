"use client";

import { TrashBin } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import { deleteCar } from "@/app/api/cars.api";

type propsType = {
	id: string;
	children: React.ReactNode;
};

export default function DeleteCar({ id, children }: propsType) {
	const router = useRouter();

	async function deleteThisCar(id: string) {
		deleteCar(id);
		router.refresh();
	}

	return (
		<Modal>
			<Button variant="secondary">{children}</Button>
			<Modal.Backdrop>
				<Modal.Container>
					<Modal.Dialog className="sm:max-w-90">
						<Modal.CloseTrigger />
						<Modal.Header>
							<Modal.Icon className="bg-default text-foreground">
								<TrashBin className="size-5" />
							</Modal.Icon>
							<Modal.Heading>Delete car!</Modal.Heading>
						</Modal.Header>
						<Modal.Body>
							<p>
								Are you sure you want to delete this car? This can't be undone!
							</p>
						</Modal.Body>
						<Modal.Footer>
							<Button
								className="w-full"
								slot="close"
								variant="danger"
								onClick={() => deleteThisCar(id)}
							>
								Continue
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
