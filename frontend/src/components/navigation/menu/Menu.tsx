import React from "react";
import { MenuItem } from "./MenuItem";
import ProfileSVG from "../../../assets/svg/profile.svg";

export const Menu: React.FC = () => {
  return (
    <div className="ProfileSVG">
      <MenuItem name="test" icon={ProfileSVG}></MenuItem>
    </div>
  );
};

export default Menu;
