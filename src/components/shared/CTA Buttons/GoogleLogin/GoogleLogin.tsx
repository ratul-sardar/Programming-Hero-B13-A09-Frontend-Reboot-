"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "../../Loading Spinner/LoadingSpinner";

export default function GoogleLogin() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const data = await authClient.signIn.social({
      provider: "google",
    });

    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      className={`text-accent w-full`}
      onClick={async () => await handleLogin()}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <BsGoogle /> Google
        </>
      )}
    </Button>
  );
}
