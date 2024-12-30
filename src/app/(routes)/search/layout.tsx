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

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<any> {
  // Get search query from params and decode it
  const query = params?.q ? decodeURIComponent(params.q) : "";

  return {
    title: query ? `Search '${query}'` : "Search",
    description: "Search anime and manga titles",
    openGraph: {
      title: query ? `Search '${query}'` : "Search",
      description: "Search anime and manga titles",
      images: [
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-2ldCj6QywuOa.jpg",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: query ? `Search '${query}'` : "Search",
      description: "Search anime and manga titles",
      images: [
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-2ldCj6QywuOa.jpg",
      ],
    },
  };
}

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
