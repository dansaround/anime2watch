import { Text } from "@/app/components/Typography";
import { useFilteredAnimes } from "@/hooks/useFiltersAnimes";
import { Pagination } from "../../Pagination";

export default function FilteredAnimesList() {
  const {
    loading,
    animes,
    totalResults,
    currentPage,
    lastPage,
    hasNextPage,
    pagesToRender,
    setPage,
  } = useFilteredAnimes({ perPage: 10 });

  if (loading) {
    return <Text.Semibold>Loading...</Text.Semibold>;
  }

  return (
    <div className="mt-4">
      <Text.Bold>{totalResults} results </Text.Bold>

      <Pagination
        lastPage={lastPage}
        onPageChange={setPage}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        pagesToRender={pagesToRender}
      />

      <ul className="flex flex-col gap-4 mt-10">
        {animes.map((anime) => (
          <li key={anime.id}>{anime.title.english || anime.title.native}</li>
        ))}
      </ul>
    </div>
  );
}
