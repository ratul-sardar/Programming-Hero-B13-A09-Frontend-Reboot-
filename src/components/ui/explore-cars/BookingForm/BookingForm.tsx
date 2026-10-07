"use client";

import { Button, Modal } from "@heroui/react";
import { CalendarDays } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { bookCar } from "@/app/api/bookings.api";
import type { carsType } from "@/app/api/cars.api";
import { authClient } from "@/lib/auth-client";

type BookingDialogProps = {
	car: carsType;
	close: () => void;
	userId: string;
	router?: AppRouterInstance;
};

type BookingFormProps = {
	car: carsType;
};

export default function BookingForm({ car }: BookingFormProps) {
	const router = useRouter();
	const { data: session, isPending: isSessionLoading } =
		authClient.useSession();

	if (!car.availability) {
		return (
			<Button isDisabled className="h-auto w-full py-3.5">
				Car not available
			</Button>
		);
	}

	if (isSessionLoading) {
		return (
			<Button isDisabled className="h-auto w-full py-3.5">
				Checking account...
			</Button>
		);
	}

	if (!session?.user.id) {
		return (
			<Button
				className="h-auto w-full py-3.5"
				onClick={() => router.push("/login")}
			>
				Book this car
			</Button>
		);
	}

	return (
		<Modal>
			<Button className="h-auto w-full py-3.5">Book this car</Button>
			<Modal.Backdrop variant="blur">
				<Modal.Container placement="auto" size="sm">
					<Modal.Dialog className="sm:max-w-md">
						{({ close }) => (
							<BookingDialog
								car={car}
								close={close}
								userId={session.user.id}
								router={router}
							/>
						)}
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}

function BookingDialog({ car, close, userId, router }: BookingDialogProps) {
	const [driverNeeded, setDriverNeeded] = useState(false);
	const [specialNote, setSpecialNote] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);

		try {
			await bookCar({
				userId,
				carId: car._id,
				driverNeeded,
				specialNote: specialNote.trim(),
				carDetails: car,
				bookingDate: new Date().toString(),
			});
			toast.success("Your car booking has been created!");
			close();
			router.refresh();
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Could not create your booking.",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Modal.CloseTrigger />
			<Modal.Header>
				<Modal.Icon className="bg-accent/10 text-accent">
					<CalendarDays className="size-5" />
				</Modal.Icon>
				<Modal.Heading>Book {car.name}</Modal.Heading>
			</Modal.Header>

			<Modal.Body className="flex flex-col gap-5">
				<p className="text-sm text-muted-foreground">
					${car.dailyPrice} per day · Pickup from {car.pickupLocation}
				</p>

				<fieldset className="flex flex-col gap-2">
					<legend className="text-sm font-semibold">
						Do you need a driver?
					</legend>
					<div className="grid grid-cols-2 gap-3">
						<label
							className={`cursor-pointer rounded-(--field-radius) border px-4 py-3 text-center text-sm font-semibold transition-colors ${
								!driverNeeded
									? "border-accent bg-accent/10 text-accent"
									: "border-border hover:border-accent/50"
							}`}
						>
							<input
								checked={!driverNeeded}
								className="sr-only"
								name="driverNeeded"
								onChange={() => setDriverNeeded(false)}
								type="radio"
								value="no"
							/>
							No
						</label>
						<label
							className={`cursor-pointer rounded-(--field-radius) border px-4 py-3 text-center text-sm font-semibold transition-colors ${
								driverNeeded
									? "border-accent bg-accent/10 text-accent"
									: "border-border hover:border-accent/50"
							}`}
						>
							<input
								checked={driverNeeded}
								className="sr-only"
								name="driverNeeded"
								onChange={() => setDriverNeeded(true)}
								type="radio"
								value="yes"
							/>
							Yes
						</label>
					</div>
				</fieldset>

				<label className="flex flex-col gap-2 text-sm font-semibold">
					Special note{" "}
					<span className="font-normal text-muted-foreground">(optional)</span>
					<textarea
						className="min-h-24 resize-y rounded-(--field-radius) border border-border bg-field-background px-3 py-2 font-normal text-field-foreground placeholder:text-field-placeholder focus:outline-none focus:ring-2 focus:ring-focus"
						maxLength={500}
						onChange={(event) => setSpecialNote(event.target.value)}
						placeholder="Share any pickup or rental requirements..."
						value={specialNote}
					/>
				</label>
			</Modal.Body>

			<Modal.Footer>
				<Button slot="close" type="button" variant="secondary">
					Cancel
				</Button>
				<Button isDisabled={isSubmitting} type="submit">
					{isSubmitting ? "Creating booking..." : "Confirm booking"}
				</Button>
			</Modal.Footer>
		</form>
	);
}
