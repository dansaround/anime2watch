"use client";

import { useState } from "react";
import classnames from "classnames";
import { FaStar } from "react-icons/fa";

export default function StarSelector({
  onSelectStar,
}: {
  onSelectStar: (value: number) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const parseIndexToPoints = (index: number) => (index + 1) * 20;

  const handleClick = (currentIndex: number) => {
    setSelectedIndex(currentIndex);
    onSelectStar(parseIndexToPoints(currentIndex));
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl font-semibold pt-6 pb-2">Puntuación</span>

      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          return (
            <FaStar
              key={index}
              className={classnames(
                "cursor-pointer",
                index <= selectedIndex ? "text-yellow-300" : "text-gray-400"
              )}
              onClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
