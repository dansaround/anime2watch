import React from "react";
import classnames from "classnames";

export type TButtonClass =
  | "primary"
  | "positive"
  | "negative"
  | "negative_ghost"
  | "custom"
  | "neutral_ghost"
  | "primary_ghost"
  | "positive_ghost";

export type TAs = "h1" | "h2" | "h3" | "span" | "p";

export type TWeight = "light" | "regular" | "semibold" | "bold";

export interface ITextProps {
  as?: TAs;
  children: React.ReactNode;
  size?: string;
  weight?: TWeight;
  className?: string;
  wrap?: boolean;
}

export interface WeightItem {
  light: string;
  regular: string;
  semibold: string;
  bold: string;
}

const weights: WeightItem = {
  light: "font-light",
  regular: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
};

export interface SizeItem {
  "9xl": string;
  "8xl": string;
  "7xl": string;
  "6xl": string;
  "5xl": string;
  "4xl": string;
  "3xl": string;
  "2xl": string;
  xl: string;
  lg: string;
  base: string;
  sm: string;
  xs: string;
  xxs: string;
}

const sizes = {
  text: {
    "9xl": "text-9xl",
    "8xl": "text-8xl",
    "7xl": "text-7xl/tight",
    "6xl": "text-6xl/tight",
    "5xl": "text-5xl/tight",
    "4xl": "text-4xl",
    "3xl": "text-3xl",
    "2xl": "text-xl sm:text-2xl",
    xl: "text-xl",
    lg: "text-lg",
    base: "text-base",
    sm: "text-sm",
    xs: "text-xs",
    xxs: "text-[8px]",
  },
};

export function Text({
  as,
  size,
  children,
  weight = "regular",
  className,
  wrap = true,
}: ITextProps) {
  const CustomTag = `${as ?? "span"}` as keyof React.JSX.IntrinsicElements;

  return (
    <CustomTag
      className={classnames(
        sizes["text"][size as keyof SizeItem],
        weights[weight],
        className,
        wrap ? "text-wrap break-keep" : "break-keep"
      )}
    >
      {children}
    </CustomTag>
  );
}

function LightText({ ...props }: ITextProps) {
  return <Text {...props} weight="light" />;
}
/*--------- END OF LIGHT TEXT  --------*/

/*--------- START OF REGULAR TEXT  --------*/

function RegularText({ ...props }: ITextProps) {
  return <Text {...props} weight="regular" />;
}
/*--------- END OF REGULAR TEXT  --------*/

/*--------- START OF SEMIBOLD TEXT  --------*/

function SemiboldText({ ...props }: ITextProps) {
  return <Text {...props} weight="semibold" />;
}
/*--------- END OF SEMIBOLD TEXT  --------*/

/*--------- START OF BOLD TEXT  --------*/

function BoldText({ ...props }: ITextProps) {
  return <Text {...props} weight="bold" />;
}
/*--------- END OF BOLD TEXT  --------*/

/*--------- START OF BUTTON TEXT  --------*/

export interface IButtonTextProps extends Omit<ITextProps, "as" | "weight"> {
  variant: TButtonClass;
}

const buttonTextStyles = {
  primary: "text-body-button-solid-default",
  positive: "text-body-button-solid-default",
  negative: "text-body-button-solid-default",
  custom: "text-body-button-solid-default",
  primary_ghost:
    "text-body-button-primaryghost-default group-disabled:text-body-button-ghost-disabled",
  positive_ghost:
    "text-body-button-positiveghost-default group-disabled:text-body-button-ghost-disabled ",
  negative_ghost:
    "text-body-button-negativeghost-default group-disabled:text-body-button-ghost-disabled",
  neutral_ghost:
    "text-body-button-neutralghost-default group-hover:text-stroke-button-neutralghost-hover group-disabled:text-body-button-ghost-disabled",
};

function ButtonText({
  children,
  variant = "primary",
  size,
  ...props
}: IButtonTextProps) {
  const fontSize = size === "sm" || size === "full" ? "sm" : "base";
  return (
    <Text
      className={classnames(buttonTextStyles[variant])}
      size={fontSize}
      weight={size === "lg" ? "bold" : "semibold"}
    >
      {children}
    </Text>
  );
}
/*--------- END OF BUTTON TEXT  --------*/

/*--------- START OF TITLE TEXT  --------*/

export type TTitleClass = "dialog" | "form";

export interface ITitleTextProps extends ITextProps {
  for: TTitleClass;
}

const titleTextStyles: Record<TTitleClass, Partial<ITitleTextProps>> = {
  dialog: {
    size: "lg",
    as: "h3",
    weight: "bold",
    className: "text-body-neutral-body",
  },
  form: {
    size: "3xl",
    as: "h3",
    weight: "bold",
    className: "text-body-primary-default",
  },
};

function TitleText({ children, ...props }: ITitleTextProps) {
  const titleProps = titleTextStyles[props.for];
  return (
    <Text {...titleProps} {...props}>
      {children}
    </Text>
  );
}
/*--------- END OF TITLE TEXT  --------*/

Text.Light = LightText;
Text.Regular = RegularText;
Text.Semibold = SemiboldText;
Text.Bold = BoldText;
Text.Button = ButtonText;
Text.Title = TitleText;
