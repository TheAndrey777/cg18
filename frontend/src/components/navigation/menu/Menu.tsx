import React from "react";
import { cn } from "../../../lib/cn";
import { MenuItem } from "./MenuItem";
import { useNavigate } from "react-router-dom";

import { menuicon } from "../../../assets/svg";

export const Menu: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      name: "Профиль",
      icon: menuicon,
      isActive: false,
      onClick: () => {
        navigate("/home/proffile");
      },
    },
    {
      name: "Офисы",
      icon: menuicon,
      isActive: false,
      onClick: () => {
        navigate("/home/offices");
      },
    },
    {
      name: "Редактор",
      icon: menuicon,
      isActive: false,
      onClick: () => {
        navigate("/home/editor");
      },
    },
    {
      name: "Пока хз",
      icon: menuicon,
      isActive: false,
      onClick: () => {
        navigate("/home/editor");
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
                v.onClick();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
