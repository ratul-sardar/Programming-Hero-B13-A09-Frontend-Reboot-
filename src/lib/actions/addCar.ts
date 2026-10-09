"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export async function addCar(formData: FormData) {
  const JWT = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(JWT?.token);
  if (!JWT.token) {
    throw new Error("jwt token missing or undefined");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const form = Object.fromEntries(formData);
  const now = new Date().toISOString();
  const owner = session?.user?.id as string;

  if (
    form.availability !== "Available" &&
    form.availability !== "NotAvailable"
  ) {
    throw new Error("Please choose a valid availability");
  }

  const payload = {
    ...form,
    availability: form.availability === "Available",
    bookingCount: 0,
    owner,
    createdAt: now,
    updatedAt: now,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT?.token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  return data;
}
