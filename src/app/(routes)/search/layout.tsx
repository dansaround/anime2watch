import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import createApolloClient from "@/lib/apollo.client";
import { SEARCH_ANIMES_BY_TITLE } from "@/lib/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any;
}): Promise<any> {
  // Get search query from params and decode it
  const query = searchParams?.q ? decodeURIComponent(searchParams.q) : "";

  // If there's no query, return default metadata
  if (!query) {
    return {
      title: "Search",
      description: "Search anime and manga titles",
      // ... rest of default metadata
    };
  }

  const client = createApolloClient();

  // Fetch search results to get the count
  const { data, error } = await client.query({
    query: SEARCH_ANIMES_BY_TITLE,
    variables: {
      search: query,
      page: 1,
      perPage: 1000,
    },
  });

  if (error) {
    return {
      title: "Search",
      description: "Search anime and manga titles",
    };
  }

  const resultCount = data?.Page?.media?.length || 0;
  const titleText = `Search: ${query} - ${resultCount} results`;

  return {
    title: titleText,
    description: `Search results for "${query}"`,
    openGraph: {
      title: titleText,
      description: `Search results for "${query}"`,
      images: [
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-2ldCj6QywuOa.jpg",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: `Search results for "${query}"`,
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
