import React from "react";
import { MenuItem } from "./MenuItem";
import ProfileSVG from "../../../assets/svg/profile.svg";

export const Menu: React.FC = () => {
  let pageNames: string[] = ["Профиль", "Офисы"];
  let currentPage = 1;

  return (
    <div className="w-[320px] h-screen bg-white m-[20px] rounded-[15px]">
      {pageNames.map((name: string, i: number) => {
        return <MenuItem name={name} isActive={i === currentPage}></MenuItem>;
      })}
    </div>
  );
};

export default Menu;
