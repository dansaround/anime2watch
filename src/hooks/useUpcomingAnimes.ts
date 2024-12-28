"use client";

import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_PAGINATED_UPCOMING_ANIMES } from "@/lib/queries";
import { GetPaginatedUpcomingAnimesInterface } from "@/lib/types";

const PAGES_LIMIT = 3;

interface UseUpcomingAnimesProps {
  perPage: number;
}

export function useUpcomingAnimes({ perPage }: UseUpcomingAnimesProps) {
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);

  const { loading, error, data } =
    useQuery<GetPaginatedUpcomingAnimesInterface>(
      GET_PAGINATED_UPCOMING_ANIMES,
      {
        variables: { page, perPage },
      }
    );

  const pageInfo = data?.Page?.pageInfo;
  const currentPage = pageInfo?.currentPage || 1;

  useEffect(() => {
    if (totalResults === null && pageInfo?.total) {
      setTotalResults(pageInfo.total);
    }
  }, [pageInfo?.total, totalResults]);

  const lastPage = Math.ceil((totalResults || pageInfo?.total || 0) / perPage);

  const animes = data?.Page?.media || [];

  const pagesArray = Array.from({ length: lastPage }, (_, i) => i + 1);
  let pagesToRender: number[] = [];

  if (currentPage <= PAGES_LIMIT - 1) {
    pagesToRender = pagesArray.slice(0, PAGES_LIMIT);
  } else if (currentPage > lastPage - PAGES_LIMIT + 1) {
    pagesToRender = pagesArray.slice(lastPage - PAGES_LIMIT, lastPage);
  } else {
    pagesToRender = pagesArray.slice(currentPage - 2, currentPage + 1);
  }

  const hasNextPage = currentPage < lastPage;

  return {
    loading,
    error,
    animes,
    totalResults,
    currentPage,
    lastPage,
    hasNextPage,
    pagesToRender,
    setPage,
  };
}
