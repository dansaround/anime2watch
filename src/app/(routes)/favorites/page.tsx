"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { Text } from "@/app/components/Typography";
import { useQuery } from "@apollo/client";
import { GET_ANIMES_BY_IDS } from "@/lib/queries";
import { SkeletonRectangle } from "@/app/components/SkeletonRectangle";
import { GetPaginatedRecentAnimesInterface } from "@/lib/types";
import { FavCard } from "@/app/components/FavCard";
import { toast, Toaster } from "sonner";

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

  if (error) {
    toast.error("Ups, something went wrong", {
      description: "It appears that the server is down, please try again later",
      action: {
        label: "Close",
        onClick: () => console.log("Closed error notification"),
      },
    });
  }

  return (
    <div className=" lg:w-3/4 md:w-3/4 sm:w-1/2 pb-2 px-4 mx-auto">
      <Toaster position="top-center" richColors />
      <Text.Bold size="2xl" className="text-yellow-400 pr-14">
        {"Animes you've favorited"}
      </Text.Bold>
      <ul className="flex items-center lg:justify-start sm:justify-center flex-wrap gap-6 mt-6">
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
