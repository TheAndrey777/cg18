import React from "react";

interface MenuItemProps {
  name: string;
  icon: any;
}

export const MenuItem: React.FC<MenuItemProps> = ({ name, icon }) => {
  return (
    <div className="text-black flex">
      <img className="w-20" src={icon} />
      <div>{name}</div>
    </div>
  );
};
