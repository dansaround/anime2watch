"use client";
import { DetailsBanner } from "@/app/components/Banners/DetailsBanner";
import { useParams } from "next/navigation";
import { data } from "@/data/main.json";
import { AnimeProps } from "../../home/page";
import { PrimaryButton } from "@/app/components/Button/PrimaryButton";
import { Text } from "@/app/components/Typography";

import { useQuery } from "@apollo/client";
// import { GetExampleDataResponse } from '../lib/types';

export default function DetailsPage() {
  const params = useParams();
  const anime: AnimeProps | undefined = data.Page.media.find(
    (anime) => anime.id === Number(params.id)
  );

  return (
    <div className="flex flex-col w-full h-full">
      {params.id}
      {anime && <DetailsBanner anime={anime} />}

      <PrimaryButton>
        <Text size="lg" className="text-gray-800">
          sdsd
        </Text>
      </PrimaryButton>
    </div>
  );
}
