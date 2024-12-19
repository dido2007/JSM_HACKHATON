import "./globals.css";
import type { Metadata } from "next";
import { Karla } from "next/font/google";

import { auth } from "@/../auth";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/../src/components/ui/sonner";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-family-karla",
});

// Favicons in fonction of system color scheme.
export const metadata: Metadata = {
  title: "Savin'IT",
  description: "Managing your finances has never been easier",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-LGT.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-BLK.png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <meta name="description" content={metadata.description || ""} />
        <link rel="icon" href="/public/favicon.ico" />
        <body className={karla.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
