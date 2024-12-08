"use client"

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

// Local font setup for Geist Sans and Geist Mono
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "SahaLink",
//   description: "easy and accesible solution",
// };

/**
 * RootLayout component is the main layout wrapper for the site.
 * It conditionally includes the Header and Footer based on the current pathname.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Check if the current path is a dashboard route
  const isDashboard = pathname.startsWith("/dashboard");
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Conditionally render the Header and Footer based on the pathname */}
        {!isDashboard && <Header />}
        {children}
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
