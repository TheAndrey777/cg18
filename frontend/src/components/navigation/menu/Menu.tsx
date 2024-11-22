import React from "react";
import { cn } from "../../../lib/cn";
import { MenuItem } from "./MenuItem";

import { menuicon } from "../../../assets/svg";

export const Menu: React.FC = () => {
  const items = [
    {
      name: "Профиль",
      icon: menuicon,
      isActive: false,
      onclick: () => {
        console.log("click");
      },
    },
    {
      name: "Профиль",
      icon: menuicon,
      isActive: false,
      onclick: () => {
        console.log("click");
      },
    },
    {
      name: "Профиль",
      icon: menuicon,
      isActive: false,
      onclick: () => {
        console.log("click");
      },
    },
    {
      name: "Профиль",
      icon: menuicon,
      isActive: false,
      onclick: () => {
        console.log("click");
      },
    },
  ];

  const [a, seta] = React.useState("");
  return (
    <div
      className={cn(
        "w-[20rem] h-full transition-all relative overflow-hidden",
        a
      )}
      onClick={() => {
        seta("w-[40px]");
        if (a == "w-[40px]") seta("");
      }}
    >
      <div
        className={cn(
          "bg-red-300 h-[calc(100%-50px)] w-[320px] fixed top-[25px] left-[25px] transition-all",
          a
        )}
      >
        {items.map((v: any, i: number) => {
          return (
            <MenuItem
              key={i}
              name={v.name}
              icon={v.icon}
              isActive={v.isActive}
              onClick={v.onClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
