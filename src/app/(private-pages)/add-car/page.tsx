import AddCarsForm from "@/components/ui/add-cars/AddCarsForm";

export default function AddCars() {
	return (
		<section id="addCars" className="">
			<div className="cssContainer flex flex-col gap-16 items-center ">
				<h1 className="">Add your Car to our Listing!</h1>

				<div className="w-full flex flex-col gap-5 max-w-130  bg-white rounded-(--field-radius) p-8 ">
					<AddCarsForm />
				</div>
			</div>
		</section>
	);
}
