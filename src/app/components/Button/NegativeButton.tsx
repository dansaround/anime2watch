import { forwardRef } from "react";
import { BaseButton, IBaseButtonProps } from "./BaseButton";

export interface INegativeButtonProps extends Omit<IBaseButtonProps, "color"> {}

export const NegativeButton = forwardRef<HTMLButtonElement, INegativeButtonProps>((props, forwardedRef) => {
  return <BaseButton {...props} color="negative" ref={forwardedRef} />;
});

NegativeButton.displayName = "NegativeButton";
