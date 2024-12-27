"use client";
import { useState } from "react";
import classnames from "classnames";
import { FaChevronDown } from "react-icons/fa";

interface GenereSelectorProps {
  onSelectGenere: (genere: string) => void;
}

export default function GenereSelector({
  onSelectGenere,
}: GenereSelectorProps) {
  const generes = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Horror",
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

  const [showGeneres, setShowGeneres] = useState(false);
  const [localSelectedGenere, setLocalSelectedGenere] = useState("");

  const handleSelectGenere = (genere: string) => {
    setLocalSelectedGenere(genere);
    onSelectGenere(genere);
  };

  return (
    <div className="w-full flex flex-col pt-6 pb-2">
      <div className="flex w-full justify-between items-center">
        <span className="text-xl font-semibold">Género</span>

        <FaChevronDown
          onClick={() => setShowGeneres(!showGeneres)}
          className={classnames("cursor-pointer", showGeneres && "rotate-180")}
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
                localSelectedGenere === genere && "text-red-500"
              )}
            >
              {genere}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
