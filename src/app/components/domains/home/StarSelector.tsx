"use client";

import { useState, useEffect } from "react";
import classnames from "classnames";
import { FaStar } from "react-icons/fa";
import { Text } from "@/app/components/Typography";
import { useAtom } from "jotai";
import { filtersStateAtom } from "@/app/states/filters-state";

export default function StarSelector() {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [filters, setFilters] = useAtom(filtersStateAtom);

  useEffect(() => {
    if (!filters.rating) {
      setSelectedIndex(-1);
    }
  }, [filters.rating]);

  const parseIndexToPoints = (index: number) => (index + 1) * 20;

  const handleClick = (currentIndex: number) => {
    setSelectedIndex(currentIndex);
    setFilters((prev) => ({
      ...prev,
      rating: parseIndexToPoints(currentIndex),
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <Text.Bold size="lg">Rating</Text.Bold>
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          return (
            <FaStar
              size={20}
              key={index}
              className={classnames(
                "cursor-pointer transition-all duration-300",
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
