import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SearchLayout from "@/app/layouts/SearchLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anime2Watch | Search",
  description: "The information you need of your favorite anime",
};

export default function SearchRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full flex-col bg-black pt-20 pb-8 px-20 overflow-x-hidden">
      {children}
    </div>
  );
}
