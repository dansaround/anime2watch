import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
    <div className="flex w-full h-full flex-col bg-black pt-4 pb-4 px-2  lg:pt-20 lg:pb-8 lg:px-20 overflow-x-hidden">
      {children}
    </div>
  );
}
