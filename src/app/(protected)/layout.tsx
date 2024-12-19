import "@/../src/app/globals.css";
import type { Metadata } from "next";
import { Karla } from "next/font/google";

import { Toaster } from "@/../src/components/ui/toaster";
import { ThemeProvider } from "./_components/ui/theme-provider";

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

export default function FinancialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  );
}
