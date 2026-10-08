import {
  CheckCircle2,
  CircleDollarSign,
  FileText,
  ShieldCheck,
} from "lucide-react";
import AddCarsForm from "@/components/ui/add-cars/AddCarsForm";

const benefits = [
  {
    icon: CircleDollarSign,
    title: "Set your daily rate",
    description: "You control the price and availability of your vehicle.",
  },
  {
    icon: ShieldCheck,
    title: "Reach verified renters",
    description: "Share your car with confident, ready-to-book customers.",
  },
  {
    icon: FileText,
    title: "Manage with ease",
    description: "Update vehicle details whenever your plans change.",
  },
];

export default function AddCars() {
  return (
    <section
      id="addCars"
      className="bg-linear-to-br from-background via-surface-secondary to-background"
    >
      <div className="cssContainer grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-7 lg:sticky lg:top-28">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              List with DriveFleet
            </span>
            <h1 className="max-w-xl">
              Turn your car into your next opportunity.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Add your vehicle to the DriveFleet marketplace and help renters
              find the right car for every journey.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="card-title">{title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CheckCircle2 className="size-4 text-accent" />
            Complete the details below to publish your listing.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-xl shadow-foreground/5">
          <div className="border-b border-border bg-surface-secondary px-6 py-6 md:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Vehicle information
            </p>
            <h2 className="card-title mt-2">Create your listing</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fields marked required are needed before your car can be listed.
            </p>
          </div>
          <div className="p-6 md:p-8">
            <AddCarsForm />
          </div>
        </div>
      </div>
    </section>
  );
}
