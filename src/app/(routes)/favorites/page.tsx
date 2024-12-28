"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { Text } from "@/app/components/Typography";
import { useQuery } from "@apollo/client";
import { GET_ANIMES_BY_IDS } from "@/lib/queries";
import { SkeletonRectangle } from "@/app/components/SkeletonRectangle";
import { GetPaginatedRecentAnimesInterface } from "@/lib/types";
import { FavCard } from "@/app/components/FavCard";
import { AnimeCard } from "@/app/components/AnimeCard";

export default function Favorites() {
  const { favs } = useFavorites();

  const { data, loading, error } = useQuery<GetPaginatedRecentAnimesInterface>(
    GET_ANIMES_BY_IDS,
    {
      variables: {
        ids: favs,
      },
      skip: !favs || !favs.length,
    }
  );

  if (typeof window === "undefined") {
    return null;
  }

  if (!favs.length) {
    return (
      <div>
        <Text.Semibold>Nothing added yet</Text.Semibold>
      </div>
    );
  }

  return (
    <div className="w-full pb-2 pl-8">
      <Text.Bold size="2xl" className="text-yellow-400 pr-14">
        Animes you've favorited
      </Text.Bold>
      <ul className="flex items-center flex-wrap gap-6 mt-6">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRectangle key={index} className="w-52 h-80 rounded-md" />
            ))
          : data?.Page.media.map((anime, index) => (
              <FavCard key={anime.id} anime={anime} index={index} />
            ))}
      </ul>
    </div>
  );
}
