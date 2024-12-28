"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import classnames from "classnames";
import { FaChevronDown } from "react-icons/fa";
import { Text } from "@/app/components/Typography";
import { filtersStateAtom } from "@/app/states/filters-state";

type Status =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

export default function StatusSelector() {
  const status: {
    label: string;
    value: Status;
  }[] = [
    { label: "Finished", value: "FINISHED" },
    { label: "Releasing", value: "RELEASING" },
    { label: "Not Released Yet", value: "NOT_YET_RELEASED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Production paused", value: "HIATUS" },
  ];

  const [filters, setFilters] = useAtom(filtersStateAtom);
  const [showGeneres, setShowGeneres] = useState(false);

  const handleSelectStatus = (status: { label: string; value: Status }) => {
    const newStatus = (filters.statuses || []) as Status[];
    const updatedStatus = newStatus.includes(status.value)
      ? newStatus.filter((s) => s !== status.value)
      : [...newStatus, status.value];

    console.log("asdasdasdd ", updatedStatus);
    setFilters({ ...filters, statuses: updatedStatus });
  };

  return (
    <div className="w-full flex flex-col pt-6 pb-2">
      <div className="flex w-full justify-between items-center">
        <Text.Bold size="lg">Status</Text.Bold>

        <FaChevronDown
          onClick={() => setShowGeneres(!showGeneres)}
          className={classnames("cursor-pointer", showGeneres && "rotate-180")}
        />
      </div>

      {showGeneres && (
        <ul className="flex flex-col gap-2 mt-4">
          {status.map((status) => (
            <li
              onClick={() => handleSelectStatus(status)}
              key={status.value}
              className={classnames(
                "cursor-pointer",
                filters.statuses?.includes(status.value) && "text-yellow-500"
              )}
            >
              <Text.Semibold size="sm" className="transition-all duration-300">
                {status.label}
              </Text.Semibold>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
