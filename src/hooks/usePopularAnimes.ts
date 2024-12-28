"use client";

import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_PAGINATED_POPULAR_ANIMES } from "@/lib/queries";
import { GetPaginatedPopularAnimesInterface } from "@/lib/types";

const PAGES_LIMIT = 3;

interface UsePopularAnimesProps {
  perPage: number;
}

export function usePopularAnimes({ perPage }: UsePopularAnimesProps) {
  const [page, setPage] = useState(1); // Current page
  const [totalResults, setTotalResults] = useState<number | null>(null); // Store total results initially

  const { loading, error, data } = useQuery<GetPaginatedPopularAnimesInterface>(
    GET_PAGINATED_POPULAR_ANIMES,
    {
      variables: { page, perPage },
    }
  );

  // Extract pageInfo from the query response
  const pageInfo = data?.Page?.pageInfo;
  const currentPage = pageInfo?.currentPage || 1;

  // Store total results the first time it is fetched
  useEffect(() => {
    if (totalResults === null && pageInfo?.total) {
      setTotalResults(pageInfo.total);
    }
  }, [pageInfo?.total, totalResults]);

  // Calculate lastPage based on totalResults or current pageInfo
  const lastPage = Math.ceil((totalResults || pageInfo?.total || 0) / perPage);

  const animes = data?.Page?.media || [];

  // Calculate pages to render based on the logic from the given example
  const pagesArray = Array.from({ length: lastPage }, (_, i) => i + 1);
  let pagesToRender: number[] = [];

  if (currentPage <= PAGES_LIMIT - 1) {
    pagesToRender = pagesArray.slice(0, PAGES_LIMIT);
  } else if (currentPage > lastPage - PAGES_LIMIT + 1) {
    pagesToRender = pagesArray.slice(lastPage - PAGES_LIMIT, lastPage);
  } else {
    pagesToRender = pagesArray.slice(currentPage - 2, currentPage + 1);
  }

  // Manually calculate hasNextPage based on currentPage and lastPage
  const hasNextPage = currentPage < lastPage;

  return {
    loading, // Whether the query is still loading
    error, // Error object if the query failed
    animes, // Array of animes fetched from the API
    totalResults, // Total number of results (stored from the first query)
    currentPage, // The currently active page
    lastPage, // Calculated last page based on totalResults
    hasNextPage, // Whether there are more pages to fetch
    pagesToRender, // Pages to display in the pagination component
    setPage, // Function to update the current page
  };
}
