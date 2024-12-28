"use client";

import { useParams } from "next/navigation";
import { GET_ANIME_BY_ID } from "@/lib/queries";
import { DetailsBanner } from "@/app/components/Banners/DetailsBanner";
import { useQuery } from "@apollo/client";
import { SkeletonRectangle } from "@/app/components/SkeletonRectangle";
import { Text } from "@/app/components/Typography";
import { Anime } from "@/lib/types";

export default function DetailsPage() {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: Number(params.id) },
  });

  return loading ? (
    <SkeletonRectangle className="w-full h-[200px]" />
  ) : (
    <div className="flex flex-col w-full h-full">
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
