import { forwardRef } from "react";
import { IGhostButtonProps } from "./GhostButton";
import { BaseButton } from "./BaseButton";

export type ISecondaryButtonProps = IGhostButtonProps;

export const SecondaryButton = forwardRef<HTMLButtonElement, IGhostButtonProps>(
  ({ color = "primary", ...props }, forwardedRef) => {
    return (
      <BaseButton
        {...props}
        color={color === "custom" ? color : `${color}_ghost`}
        ref={forwardedRef}
        outlined
      />
    );
  }
);

SecondaryButton.displayName = "SecondaryButton";
