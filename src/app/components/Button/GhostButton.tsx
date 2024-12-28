import { forwardRef } from "react";
import { BaseButton, IBaseButtonProps } from "./BaseButton";

export interface IGhostButtonProps extends Omit<IBaseButtonProps, "color"> {
  color?: "primary" | "positive" | "neutral" | "negative" | "custom";
  children?: React.ReactNode;
}

export const GhostButton = forwardRef<HTMLButtonElement, IGhostButtonProps>(
  ({ color = "primary", ...props }, forwardedRef) => {
    return <BaseButton {...props} color={color === "custom" ? color : `${color}_ghost`} ref={forwardedRef} />;
  },
);

GhostButton.displayName = "GhostButton";
