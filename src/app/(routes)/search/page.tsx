"use client";

import { useAtom } from "jotai";
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

  const { data, loading } = useQuery(SEARCH_ANIMES_BY_TITLE, {
    variables: {
      search: debouncedSearch,
      page: 1,
      perPage: 50,
    },
    skip: !search,
  });

  return (
    <div className="w-full max-w-full h-full flex flex-col gap-4 relative">
      <Text.Bold size="4xl">Top Results:</Text.Bold>

      <ResultsList results={data ? data.Page.media : []} isLoading={loading} />
    </div>
  );
}
