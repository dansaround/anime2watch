import createApolloClient from "@/lib/apollo.client";
import { GET_ANIME_BY_ID } from "@/lib/queries";
import { Anime } from "@/lib/types";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
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
  const client = createApolloClient();

  const { data, error } = await client.query({
    query: GET_ANIME_BY_ID,
    variables: {
      id: Number(params.id),
    },
  });

  const anime: Anime = data.Media;

  return {
    title: `Animes2Watch ${
      anime.title.english || anime.title.native || "Anime Details"
    }`,
    description: anime.description || "Details about this anime",
    openGraph: {
      title: `Animes2Watch ${
        anime.title.english || anime.title.native || "Anime Details"
      }`,
      description: anime.description || "Details about this anime",
      images: [anime.coverImage.extraLarge],
    },

    metadataBase: new URL("https://anime2watch.vercel.app"),
  };
}

export default async function DetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen relative w-full`}
    >
      {children}
    </div>
  );
}
