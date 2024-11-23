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
      name: "Офисы",
      icon: menuicon,
      isActive: false,
      onclick: () => {
        console.log("click");
      },
    },
    {
      name: "Редактор",
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
  const [active, setactive] = React.useState(0);
  return (
    <div
      className={cn(
        "w-[13rem] h-full transition-all relative overflow-hidden",
        a
      )}
      onClick={() => {
        //seta("w-[60px]");
        //if (a == "w-[60px]") seta("");
      }}
    >
      <div
        className={cn(
          "bg-layout-background h-[calc(100%-50px)] w-[13rem] fixed top-[25px] left-[25px] transition-all px-[10px] box-border",
          a
        )}
      >
        {items.map((v: any, i: number) => {
          return (
            <MenuItem
              key={i}
              name={v.name}
              icon={v.icon}
              opened={a == "w-[60px]"}
              isActive={i == active}
              onClick={() => {
                setactive(i);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
