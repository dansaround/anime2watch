import { forwardRef } from "react";
import {
  BaseButton,
  IBaseButtonProps,
} from "@/app/components/Button/BaseButton";

export type IPrimaryButtonProps = Omit<IBaseButtonProps, "color">;

export const PrimaryButton = forwardRef<HTMLButtonElement, IPrimaryButtonProps>(
  (props, forwardedRef) => {
    return (
      <BaseButton
        {...props}
        color="primary"
        ref={forwardedRef}
        className="drop-shadow-md"
      />
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
