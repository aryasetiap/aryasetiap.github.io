import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arya Setia Pratama | Portfolio",
  description: "Full-stack Developer & UI/UX Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} antialiased selection:bg-blue-500/30`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
