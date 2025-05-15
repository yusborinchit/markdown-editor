import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Markdown Editor",
  description: "A markdown editor made with the T3 Stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
