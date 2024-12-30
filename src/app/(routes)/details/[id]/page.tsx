"use client";

import { useParams } from "next/navigation";
import { GET_ANIME_BY_ID } from "@/lib/queries";
import { DetailsBanner } from "@/app/components/Banners/DetailsBanner";
import { useQuery } from "@apollo/client";
import { SkeletonRectangle } from "@/app/components/SkeletonRectangle";
import { Text } from "@/app/components/Typography";
import { Anime } from "@/lib/types";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";

export default function DetailsPage(props: any) {
  const params = useParams();

  console.log({ props });

  const { data, loading, error } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: Number(params.id) },
  });

  useEffect(() => {
    if (error) {
      toast.error("Ups, something went wrong", {
        description: "Anilist server is down ): lease try again later",
        action: {
          label: "Close",
          onClick: () => console.log("Closed error notification"),
        },
      });
    }
    console.log("useffecting at details page");
  }, [error]);

  return loading ? (
    <SkeletonRectangle className="w-full h-[200px]" />
  ) : (
    <div className="flex flex-col w-full h-full">
      <Toaster position="top-center" richColors />

      {data && data.Media && (
        <>
          <DetailsBanner anime={data.Media} />
          <div className="grid grid-cols-[1fr_0.3fr]">
            {/* <AnimeStats anime={data.Media} /> */}
          </div>
        </>
      )}
    </div>
  );
}

function AnimeStats({ anime }: { anime: Anime }) {
  return (
    <>
      <Text.Semibold size="lg">Stats</Text.Semibold>
      <ul className="flex flex-wrap gap-2">
        {anime.averageScore && (
          <RowInfo value="Score" label={anime.averageScore.toString()} />
        )}
        {anime.episodes && (
          <RowInfo value="Episodes" label={anime.episodes.toString()} />
        )}
        {anime.startDate && (
          <RowInfo value="Start Date" label={anime.startDate.toString()} />
        )}
      </ul>
    </>
  );
}

function RowInfo({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex w-full justify-between items-center gap-4">
      <Text.Semibold size="sm">{value} :</Text.Semibold>
      <Text size="sm">{label}</Text>
    </div>
  );
}
