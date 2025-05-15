"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSignIn() {
    setIsLoading(true);
    signIn("github", {
      redirectTo: "/",
    });
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="rounded-md px-4 py-2.5 font-semibold tracking-tight hover:cursor-pointer"
    >
      {isLoading ? "Loading..." : "Sign in with GitHub"}
    </button>
  );
}
