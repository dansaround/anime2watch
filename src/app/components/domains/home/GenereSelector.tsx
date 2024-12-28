"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import classnames from "classnames";
import { FaChevronDown } from "react-icons/fa";
import { Text } from "@/app/components/Typography";
import { filtersStateAtom } from "@/app/states/filters-state";

export default function GenereSelector() {
  const generes = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Hentai",
    "Horror",
    "Mahou Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller",
  ];

  const [filters, setFilters] = useAtom(filtersStateAtom);
  const [showGeneres, setShowGeneres] = useState(false);

  const handleSelectGenere = (genere: string) => {
    const updatedGeneres = filters.genders.includes(genere)
      ? filters.genders.filter((g) => g !== genere)
      : [...filters.genders, genere];

    setFilters({ ...filters, genders: updatedGeneres });
  };

  return (
    <div className="w-full flex flex-col pt-6 pb-2">
      <div className="flex w-full justify-between items-center">
        <Text.Bold size="lg" className="">
          Gender
        </Text.Bold>

        <FaChevronDown
          onClick={() => setShowGeneres(!showGeneres)}
          className={classnames(
            "cursor-pointer transition-all duration-200",
            showGeneres && "rotate-180"
          )}
        />
      </div>

      {showGeneres && (
        <ul className="flex flex-col gap-2 mt-4">
          {generes.map((genere) => (
            <li
              onClick={() => handleSelectGenere(genere)}
              key={genere}
              className={classnames(
                "cursor-pointer",
                filters.genders.includes(genere) && "text-yellow-500"
              )}
            >
              <Text.Semibold size="sm" className="transition-all duration-300">
                {genere}
              </Text.Semibold>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
