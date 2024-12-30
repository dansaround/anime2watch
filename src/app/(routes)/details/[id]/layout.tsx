import createApolloClient from "@/lib/apollo.client";
import { GET_ANIME_BY_ID } from "@/lib/queries";
import { Anime } from "@/lib/types";
import { gql } from "@apollo/client";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  Metadata,
} from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Text } from "@/app/components/Typography";
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
  params: { id: number };
}): Promise<Metadata> {
  const client = createApolloClient();

  const { data, error } = await client.query({
    query: GET_ANIME_BY_ID,
    variables: {
      id: Number(params.id),
    },
  });

  if (error) {
    return {
      title: "Animes2Watch | Error",
      description: "Error fetching anime data",
    };
  }

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
  params: { id: number };
}>) {
  const client = createApolloClient();

  const { data, error } = await client.query({
    query: GET_ANIME_BY_ID,
    variables: {
      id: Number(params.id),
    },
  });

  if (error) {
    return <div>Error fetching anime data</div>;
  }

  const anime: Anime = data.Media;

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen relative w-full`}
    >
      <div>
        <span>
          <Text className="text-yellow-400" size="lg">
            {anime.title.english || anime.title.native}
          </Text>
        </span>
      </div>
      {children}
    </div>
  );
}
