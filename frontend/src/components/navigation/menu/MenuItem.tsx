import React from "react";

interface MenuItemProps {
  name: string;
  icon?: any;
  isActive: boolean;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  name,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <div className="pl-[10px]" onClick={onClick}>
      <div
        className={
          "w-[160px] h-[40px] text-content-1 flex m-[10px] p-[5px] items-center rounded-[10px] select-none " +
          (isActive
            ? "bg-default-200"
            : "hover:bg-default-100 hover:cursor-pointer")
        }
      >
        {icon != null ? <img className="w-8 mr-[10px] p" src={icon} /> : <></>}
        <div className="text-[20px] font-medium">{name}</div>
      </div>
    </div>
  );
};
