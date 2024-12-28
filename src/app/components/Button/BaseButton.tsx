"use client";
import classnames from "classnames";
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  SVGAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  styles,
  sizes,
  basicClass,
  iconOnlySizes,
  iconClassName,
  iconColor,
} from "./styles";
import { FaTruckLoading } from "react-icons/fa";
import { Text } from "../Typography";

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

export interface IconProps extends SVGAttributes<SVGElement> {
  children?: never;
  color?: TColorType;
  size?: string;
  customStroke?: string;
}

export interface SocialIconProps extends IconProps {
  colored?: boolean;
  customFill?: string;
}

export interface IBaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: TButtonClass;
  size?: TButtonSize;
  children?: React.ReactNode;
  Icon?: React.ElementType<IconProps>;
  iconSide?: TIconSide;
  disabled?: boolean;
  loading?: boolean;
  iconCustomColor?: TColorType;
  outlined?: boolean;
}

export type TButtonClass =
  | "primary"
  | "positive"
  | "negative"
  | "negative_ghost"
  | "custom"
  | "neutral_ghost"
  | "primary_ghost"
  | "positive_ghost";

export type TIconSide = "right" | "left";

export type TButtonSize = "xs" | "sm" | "md" | "lg" | "full";

const iconWidth = {
  xs: 20,
  sm: 16,
  md: 24,
  lg: 24,
  full: 16,
};

const iconHeight = {
  xs: 20,
  sm: 16,
  md: 24,
  lg: 24,
  full: 16,
};

export const BaseButton = forwardRef<HTMLButtonElement, IBaseButtonProps>(
  (
    {
      color = "primary",
      iconCustomColor,
      children,
      Icon,
      size = "sm",
      iconSide = "left",
      type = "button",
      ...props
    },
    forwardedRef
  ) => {
    const { loading, onClick, ...restProps } = props;
    const childrenLength = children
      ? React.Children.toArray(children).length
      : 0;

    const sizeClass =
      childrenLength === 0 && Icon ? iconOnlySizes[size] : sizes[size];

    const innerRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(forwardedRef, () => innerRef.current!, []);

    const [buttonWidth, setButtonWidth] = useState<number>();

    const classes = classnames(
      basicClass,
      styles[color],
      sizeClass,
      props.className,
      buttonWidth && loading && `w-[${buttonWidth}px]`
    );

    useEffect(() => {
      if (!innerRef) return;
      innerRef.current && setButtonWidth(innerRef.current.offsetWidth);
    }, [innerRef]);

    return (
      <button
        {...restProps}
        ref={innerRef}
        type={type}
        className={classes}
        onClick={(event) => {
          innerRef.current && setButtonWidth(innerRef.current.offsetWidth);
          onClick && onClick(event);
        }}
        disabled={loading || props.disabled}
      >
        {loading ? (
          <FaTruckLoading size="18" className="animate-spin m-auto" />
        ) : (
          <>
            {iconSide === "left" && Icon && (
              <Icon
                className={iconCustomColor ? undefined : iconClassName[color]}
                color={iconCustomColor || iconColor[color]}
                width={iconWidth[size]}
                height={iconHeight[size]}
              />
            )}

            {children && (
              <Text.Button variant={color} size={size}>
                {children}
              </Text.Button>
            )}

            {iconSide === "right" && Icon && (
              <Icon
                className={iconCustomColor ? undefined : iconClassName[color]}
                color={iconCustomColor || iconColor[color]}
                width={iconWidth[size]}
                height={iconHeight[size]}
              />
            )}
          </>
        )}
      </button>
    );
  }
);

BaseButton.displayName = "BaseButton";
