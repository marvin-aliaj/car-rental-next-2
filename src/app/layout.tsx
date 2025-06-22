import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gold Car Rent - Find and Book Your Perfect Car",
  description:
    "Find and book your perfect rental car with Gold Car Rent. Choose from our wide selection of vehicles at competitive prices with exceptional service.",
  icons: {
    icon: "/car-rental-icon.png",
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
