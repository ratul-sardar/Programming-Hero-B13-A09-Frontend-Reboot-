"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import LoadingSpinner from "../../Loading Spinner/LoadingSpinner";

export default function GoogleLogin() {
	const [loading, setLoading] = useState(false);

	return (
		<Button
			variant="outline"
			className={`text-accent w-full`}
			onClick={async () => {
				setLoading(true);

				setLoading(false);
			}}
		>
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					<BsGoogle /> Google
				</>
			)}
		</Button>
	);
}
