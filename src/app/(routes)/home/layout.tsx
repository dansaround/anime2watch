import MainLayout from "@/app/layouts/MainLayout";
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
  title: "Anime2Watch | Home",
  description: "The information you need of your favorite anime",
  openGraph: {
    title: "Anime2Watch | Home",
    description: "The information you need of your favorite anime",
    images: [
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-2ldCj6QywuOa.jpg",
    ],
    url: "https://anime2watch.vercel.app/home",
    type: "website",
  },
  metadataBase: new URL("https://anime2watch.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full relative">
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
