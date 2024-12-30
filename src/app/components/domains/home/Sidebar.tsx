"use client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Text } from "@/app/components/Typography";
import { useFilteredAnimes } from "@/hooks/useFiltersAnimes";
import { filtersStateAtom } from "@/app/states/filters-state";
import StarSelector from "./StarSelector";
import GenereSelector from "./GenereSelector";
import StatusSelector from "./StatusSelector";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useWindowSize } from "usehooks-ts";
import { GhostButton } from "@/app/components/Button/GhostButton";

export function Sidebar() {
  const [filters, setFilters] = useAtom(filtersStateAtom);
  const [isOpen, setIsOpen] = useState(false);

  const { hasFiltersApplied, resetFilters } = useFilteredAnimes({});

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 768) {
      setIsOpen(true);
      console.log("isOpen", isOpen);
    } else {
      setIsOpen(false);
    }
  }, [width]);

  return (
    <aside className="bg-black w-full h-full flex flex-col items-center justify-center md:justify-start pt-3 px-3 gap-3">
      <section className="px-4">
        <Collapsible
          defaultOpen={width > 768}
          className="w-[350px] min-h-16 space-y-4"
        >
          <div className="flex items-center justify-between space-x-4 ">
            <h4 className="text-sm font-semibold">Show filters</h4>
            <CollapsibleTrigger>
              <GhostButton color="neutral" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </GhostButton>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="flex justify-between items-center mb-5 ">
              <Text.Bold size="xl" className="pb-2 text-center text-yellow-400">
                Filters
              </Text.Bold>

              {hasFiltersApplied && (
                <button className="scale-75" onClick={resetFilters}>
                  <Text.Semibold className="underline">
                    Reset Filters
                  </Text.Semibold>
                </button>
              )}
            </div>

            <StarSelector />

            <GenereSelector />

            <StatusSelector />
          </CollapsibleContent>
        </Collapsible>
      </section>
    </aside>
  );
}
