import { useAtom } from "jotai";
import { Anime } from "@/lib/types";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_ANIMES_WITH_FILTERS } from "@/lib/queries";
import { defaultFilters, filtersStateAtom } from "@/app/states/filters-state";

const PAGES_LIMIT = 3;

export function useFilteredAnimes({ perPage = 5 }: { perPage?: number }) {
  const [filters, setFilters] = useAtom(filtersStateAtom);

  const [page, setPage] = useState(1); // Current page
  const [totalResults, setTotalResults] = useState<number | null>(null); // Store total results initially

  const [variables, setVariables] = useState<
    Record<string, string | string[] | number>
  >({
    page,
    perPage,
  });

  useEffect(() => {
    setPage(1);

    let newVariables = { ...variables };

    if (filters.genders.length) {
      newVariables.genders = filters.genders;
    }

    if (filters.rating !== null) {
      const thresholdStep = 20; // Define step range for ratings
      newVariables.ratingMin = filters.rating - thresholdStep;
      newVariables.ratingMax = filters.rating;
    }

    if (filters.statuses.length) {
      newVariables.status = filters.statuses;
    }

    setVariables(newVariables);
  }, [filters]);

  useEffect(() => {
    console.log({ variables });
  }, [variables]);

  const { loading, error, data } = useQuery(GET_ANIMES_WITH_FILTERS, {
    variables,
  });

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

  const animes = (data?.Page?.media || []) as Anime[];

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

  // Check if any filter is applied
  const hasFiltersApplied = Boolean(
    (filters.genders && filters.genders.length > 0) ||
      filters.rating !== null ||
      filters.statuses.length > 0
  );

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

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
    hasFiltersApplied, // Whether any filters are applied
    resetFilters, // Reset all filters
  };
}
