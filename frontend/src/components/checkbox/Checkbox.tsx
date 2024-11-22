import React from "react";
import { cn } from "../../lib/cn";
import { motion } from "framer-motion";

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      delay: 0.15,
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const sizeVariants = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const colorsVariants = {
  default: "bg-default",
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

const focuseOutlineVariants = {
  default: "[&:focus-visible+*]:outline-default",
  primary: "[&:focus-visible+*]:outline-primary",
  secondary: "[&:focus-visible+*]:outline-secondary",
  success: "[&:focus-visible+*]:outline-success",
  warning: "[&:focus-visible+*]:outline-warning",
  danger: "[&:focus-visible+*]:outline-danger",
};

const radiusVraiants = {
  none: "",
  sm: "rounded-[3.5px]",
  md: "rounded-[5px]",
  lg: "rounded-[7px]",
  full: "rounded-full",
};

interface CheckboxProps {
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
  label?: string;
  variant?: "default" | "label";
  className?: string;
  defaultState?: boolean;
  onChange: (state: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  size = "md",
  radius = "md",
  disabled = false,
  color = "primary",
  label = "",
  variant = "label",
  className,
  onChange,
  defaultState = false,
}) => {
  const [active, setActive] = React.useState<boolean>(defaultState);

  React.useEffect(() => onChange(active), [active]);

  return (
    <motion.label
      className={cn(
        variant == "label" && "grid-cols-[auto_1fr] items-center gap-2",
        "grid relative cursor-pointer p-2 select-none group ",
        className,
        disabled && "pointer-events-none opacity-50",
        variant == "default" && ""
      )}
    >
      <div
        className={cn(
          "group-hover:bg-default-100 group-active:scale-90 flex items-center justify-center bg-transparent hover:bg-default-100 box-border border-solid border-[2px] border-default z-10 relative transition-all duration-300",
          sizeVariants[size],
          radiusVraiants[radius]
        )}
      >
        <input
          className={cn(
            "absolute opacity-0 -z-10 h-0 w-0",
            focuseOutlineVariants[color]
          )}
          disabled={disabled}
          type="checkbox"
          onChange={() => {
            setActive(!active);
          }}
        />
        <div
          className={cn(
            "absolute outline-offset-[2.5px] outline-[2.5px] outline outline-transparent transition-all  duration-200",
            sizeVariants[size],
            radiusVraiants[radius]
          )}
        ></div>
        <span
          className={cn(
            "absolute transition-all duration-300",
            sizeVariants[size],
            colorsVariants[color],
            radiusVraiants[radius],
            active && "opacity-100 scale-100",
            !active && "opacity-0 scale-0"
          )}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {active && (
              <motion.path
                strokeWidth="1.5"
                d="M5 8.22L7.66571 10.44L11.22 6"
                stroke="white"
                strokeLinecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
            )}
          </svg>
        </span>
      </div>
      {variant == "label" && (
        <div className="select-none text-layout-foeground transition-all duration-200">
          {label}
        </div>
      )}
    </motion.label>
  );
};
