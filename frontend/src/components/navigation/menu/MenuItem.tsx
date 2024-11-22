import React from "react";
import { cn } from "../../../lib/cn";
interface MenuItemProps {
  name: string;
  icon?: any;
  isActive: boolean;
  opened?: boolean;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  name,
  icon,
  isActive,
  opened,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "h-[40px] w-[calc(100%-20px)] min-w-[40px] flex overflow-hidden cursor-pointer mb-[8px] rounded-[5px] transition-all duration-300",
        isActive && "bg-default-100",
        isActive && !opened && "ml-[10px]"
      )}
      onClick={onClick}
    >
      <div className="h-full aspect-square flex items-center justify-center select-none">
        <img src={icon} alt="icon" className="h-[20px] w-[20px]" />
      </div>
      <div className="flex items-center text-content-1  select-none">
        {name}
      </div>
    </div>
  );
};
