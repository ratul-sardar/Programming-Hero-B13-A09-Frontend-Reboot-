import { Card, Chip } from "@heroui/react";
import { MapPinned, UserGroup } from "lucide-react";
import Image from "next/image";
import PrimaryCta from "@/components/shared/CTA Buttons/PrimaryCTA/PrimaryCta";

type props = {
  _id: string;
  name: string;
  dailyPrice: string;
  type: string;
  imageURL: string;
  seatCapacity: string;
  pickupLocation: string;
  availability: boolean;
};

export default function CarCard({
  _id,
  name,
  dailyPrice,
  type,
  imageURL,
  seatCapacity,
  pickupLocation,
  availability,
}: props) {
  return (
    <Card className="w-full flex flex-col gap-3">
      {/* Image and badge */}
      <div className="relative h-fit w-full overflow-hidden rounded-2xl mb-3">
        <div className="absolute top-2 right-2 ">
          <Chip
            color="success"
            variant="primary"
            className="text-white px-2 py-1 rounded-md"
          >
            Available
          </Chip>
        </div>

        <Image
          src={imageURL}
          alt="Car image"
          loading="lazy"
          width={400}
          height={400}
          className="pointer-events-none h-fit w-full object-contain select-none"
        />
      </div>

      {/* Card Contents */}
      <Card.Header>
        <div className="flex flex-col gap-0">
          <Card.Title>
            <span className="text-lg font-semibold">{name}</span>
          </Card.Title>
          <Card.Description>
            <p className="text-sm text-muted-foreground">{type}</p>
          </Card.Description>
        </div>
      </Card.Header>
      <Card.Content className="mb-3">
        <div className="flex flex-col gap-1.5">
          <p className="">
            <span className="font-bold text-3xl">${dailyPrice}</span>/day
          </p>
          <div className="flex gap-4">
            <p className="flex items-center justify-center gap-1.5 text-lg">
              <UserGroup size={18} /> {seatCapacity}
            </p>
            <p className="flex items-center justify-center gap-1.5 text-lg">
              <MapPinned size={18} /> {pickupLocation}
            </p>
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <PrimaryCta
          link={`/explore-cars/${_id}`}
          className="py-2 "
          fullWidth={true}
        >
          More Details
        </PrimaryCta>
      </Card.Footer>
    </Card>
  );
}
