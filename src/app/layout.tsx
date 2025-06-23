import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wemis - Rent. Ride. Enjoy.",
  description:
    "Discover your ideal rental car with Wemis. Browse our diverse fleet of vehicles, enjoy great rates, and experience top-notch customer service every step of the way.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
