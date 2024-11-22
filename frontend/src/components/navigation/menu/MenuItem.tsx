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
    <div className="h-[40px]">
      <div className="h-full aspect-square">
        <img src={icon} alt="icon" className="h-[20px] w-[20px]" />
      </div>

      {name}
    </div>
  );
};
