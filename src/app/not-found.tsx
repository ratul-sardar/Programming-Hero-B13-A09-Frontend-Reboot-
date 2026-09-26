import { Button } from "@heroui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="w-full h-svh flex items-center justify-center">
      <div className="cssContainer flex flex-col gap-4 items-center justify-center">
        <h1 className="text-center font-bold text-3xl">404</h1>
        <p className="text-center">Couldn't found what you were looking for</p>

        <Button variant="primary">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
