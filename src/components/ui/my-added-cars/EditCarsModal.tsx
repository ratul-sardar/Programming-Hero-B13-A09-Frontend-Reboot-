"use client";

import { PencilToLine } from "@gravity-ui/icons";
import {
	Button,
	FieldError,
	Form,
	Input,
	InputGroup,
	Label,
	ListBox,
	Modal,
	Select,
	Surface,
	TextArea,
	TextField,
} from "@heroui/react";
import { MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { updateCar } from "@/lib/actions/updateCar";
// import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";

export function EditCarsModal({ id }: { id: string }) {
	const onSubmit = async (e: any) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		// console.log(formData.entries().toArray());

		try {
			const result = await updateCar(formData, id);
			toast.success("Car info updated successfully!");
			e.target.reset();
			console.log(result);
		} catch (error: any) {
			toast.error(error.message || "Failed to update car info");
		}
	};

	return (
		<Modal>
			<Button variant="outline">Edit Car Info</Button>
			<Modal.Backdrop>
				<Modal.Container placement="auto">
					<Modal.Dialog className="sm:max-w-md">
						<Modal.CloseTrigger />
						<Modal.Header>
							<Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
								<PencilToLine className="size-5" />
							</Modal.Icon>
							<Modal.Heading>Edit Car Info</Modal.Heading>
						</Modal.Header>
						<Modal.Body className="p-6">
							<Surface variant="default">
								<Form
									className="flex w-full flex-col gap-4"
									onSubmit={onSubmit}
								>
									{/* Daily Rent Price*/}
									<TextField name="dailyPrice" type="number">
										<Label>Daily Rent Price</Label>
										<InputGroup>
											<InputGroup.Prefix>$</InputGroup.Prefix>
											<InputGroup.Input
												className="w-full"
												placeholder="10"
												min={`0`}
											/>
											<InputGroup.Suffix>/hr</InputGroup.Suffix>
										</InputGroup>
										<FieldError />
									</TextField>

									{/* Type of Cars*/}
									<Select
										name="type"
										className="w-full"
										placeholder="Select one"
									>
										<Label>Car Type</Label>
										<Select.Trigger>
											<Select.Value />
											<Select.Indicator />
										</Select.Trigger>
										<Select.Popover>
											<ListBox>
												<ListBox.Item id="SUV" textValue="SUV">
													SUV
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item id="Sedan" textValue="Sedan">
													Sedan
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item id="Hatchback" textValue="Hatchback">
													Hatchback
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item id="Luxury" textValue="Luxury">
													Luxury
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item id="Sports" textValue="Sports">
													Sports
													<ListBox.ItemIndicator />
												</ListBox.Item>
											</ListBox>
										</Select.Popover>
									</Select>

									{/* Photo Url */}
									<TextField name="imageURL" type="text">
										<Label>Photo Url</Label>
										<Input
											placeholder={`https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
										/>
									</TextField>

									{/* Pickup Location*/}
									<TextField name="pickupLocation" type="text">
										<Label>Pickup Location</Label>
										<InputGroup>
											<InputGroup.Prefix>
												<MapPin />
											</InputGroup.Prefix>
											<InputGroup.Input
												className="w-full"
												placeholder="Dhaka, Gulshan"
											/>
										</InputGroup>
										<FieldError />
									</TextField>

									{/* Description*/}
									<Label htmlFor="Description">
										Description (Tell us about your car)
									</Label>
									<TextArea
										// isRequired
										id="Description"
										name="description"
										aria-label="Description"
										className="w-full"
										rows={3}
										placeholder="A reliable and fuel-efficient..."
									/>

									{/* Availability Status*/}
									<Select
										name="availability"
										className="w-full"
										placeholder="Select one"
									>
										<Label>Availability Status</Label>
										<Select.Trigger>
											<Select.Value />
											<Select.Indicator />
										</Select.Trigger>
										<Select.Popover>
											<ListBox>
												<ListBox.Item id="Available" textValue="Available">
													Available
													<ListBox.ItemIndicator />
												</ListBox.Item>
												<ListBox.Item
													id="NotAvailable"
													textValue="Not Available"
												>
													Not Available
													<ListBox.ItemIndicator />
												</ListBox.Item>
											</ListBox>
										</Select.Popover>
									</Select>

									<div className="flex gap-2">
										<Button slot="close" type="submit">
											Submit
										</Button>
										<Button type="reset" variant="secondary">
											Reset
										</Button>
									</div>
								</Form>
							</Surface>
						</Modal.Body>
						<Modal.Footer>
							<Button slot="close" variant="secondary">
								Cancel
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
