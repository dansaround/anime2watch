import { Text } from "@/app/components/Typography";
import { useFilteredAnimes } from "@/hooks/useFiltersAnimes";
import { Pagination } from "../../Pagination";
import ResultsList from "../search/ResultsList";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { SkeletonRectangle } from "../../SkeletonRectangle";
import { FavCard } from "../../FavCard";

const maxPerPage = 15;

export default function FilteredAnimesList() {
  const {
    error,
    animes,
    loading,
    setPage,
    lastPage,
    currentPage,
    hasNextPage,
    totalResults,
    pagesToRender,
  } = useFilteredAnimes({ perPage: maxPerPage });

  if (loading) {
    return <Text.Semibold>Loading...</Text.Semibold>;
  }

  return (
    <div className="mt-4  w-full">
      <Text.Bold>
        {maxPerPage * currentPage} of {totalResults} results
      </Text.Bold>
      <Toaster position="top-center" richColors />

      <Pagination
        lastPage={lastPage}
        onPageChange={setPage}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        pagesToRender={pagesToRender}
      />

      <ul className="flex items-center flex-wrap gap-6 mt-6  max-w-full justify-center md:justify-start">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRectangle key={index} className="w-52 h-80 rounded-md" />
            ))
          : animes?.map((anime, index) => (
              <FavCard key={anime.id} anime={anime} index={index} />
            ))}
      </ul>
    </div>
  );
}
