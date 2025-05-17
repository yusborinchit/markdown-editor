import Link from "next/link";
import SignOutButton from "./auth/sign-out-button";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="font-bold text-2xl tracking-tighter">
        Markdown Editor
      </Link>
      <SignOutButton />
    </header>
  );
}
