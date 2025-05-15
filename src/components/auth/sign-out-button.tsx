"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSignOut() {
    setIsLoading(true);
    signOut();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-md px-4 py-2.5 font-semibold tracking-tight hover:cursor-pointer"
    >
      {isLoading ? "Loading..." : "Sign Out"}
    </button>
  );
}
