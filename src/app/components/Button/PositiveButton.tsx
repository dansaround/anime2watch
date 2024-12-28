import { forwardRef } from "react";
import { BaseButton, IBaseButtonProps } from "./BaseButton";

export interface IPositiveButtonProps extends Omit<IBaseButtonProps, "color"> {}

export const PositiveButton = forwardRef<
  HTMLButtonElement,
  IPositiveButtonProps
>((props, forwardedRef) => {
  return <BaseButton {...props} color="positive" ref={forwardedRef} />;
});

PositiveButton.displayName = "PositiveButton";
