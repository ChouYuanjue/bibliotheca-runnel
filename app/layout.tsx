import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/ui/Sidebar";
import MobileNav from "@/components/ui/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Runnel Zhang | Bibliotheca Runnel",
  description: "Academic Portal and Personal Archive of Runnel Zhang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <div className="min-h-screen">
          <MobileNav />
          <Sidebar />
          <main className="md:pl-72 w-full max-w-7xl mx-auto px-6 pb-6 pt-24 md:pr-12 md:pb-12 md:pt-12 lg:pr-16 lg:pb-16 lg:pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
