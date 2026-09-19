"use server";

export async function updateCar(formData: FormData, id: string) {
	const form = Object.fromEntries(formData);
	const now = new Date().toISOString();

	const payload = {
		...form,
		updatedAt: now,
	};

	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/cars/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const data = await res.json();
	console.log(data);
	return data;
}
