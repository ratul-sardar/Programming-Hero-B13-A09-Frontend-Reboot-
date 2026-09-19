"use client";

import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PrimaryCta from "../CTA Buttons/PrimaryCTA/PrimaryCta";
import SecondaryCta from "../CTA Buttons/SecondaryCta/SecondaryCta";

const links = [
	{ label: "Home", href: "/" },
	{ label: "Explore Cars", href: "/explore-cars" },
	{ label: "Add Car", href: "/add-car" },
	{ label: "My Bookings", href: "/my-bookings" },
];

export function Navbar() {
	// State for the mobile navbar
	const [open, setOpen] = useState(false);
	// Toggle Profile Dropdown
	const [showProfile, setShowProfile] = useState(false);
	// Next.js useRouter() Hook
	const nextRouter = useRouter();

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
			<div className="cssContainer p-0 flex h-16 items-center justify-between md:h-20">
				{/* Brand Logo */}
				<Link
					href="/"
					className="font-sans text-xl font-black tracking-tight text-foreground"
				>
					Drive<span className="text-accent">Fleet</span>
				</Link>

				{/* NavLinks*/}
				<nav className="hidden items-center gap-8 lg:flex">
					{links.map((l) => (
						<Link
							key={l.label}
							href={l.href}
							className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
						>
							{l.label}
						</Link>
					))}
				</nav>

				{/* Cta*/}
				<div className="hidden relative text-sm font-semibold items-center gap-3 lg:flex">
					<CtaButtons />

					<Button
						type="button"
						variant="secondary"
						onClick={() => setShowProfile(!showProfile)}
					>
						profile
					</Button>
					{/* Profile details modal*/}
					{showProfile && (
						<div className="absolute top-[172%] right-[2%] w-[200px] bg-white p-6 rounded-(--field-radius) flex flex-col gap-3 ">
							<UserInfo
								nextRouter={nextRouter}
								setShowProfile={setShowProfile}
							></UserInfo>
						</div>
					)}
				</div>

				{/* Mobile Nav Toggle Button*/}
				<button
					type="button"
					aria-label="Toggle menu"
					className="lg:hidden"
					onClick={() => setOpen((v) => !v)}
				>
					{open ? <X className="size-6" /> : <Menu className="size-6" />}
				</button>
			</div>

			{/* Mobile Navbar*/}
			{open && (
				<div className="border-t border-border bg-background lg:hidden">
					<div className="cssContainer p-0 flex flex-col gap-1 py-4">
						{/* Mobile navlinks*/}
						{links.map((l) => (
							<Link
								key={l.label}
								href={l.href}
								onClick={() => setOpen(false)}
								className="rounded-(--radius) px-2 py-3 text-base font-medium text-foreground hover:bg-muted"
							>
								{l.label}
							</Link>
						))}

						{/* Cta*/}
						<div className="mt-2 flex gap-3 pt-3">
							<CtaButtons />
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

function CtaButtons() {
	return (
		<>
			<SecondaryCta link={`/login`} className={``} fullWidth={false}>
				Login
			</SecondaryCta>
			<PrimaryCta link={`/sign-up`} className={``} fullWidth={false}>
				Sign Up
			</PrimaryCta>
		</>
	);
}

// The user function will show the user info if logged in.
function UserInfo({ setShowProfile, onDesktop = true, nextRouter }) {
	return (
		<>
			{onDesktop && (
				<>
					<Link
						href={`/add-car`}
						onClick={() => setShowProfile(false)}
						className="hover:text-accent"
					>
						Add Car
					</Link>
					<Link
						href={`/my-bookings`}
						onClick={() => setShowProfile(false)}
						className="hover:text-accent"
					>
						My Bookings
					</Link>
				</>
			)}
			<Link
				href={`/my-added-cars`}
				onClick={() => setShowProfile(false)}
				className="hover:text-accent"
			>
				My Added Cars
			</Link>

			<Button
				variant="danger-soft"
				onClick={async () => {
					setShowProfile(false);
				}}
			>
				Logout
			</Button>
		</>
	);
}
