"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSignOut() {
    setIsLoading(true);
    signOut({ redirectTo: "/sign-in" });
  }

  return (
    <Button type="button" onClick={handleSignOut}>
      {isLoading ? "Loading..." : "Sign Out"}
    </Button>
  );
}
