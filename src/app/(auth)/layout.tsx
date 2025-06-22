import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen">
      {/* Content Area - Takes full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        {children}
      </div>

      {/* Image Area - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/tia1.jpg"
          alt="auth-image"
          fill
          className="object-cover border-l-8 border-black"
          quality={100}
          priority
        />
      </div>
    </main>
  );
}
