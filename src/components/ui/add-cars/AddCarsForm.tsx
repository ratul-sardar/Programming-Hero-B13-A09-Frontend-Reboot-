"use client";

import {
  Button,
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
import { CarFront, ImageIcon, MapPin, Users } from "lucide-react";
import { toast } from "react-toastify";
import { addCar } from "@/lib/actions/addCar";

const carTypes = ["SUV", "Sedan", "Hatchback", "Luxury", "Sports"];

export default function AddCarsForm() {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await addCar(formData);
      toast.success("Car added successfully!");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add car");
      console.log(error);
    }
  }

  return (
    <Form className="flex w-full flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <CarFront className="size-5 text-accent" />
          <h3 className="card-title">Car details</h3>
        </div>

        <div className="grid w-full gap-4 md:grid-cols-2">
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) =>
              value.length < 3 ? "Name must be at least 3 characters." : null
            }
          >
            <Label>Car name and model</Label>
            <Input placeholder="Nissan Rogue 2024" />
            <FieldError />
          </TextField>

          <TextField isRequired name="dailyPrice" type="number">
            <Label>Daily rental price</Label>
            <InputGroup>
              <InputGroup.Prefix>$</InputGroup.Prefix>
              <InputGroup.Input className="w-full" min="0" placeholder="105" />
              <InputGroup.Suffix>/day</InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>

          <Select isRequired name="type" placeholder="Choose a car type">
            <Label>Car type</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {carTypes.map((carType) => (
                  <ListBox.Item key={carType} id={carType} textValue={carType}>
                    {carType}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField isRequired name="seatCapacity" type="number">
            <Label>Seat capacity</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Users className="size-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                className="w-full"
                max="15"
                min="1"
                placeholder="5"
              />
              <InputGroup.Suffix>seats</InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>
        </div>
      </div>

      <div className="h-px w-full bg-border" />

      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="size-5 text-accent" />
          <h3 className="card-title">Listing information</h3>
        </div>

        <TextField isRequired name="imageURL" type="url">
          <Label>Car photo URL</Label>
          <Input
            placeholder="https://images.example.com/your-car.jpg"
            type="url"
          />
          <FieldError />
        </TextField>

        <div className="grid w-full gap-4 md:grid-cols-2">
          <TextField isRequired name="pickupLocation" type="text">
            <Label>Pickup location</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <MapPin className="size-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                className="w-full"
                placeholder="Mirpur-1, Dhaka"
              />
            </InputGroup>
            <FieldError />
          </TextField>

          <Select isRequired name="availability" placeholder="Set availability">
            <Label>Availability</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="Available" textValue="Available">
                  Available to book
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="NotAvailable" textValue="Not Available">
                  Not available
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            aria-label="Description"
            className="w-full"
            placeholder="Tell renters about the car's condition, features, and anything they should know."
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Optional, but useful to renters.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
        <Button className="h-auto px-6 py-3" type="reset" variant="secondary">
          Reset form
        </Button>
        <Button className="h-auto px-6 py-3" type="submit">
          Publish car listing
        </Button>
      </div>
    </Form>
  );
}
