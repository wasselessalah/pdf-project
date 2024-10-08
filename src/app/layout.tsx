import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ClerkLoading>
            <div className="flex h-screen items-center justify-center">Loading...</div>
          </ClerkLoading>
          <ClerkLoaded>

          <Navbar />
          {children}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
