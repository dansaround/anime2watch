"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { data } from "@/data/main.json";
import { AnimeCard } from "@/app/components/AnimeCard";
import { Text } from "@/app/components/Typography";
export default function Favorites() {
  const { favs } = useFavorites();

  const anime = data.Page.media.filter((anime) => favs.includes(anime.id));

  return (
    <div className="flex flex-col gap-4">
      <Text size="2xl" weight="bold" className="text-yellow-400">
        Favorites
      </Text>
      <ul className="grid auto-cols-fr">
        {anime.map((anime) => (
          <AnimeCard key={anime.id} {...anime} />
        ))}
      </ul>
    </div>
  );
}
