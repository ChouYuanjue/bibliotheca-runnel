import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/ui/Sidebar";
import MobileNav from "@/components/ui/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const notoSerifTangut = localFont({
  src: "../public/classics/NotoSerifTangut-Regular.ttf",
  variable: "--font-noto-serif-tangut",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Runnel Zhang",
  description: "Academic profile and personal archive of Runnel Zhang.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${notoSerifTangut.variable}`}>
      <body className="bg-white font-sans text-gray-900 antialiased">
        <div className="min-h-screen">
          <MobileNav />
          <Sidebar />
          <main>
            <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14 lg:py-16">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
