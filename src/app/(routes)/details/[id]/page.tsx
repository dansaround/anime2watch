"use client";
import { DetailsBanner } from "@/app/components/Banners";
import { useParams } from "next/navigation";
import { data } from "@/data/main.json";
import { AnimeProps } from "../../home/page";
import { PrimaryButton } from "@/app/components/Button/PrimaryButton";
import { Text } from "@/app/components/Typography";

import { useQuery } from "@apollo/client";
import { GET_EXAMPLE_DATA } from "@/lib/queries";
// import { GetExampleDataResponse } from '../lib/types';

export default function DetailsPage() {
  const { loading, error, data: response } = useQuery<any>(GET_EXAMPLE_DATA);

  console.log({ response });

  const params = useParams();
  const anime: AnimeProps | undefined = data.Page.media.find(
    (anime) => anime.id === Number(params.id)
  );

  return (
    <div>
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
