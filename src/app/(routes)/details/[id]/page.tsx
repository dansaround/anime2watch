"use client";
import { DetailsBanner } from "@/app/components/Banners";
import { useParams } from "next/navigation";
import { data } from "@/data/main.json";
import { AnimeProps } from "../../home/page";
import { PrimaryButton } from "@/app/components/Button/PrimaryButton";
import { Text } from "@/app/components/Typography";

export default function DetailsPage() {
  const params = useParams();
  const anime: AnimeProps | undefined = data.Page.media.find(
    (anime) => anime.id === Number(params.id)
  );

  return (
    <div>
      {params.id}
      {anime && <DetailsBanner anime={anime} />}

      <PrimaryButton>Hola</PrimaryButton>
      <Text size="2xl" className="text-yellow-300">
        sdsd
      </Text>
    </div>
  );
}
