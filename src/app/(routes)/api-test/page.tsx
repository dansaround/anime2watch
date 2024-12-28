"use client";

import { usePopularAnimes } from "@/hooks/usePopularAnimes";
import { Text } from "@/app/components/Typography";
import { Pagination } from "@/app/components/Pagination";

export default function PopularAnimes() {
  const {
    loading,
    error,
    animes,
    totalResults,
    currentPage,
    lastPage,
    hasNextPage,
    pagesToRender,
    setPage,
  } = usePopularAnimes({ perPage: 2 });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-12">
      <Text.Regular size="xs">Total Results: {totalResults}</Text.Regular>

      <ul className="flex flex-col gap-2 mt-8">
        {animes.map((anime) => (
          <li key={anime.id} className="flex flex-col gap-2 mb-4">
            <Text.Bold>
              {anime.title.english ||
                anime.title.native ||
                "No title available"}
            </Text.Bold>
            <img
              src={anime.coverImage.extraLarge}
              alt={anime.title.english || anime.title.native || "Anime cover"}
              className="w-32 h-48 object-cover"
            />
            <p>{anime.description || "No description available."}</p>
            <h2>Rating: {anime.averageScore}%</h2>
          </li>
        ))}
      </ul>

      {/* Use the Pagination component */}
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        pagesToRender={pagesToRender}
        onPageChange={setPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
