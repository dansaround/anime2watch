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
  title: "Anime2Watch",
  description: "The information you need of your favorite anime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen relative`}
    >
      <MainLayout>{children}</MainLayout>
    </body>
  );
}
