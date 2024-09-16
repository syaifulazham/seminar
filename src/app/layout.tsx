import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LogoGroup } from "@/components/Logo";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seminar | KSKPKM",
  description: "Pendaftaran Seminar KSKPKM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-between items-center w-full p-0 m-0">
        {children}
        <LogoGroup />
        </div>
      </body>
    </html>
  );
}
