"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSignIn() {
    setIsLoading(true);
    signIn("github", {
      redirectTo: "/auth",
    });
  }

  return (
    <Button type="button" onClick={handleSignIn}>
      {isLoading ? "Loading..." : "Sign in with GitHub"}
    </Button>
  );
}
