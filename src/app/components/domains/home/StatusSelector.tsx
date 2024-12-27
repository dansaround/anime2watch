"use client";
import { useState } from "react";
import classnames from "classnames";
import { FaChevronDown } from "react-icons/fa";

interface StatusSelectorProps {
  onSelectStatus: (status: string) => void;
}

export default function StatusSelector({
  onSelectStatus,
}: StatusSelectorProps) {
  const status = [
    { label: "Finished", value: "FINISHED" },
    { label: "Releasing", value: "RELEASING" },
    { label: "Not Released Yet", value: "NOT_YET_RELEASED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Production paused", value: "HIATUS" },
  ];

  const [showGeneres, setShowGeneres] = useState(false);
  const [localSelectedStatus, setLocalSelectedStatus] = useState("");

  const handleSelectStatus = (status: { label: string; value: string }) => {
    onSelectStatus(status.value);
    setLocalSelectedStatus(status.value);
  };

  return (
    <div className="w-full flex flex-col pt-6 pb-2">
      <div className="flex w-full justify-between items-center">
        <span className="text-xl font-semibold">Status</span>

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
                localSelectedStatus === status.value && "text-red-500"
              )}
            >
              {status.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
