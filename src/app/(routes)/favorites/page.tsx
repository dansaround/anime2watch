"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { Text } from "@/app/components/Typography";
import { useQuery } from "@apollo/client";
import { GET_ANIMES_BY_IDS } from "@/lib/queries";
import { SkeletonRectangle } from "@/app/components/SkeletonRectangle";
import { GetPaginatedRecentAnimesInterface } from "@/lib/types";
import { FavCard } from "@/app/components/FavCard";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/useToast";

export default function Favorites() {
  const { favs } = useFavorites();

  const { isSignedIn, user, isLoaded } = useUser();
  const { notify } = useToast();
  const { data, loading, error } = useQuery<GetPaginatedRecentAnimesInterface>(
    GET_ANIMES_BY_IDS,
    {
      variables: {
        ids: favs,
      },
      skip: !favs || !favs.length,
    }
  );

  useEffect(() => {
    if (error) {
      notify({
        type: "error",
        message: "Ups, something went wrong",
        description: "Anilist server is down  please try again later",
        action: {
          label: "close",
          onClick: () => console.log("useffecting from hook at details page"),
        },
      });
    }
  }, [error]);

  if (!favs.length) {
    return (
      <div>
        <Text.Semibold>Nothing added yet</Text.Semibold>
      </div>
    );
  }

  return (
    <div className=" lg:w-3/4 md:w-3/4 pb-2 px-4 mx-auto">
      <Toaster position="top-center" richColors />
      <Text.Bold size="2xl" className="text-yellow-400 pr-14">
        {"Animes you've favorited "}
        {isSignedIn && `${user?.fullName}`}
      </Text.Bold>
      <ul className="flex items-center justify-center sm:justify-start   flex-wrap gap-6 mt-6">
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
