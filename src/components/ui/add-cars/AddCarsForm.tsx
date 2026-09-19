"use client";

import {
	Button,
	Description,
	FieldError,
	Form,
	Input,
	InputGroup,
	Label,
	ListBox,
	Select,
	TextArea,
	TextField,
} from "@heroui/react";
import { MapPin } from "lucide-react";
import { BsPeopleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { addCar } from "@/lib/actions/addCar";

export default function AddCarsForm() {
	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			const result = await addCar(formData);
			toast.success("Car added successfully!");
			e.target.reset();
		} catch (error: any) {
			toast.error(error.message || "Failed to add car");
		}
	};

	return (
		<Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
			{/* Car Name */}
			<TextField
				isRequired
				name="name"
				type="text"
				validate={(value) => {
					if (value.length < 3) {
						return "Name must me at least 3 letters";
					}

					return null;
				}}
			>
				<Label>Car Name With Model</Label>
				<Input placeholder="Shopify Bashar V4" />
				<FieldError />
			</TextField>

			{/* Daily Rent Price*/}
			<TextField isRequired name="dailyPrice" type="number">
				<Label>Daily Rent Price</Label>
				<InputGroup>
					<InputGroup.Prefix>$</InputGroup.Prefix>
					<InputGroup.Input className="w-full" placeholder="10" min={`0`} />
					<InputGroup.Suffix>/hr</InputGroup.Suffix>
				</InputGroup>
				{/* <Input placeholder="$10/hr" />*/}
				<FieldError />
			</TextField>

			{/* Type of Cars*/}
			<Select
				isRequired
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
			<TextField isRequired name="imageURL" type="text">
				<Label>Photo Url</Label>
				<Input
					placeholder={`https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
				/>
			</TextField>

			{/* Seat Capacity*/}
			<TextField isRequired name="seatCapacity" type="number">
				<Label>Seat Capacity</Label>
				<InputGroup>
					<InputGroup.Prefix>
						<BsPeopleFill />
					</InputGroup.Prefix>
					<InputGroup.Input
						className="w-full"
						placeholder="3"
						min={`0`}
						max={`15`}
					/>
					<InputGroup.Suffix>Peoples</InputGroup.Suffix>
				</InputGroup>
				<FieldError />
			</TextField>

			{/* Pickup Location*/}
			<TextField isRequired name="pickupLocation" type="text">
				<Label>Pickup Location</Label>
				<InputGroup>
					<InputGroup.Prefix>
						<MapPin />
					</InputGroup.Prefix>
					<InputGroup.Input className="w-full" placeholder="Dhaka, Gulshan" />
				</InputGroup>
				<FieldError />
			</TextField>

			{/* Description*/}
			<Label htmlFor="Description">Description (Tell us about your car)</Label>
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
				isRequired
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
						<ListBox.Item id="NotAvailable" textValue="NotAvailable">
							Not Available
							<ListBox.ItemIndicator />
						</ListBox.Item>
					</ListBox>
				</Select.Popover>
			</Select>

			<div className="flex gap-2">
				<Button type="submit">
					{/* <Check />*/}
					Submit
				</Button>
				<Button type="reset" variant="secondary">
					Reset
				</Button>
			</div>
		</Form>
	);
}
