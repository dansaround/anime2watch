"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { data } from "@/data/main.json";
import { AnimeCard } from "@/app/components/AnimeCard";
export default function Favorites() {
  const { favs } = useFavorites();

  const anime = data.Page.media.filter((anime) => favs.includes(anime.id));

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {anime.map((anime) => (
          <AnimeCard key={anime.id} {...anime} />
        ))}
      </ul>
    </div>
  );
}
