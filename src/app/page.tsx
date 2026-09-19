import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";

export default function Home() {
	return (
		<>
			<h1 className="">Hi, from next.js</h1>;
			<PrimaryCta link="/" className="" fullWidth={false}>
				CLick me Nigga!
			</PrimaryCta>
		</>
	);
}
