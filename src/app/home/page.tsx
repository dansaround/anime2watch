import { data } from "@/data/main.json";
import { AnimeCard } from "../components/AnimeCard";

export type AnimeProps = (typeof data.Page.media)[0];

export default function HomePage() {
  const mockData = data.Page.media;

  return (
    <div className="flex flex-col space-y-4 justify-start p-4 max-w-full overflow-x-hidden">
      {AnimeRow("Popular", mockData)}
      {AnimeRow("Favorites", mockData)}
      {AnimeRow("Genres", mockData)}
    </div>
  );
}

function AnimeRow(title: String, animes: AnimeProps[]) {
  return (
    <div className="w-full mx-auto ">
      <h3 className="text-2xl font-bold">{title}</h3>
      <ul className="flex overflow-x-auto  ">
        {animes.map((anime) => {
          return <AnimeCard key={anime.id} {...anime} />;
        })}
      </ul>
    </div>
  );
}
