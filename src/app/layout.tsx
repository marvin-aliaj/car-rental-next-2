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
    "Find and book your perfect rental car with Wemis. Choose from our wide selection of vehicles at competitive prices with exceptional service."
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
