"use client";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="en">
      <body className={`${inter.variable} ${greatVibes.variable} antialiased`}>
        <Providers>
          {!isDashboard && <Navbar />}
          {children}
          {!isDashboard && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
