import { Button } from "@heroui/react";
import Link from "next/link";

type propsType = {
	link: string;
	children: string;
	className: string;
	fullWidth: boolean;
};

export default function SecondaryCta({
	link = `/`,
	children = "SecondaryCta!",
	className,
	fullWidth = false,
}: propsType) {
	return (
		<Link href={link} className={`${fullWidth && "w-full"}`}>
			<Button
				variant="outline"
				className={`h-auto rounded-(--radius) font-semibold px-6 py-3.5 ${className} ${fullWidth && "w-full"} `}
			>
				{children}
			</Button>
		</Link>
	);
}
