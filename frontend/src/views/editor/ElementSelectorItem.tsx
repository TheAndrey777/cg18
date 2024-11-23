import React from "react";
import { cn } from "../../lib/cn";

export interface ElementInterface {
  icon?: any;
  title: string;
  isActive: boolean;
  onClick?: any;
}

const ElementSelectorItem: React.FC<ElementInterface> = ({
  title,
  icon,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={cn(
        "flex p-[10px] mb-[10px] rounded-[10px] items-center overflow-hidden cursor-pointer transition-all duration-300 ",
        isActive && "bg-default-100 ",
        !isActive && "hover:scale-[1.02] hover:bg-default-50 active:scale-100 "
      )}
      onClick={onClick}
    >
      <img src={icon} alt="icon" className="h-[20px] w-[20px]" />
      <div className="text-[18px] text-content-1 select-none ml-[10px]">
        {title}
      </div>
    </div>
  );
};

export default ElementSelectorItem;
