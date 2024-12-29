"use client";

import { useAtom } from "jotai";
import { toast, Toaster } from "sonner";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Text } from "@/app/components/Typography";
import { searchAtom } from "@/app/states/search-state";
import { SEARCH_ANIMES_BY_TITLE } from "@/lib/queries";
import ResultsList from "@/app/components/domains/search/ResultsList";

export default function SearchPage() {
  const [search, setSearch] = useAtom(searchAtom);

  // Function to extract and decode the search parameter from the URL
  const getSearchFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const encodedSearch = searchParams.get("q") || "";
    return decodeURIComponent(decodeURIComponent(encodedSearch));
  };

  useEffect(() => {
    const urlSearch = getSearchFromURL();
    if (urlSearch) setSearch(urlSearch);
  }, []);

  const debouncedSearch = useDebounce(search, 500);

  const { data, loading, error } = useQuery(SEARCH_ANIMES_BY_TITLE, {
    variables: {
      search: debouncedSearch,
      page: 1,
      perPage: 50,
    },
    skip: !search,
  });

  useEffect(() => {
    if (error) {
      toast.error("Ups, something went wrong", {
        description: "Anilist server is down ): lease try again later",
        action: {
          label: "Close",
          onClick: () => console.log("Closed error notification"),
        },
      });
    }
    console.log("useffecting at search page");
  }, [error]);

  return (
    <div className="w-full max-w-full h-full flex flex-col gap-4 relative">
      <Toaster position="top-center" richColors />
      <Text.Bold size="4xl" className="text-yellow-400">
        Top Results:
      </Text.Bold>

      <ResultsList results={data ? data.Page.media : []} isLoading={loading} />
    </div>
  );
}
