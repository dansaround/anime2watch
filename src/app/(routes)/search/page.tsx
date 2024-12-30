import { GET_ANIME_BY_ID, SEARCH_ANIMES_BY_TITLE } from "@/lib/queries";
import { Text } from "@/app/components/Typography";
import { Toaster } from "sonner";
import createApolloClient from "@/lib/apollo.client";
import ResultsList from "@/app/components/domains/search/ResultsList";
import { TriangleAlert } from "lucide-react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string }; // Define el tipo de los parámetros de consulta
}): Promise<any> {
  // Get search query from params and decode it
  // const query = props?.searchParams.q
  //   ? decodeURIComponent(decodeURIComponent(props.searchParams.q))
  //   : "";

  // If there's no query, return default metadata
  // if (!query) {

  // }

  const a = searchParams?.q || "hesoyam";

  return {
    title: `${JSON.stringify(a)}`,
    description: "Search anime and manga titles",
    // ... rest of default metadata
  };

  // return {
  //   title: `Anime2Watch Search - ${query}`,
  //   openGraph: {
  //     title: `Anime2Watch Search - ${query}`,
  //     images: [
  //       "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-2ldCj6QywuOa.jpg",
  //     ],
  //   },
  //   twitter: {
  //     card: "summary_large_image",
  //     title: `Anime2Watch Search - ${query}`,
  //     images: [
  //       "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-2ldCj6QywuOa.jpg",
  //     ],
  //   },
  // };
}

// Convert to server component by making it async
export default async function SearchPage(props: any) {
  const client = createApolloClient();
  const searchQuery = props.searchParams.q || "";
  const parsedSearchQuery = decodeURIComponent(decodeURIComponent(searchQuery));

  const { data, error, loading } = await client.query({
    query: SEARCH_ANIMES_BY_TITLE,
    variables: {
      search: parsedSearchQuery,
      page: 1,
      perPage: 50,
    },
  });

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <TriangleAlert size={48} className="text-red-400" />
        <Text.Semibold className="text-xl text-red-500">
          Unable to load search results
        </Text.Semibold>
        <Text.Regular className="text-red-400 text-center scale-90 sm:scale-100">
          There was an error loading the search results. Please try again later.
        </Text.Regular>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full h-full flex flex-col gap-4 relative">
      <Toaster position="top-center" richColors />
      <Text.Bold size="4xl" className="text-yellow-400 lg:pl-0 pl-4">
        Top Results:
      </Text.Bold>

      <ResultsList
        error={!!error}
        results={data ? data.Page.media : []}
        isLoading={loading}
      />
    </div>
  );
}
