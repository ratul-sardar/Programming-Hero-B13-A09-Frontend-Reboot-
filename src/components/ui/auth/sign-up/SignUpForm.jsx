"use client";

import {
	Button,
	Description,
	FieldError,
	Form,
	Input,
	Label,
	TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
	const router = useRouter();

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const form = Object.fromEntries(formData);
		const { name, email, PhotoUrl, password } = form;

		try {
			const { data, error } = await authClient.signUp.email({
				name, // required
				email, // required
				password, // required
				image: PhotoUrl,
				callbackURL: "/",
			});

			if (data) {
				toast.success("Success! Loggin you in.......");
				router.push("/");
			} else toast.error(error.message);
		} catch (err) {
			console.log(`Error message: ${err.message}`);
		}
	};

	return (
		<Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
			{/* Name */}
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
				<Label>Full Name</Label>
				<Input placeholder="Shopify Bashar" />
				<FieldError />
			</TextField>

			{/* Email*/}
			<TextField
				isRequired
				name="email"
				type="email"
				validate={(value) => {
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
						return "Please enter a valid email address";
					}

					return null;
				}}
			>
				<Label>Email</Label>
				<Input placeholder="john@example.com" />
				<FieldError />
			</TextField>

			{/* Photo Url */}
			<TextField name="PhotoUrl" type="text">
				<Label>Photo Url</Label>
				<Input
					placeholder={`https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
				/>
			</TextField>

			<TextField
				isRequired
				minLength={8}
				name="password"
				type="password"
				validate={(value) => {
					if (value.length < 8) {
						return "Password must be at least 8 characters";
					}
					if (!/[A-Z]/.test(value)) {
						return "Password must contain at least one uppercase letter";
					}
					if (!/[a-z]/.test(value)) {
						return "Password must contain at least one lowercase letter";
					}
					if (!/[0-9]/.test(value)) {
						return "Password must contain at least one number";
					}

					return null;
				}}
			>
				<Label>Password</Label>
				<Input placeholder="Enter your password" />
				<Description>
					Must be at least 8 characters with 1 uppercase and 1 number
				</Description>
				<FieldError />
			</TextField>

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
