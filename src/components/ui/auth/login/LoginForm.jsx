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
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const form = Object.fromEntries(formData);
		const { email, password } = form;

		try {
			const { data, error } = await authClient.signIn.email({
				email, // required
				password, // required
				rememberMe: true,
				callbackURL: "/",
			});

			if (data) toast.success("Login successfull!");
			else toast.error(error.message);
		} catch (err) {
			console.log(`Error message: ${err.message}`);
		}
	};

	return (
		<Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
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
				<Input placeholder="shopifybashar@gulshan.com" />
				<FieldError />
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
