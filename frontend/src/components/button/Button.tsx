import React from "react";
import { cn } from "../../lib/cn";

const buttonVariants = {
  size: {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  },
  px: {
    solid: {
      sm: "px-[calc(0.75rem)]",
      md: "px-[calc(1rem)]",
      lg: "px-[calc(1.25rem)]",
    },
    bordered: {
      sm: "px-[calc(0.75rem-2px)]",
      md: "px-[calc(1rem-2px)]",
      lg: "px-[calc(1.25rem-2px)]",
    },
    light: {
      sm: "px-[calc(0.75rem)]",
      md: "px-[calc(1rem)]",
      lg: "px-[calc(1.25rem)]",
    },
  },
  colors: {
    default: "bg-default",
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  },
  borerColors: {
    default: "border-default",
    primary: "border-primary",
    secondary: "border-secondary",
    success: "border-success",
    warning: "border-warning",
    danger: "border-danger",
  },
  colorsHover: {
    solid: {
      default: "group-hover:bg-default-400",
      primary: "group-hover:bg-primary-400",
      secondary: "group-hover:bg-secondary-400",
      success: "group-hover:bg-success-400",
      warning: "group-hover:bg-warning-400",
      danger: "group-hover:bg-danger-400",
    },
    bordered: {
      default: "group-hover:bg-default-300",
      primary: "group-hover:bg-primary-300",
      secondary: "group-hover:bg-secondary-300",
      success: "group-hover:bg-success-300",
      warning: "group-hover:bg-warning-300",
      danger: "group-hover:bg-danger-300",
    },
    light: {
      default: "group-hover:bg-default-100",
      primary: "group-hover:bg-primary-100",
      secondary: "group-hover:bg-secondary-100",
      success: "group-hover:bg-success-100",
      warning: "group-hover:bg-warning-100",
      danger: "group-hover:bg-danger-100",
    },
  },
  textColors: {
    default: "text-default-200",
    primary: "text-primary-400",
    secondary: "text-secondary-400",
    success: "text-success-400",
    warning: "text-warning-400",
    danger: "text-danger-400",
  },
  focuseOutline: {
    default: "[&:focus-visible+*]:outline-default",
    primary: "[&:focus-visible+*]:outline-primary",
    secondary: "[&:focus-visible+*]:outline-secondary",
    success: "[&:focus-visible+*]:outline-success",
    warning: "[&:focus-visible+*]:outline-warning",
    danger: "[&:focus-visible+*]:outline-danger",
  },
  radius: {
    none: "rounded-none",
    sm: "rounded-[8px]",
    md: "rounded-[12px]",
    lg: "rounded-[14px]",
    full: "rounded-full",
  },
  type: {
    solid: "",
    bordered: "border-solid border-[2px] bg-default-200 ",
    light: "",
  },
};

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  disabled?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  text?: string;
  variant?: "solid" | "bordered" | "light";
  className?: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  size = "sm",
  radius = "sm",
  disabled = false,
  color = "primary",
  text = "",
  variant = "solid",
  className,
  onClick,
}) => {
  return (
    <label
      className={cn(
        "grid relative cursor-pointer select-none group w-fit box-border hover:scale-[1.05] transition-all",
        buttonVariants.size[size],
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {/* Основной контейнер,  */}
      <div
        className={cn(
          "group-active:scale-95 flex items-center justify-center box-border z-10 relative transition-all duration-300",
          buttonVariants.size[size],
          buttonVariants.radius[radius],
          buttonVariants.colorsHover[variant][color],
          buttonVariants.px[variant][size],
          variant == "solid" ? buttonVariants.colors[color] : "bg-transparent",
          variant == "bordered" && buttonVariants.borerColors[color],
          variant == "bordered" && buttonVariants.type[variant]
        )}
      >
        {/* Скрытый button */}
        <button
          className={cn(
            "absolute opacity-0 -z-10 h-0 w-0",
            buttonVariants.focuseOutline[color]
          )}
          onClick={onClick}
          disabled={disabled}
        />

        {/* Граница при выделении через tab */}
        <div
          className={cn(
            "absolute outline-offset-[2.5px] border-[2px] border-transparent outline-[2.5px] outline outline-transparent transition-all duration-300 text-transparent box-border w-full h-full",
            buttonVariants.radius[radius],
            buttonVariants.px[variant][size]
          )}
        >
          {text}
        </div>
        <div
          className={cn(
            "text-layout-foreground transition-all duration-300",
            variant == "light" && buttonVariants.textColors[color],
            variant == "solid" && "text-white"
          )}
        >
          {text}
        </div>
      </div>
    </label>
  );
};
