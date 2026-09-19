import { Button } from "@heroui/react";
import Link from "next/link";

type propsType = {
	link: string;
	children: string;
	className: string;
	fullWidth: boolean;
};

export default function PrimaryCta({
	link = `/`,
	children = "PrimaryCta!",
	className,
	fullWidth = false,
}: propsType) {
	return (
		<Link href={link} className={`${fullWidth && "w-full"}`}>
			<Button
				className={`h-auto rounded-(--radius) font-semibold px-6 py-3.5 ${className} ${fullWidth && "w-full"}`}
			>
				{children}
			</Button>
		</Link>
	);
}
