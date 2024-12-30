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

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: `Animes2Watch | Home`,
//     description: "Home page of Animes2Watch",
//     openGraph: {
//       title: `Animes2Watch | Home`,
//       description: "Home page of Animes2Watch",
//       images: ["https://hackmd.io/_uploads/Skp5aoJ8kg.png"],
//     },

//     metadataBase: new URL("https://anime2watch.vercel.app"),
//   };
// }

export const metadata: Metadata = {
  title: "Anime2Watch | Search",
  description: "The information you need of your favorite anime",
  openGraph: {
    title: "Anime2Watch | Search",
    description: "The information you need of your favorite anime",
    images: ["https://hackmd.io/_uploads/Skp5aoJ8kg.png"],
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
