import { atom } from "jotai";

type Status =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

interface FiltersStateProps {
  genders: string[];
  rating: number | null;
  statuses: Status[];
}

export const defaultFilters = {
  statuses: [],
  genders: [],
  rating: null,
};

export const filtersStateAtom = atom<FiltersStateProps>(defaultFilters);
