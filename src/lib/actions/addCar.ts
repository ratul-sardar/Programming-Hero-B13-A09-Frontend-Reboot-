"use server";

export async function addCar(formData: FormData) {
	const form = Object.fromEntries(formData);
	const now = new Date().toISOString();

	// Owner/ the person who added the car in the data
	// const owner = session.user.id;
	const owner = "ratul";

	const payload = {
		...form,
		bookingCount: 0,
		owner,
		createdAt: now,
		updatedAt: now,
	};

	if (form.availability === "Available") payload.availability = true;

	if (form.availability === "NotAvailable") payload.availability = false;

	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/cars`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	console.log(`The code: ${res.status}`);
	const data = await res.json();
	return data;
}
