import React from "react";
import { cn } from "../../../lib/cn";
import { MenuItem } from "./MenuItem";
import { useNavigate } from "react-router-dom";

import { menuicon } from "../../../assets/svg";
import { IoPerson } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

import MiniProfile from "./MiniProfile";

export const Menu: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      name: "Профиль",
      icon: IoPerson,
      isActive: false,
      onClick: () => {
        navigate("/home/proffile");
      },
    },
    {
      name: "Офисы",
      icon: FaListUl,
      isActive: false,
      onClick: () => {
        navigate("/home/offices");
      },
    },
    {
      name: "Редактор",
      icon: FaEdit,
      isActive: false,
      onClick: () => {
        navigate("/home/editor");
      },
    },
    {
      name: "Настройки",
      icon: FaGear,
      isActive: false,
      onClick: () => {
        navigate("/home/editor");
      },
    },
  ];

  const [a, seta] = React.useState("");
  const [active, setactive] = React.useState(
    Number(localStorage.getItem("openedView"))
  );
  return (
    <div
      className={cn(
        "w-[13rem] h-full transition-all relative overflow-hidden ",
        a
      )}
      onClick={() => {
        //seta("w-[60px]");
        //if (a == "w-[60px]") seta("");
      }}
    >
      <div
        className={cn(
          "bg-layout-background h-[calc(100%-40px)] w-[13rem] fixed top-[20px] left-[20px]  transition-all px-[10px] box-border rounded-[15px]",
          a
        )}
      >
        <div className="mt-[18px]">
          {items.map((v: any, i: number) => {
            return (
              <MenuItem
                key={i}
                name={v.name}
                Icon={v.icon}
                opened={a == "w-[60px]"}
                isActive={i == active}
                onClick={() => {
                  setactive(i);
                  localStorage.setItem("openedView", JSON.stringify(i));
                  v.onClick();
                }}
              />
            );
          })}
        </div>
        <MiniProfile />
      </div>
    </div>
  );
};

export default Menu;
