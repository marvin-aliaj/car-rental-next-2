import "../globals.css";
import {Header} from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex w-full h-4 bg-primary text-xs font-bold justify-center">
        Ride with us fot the best experience
      </div>
      <Header />
      {children}
      <Footer />
    </>
  );
}
