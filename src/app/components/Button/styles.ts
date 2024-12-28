export type TColorType =
  | "black"
  | "white"
  | "red"
  | "pink"
  | "green"
  | "blue"
  | "purple"
  | "yellow"
  | "gray"
  | "orange"
  | "mint"
  | "darkBlue"
  | "primary"
  | "positive"
  | "negative"
  | "neutral"
  | "whiteButton"
  | "lightBlue"
  | "lightGreen"
  | "lightOrange"
  | "lightYellow";

export const styles = {
  custom: "focus:ring-stroke-button-primary-focus",
  primary: "bg-[#0049A2]",
  positive: "bg-[#020202]",
  negative:
    "bg-background-button-negative-default hover:bg-background-button-negative-hover focus:ring-stroke-button-negative-focus active:bg-background-button-negative-active disabled:bg-background-button-solid-disabled",
  primary_ghost:
    "focus:ring-stroke-button-primary-focus active:bg-background-button-primaryghost-active hover:bg-background-button-primaryghost-hover disabled:bg-inherit",
  positive_ghost:
    "focus:ring-stroke-button-positive-focus active:bg-background-button-positiveghost-active hover:bg-background-button-positiveghost-hover disabled:bg-inherit",
  negative_ghost:
    "focus:ring-stroke-button-negative-focus active:bg-background-button-negativeghost-active hover:bg-background-button-negativeghost-hover disabled:bg-inherit",
  neutral_ghost:
    "focus:ring-stroke-button-neutralghost-focus active:bg-background-button-neutralghost-active hover:bg-background-button-neutralghost-hover disabled:bg-inherit",
};

export const sizes = {
  xs: "p-2.5",
  sm: "h-10 py-2.5 px-4 hover-sm rounded focus:ring-4 gap-x-3 text-sm",
  md: "h-14 py-4 px-6 hover-base rounded focus:ring-4 gap-x-3 text-base",
  lg: "h-16 py-5 px-8 hover-base rounded-md focus:ring-[6px] gap-x-4 text-base",
  full: "w-full py-2.5 hover-base rounded-md focus:ring-[6px] gap-x-2",
};

export const iconOnlySizes = {
  xs: "p-2.5",
  sm: "p-3 hover-sm rounded focus:ring-4 ",
  md: "p-4 hover-base rounded focus:ring-4 gap-x-3",
  lg: "p-5 hover-base rounded-md focus:ring-[6px] gap-x-4",
  full: "w-full py-2.5 hover-base rounded-md focus:ring-[6px] gap-x-2 text-xs",
};

export const iconClassName = {
  primary: "",
  positive: "",
  negative: "",
  primary_ghost:
    "group-hover:stroke-stroke-button-primaryghost-hover group-active:stroke-stroke-button-primaryghost-active group-disabled:stroke-stroke-button-ghost-disabled",
  positive_ghost:
    " group-hover:stroke-stroke-button-positiveghost-hover group-active:stroke-stroke-button-positiveghost-active group-disabled:stroke-stroke-button-ghost-disabled",
  negative_ghost:
    "group-hover:stroke-stroke-button-negativeghost-hover group-active:stroke-stroke-button-negativeghost-active group-disabled:stroke-stroke-button-ghost-disabled",
  neutral_ghost:
    "group-hover:stroke-stroke-button-neutralghost-hover group-active:stroke-stroke-button-neutralghost-active group-disabled:stroke-stroke-button-ghost-disabled",
  custom: "",
};

export const iconColor: Record<string, TColorType> = {
  primary: "whiteButton",
  positive: "whiteButton",
  negative: "whiteButton",
  primary_ghost: "primary",
  positive_ghost: "positive",
  negative_ghost: "negative",
  neutral_ghost: "neutral",
  custom: "white",
};

export const basicClass =
  "flex font-extrabold justify-center outline-none group items-center";
