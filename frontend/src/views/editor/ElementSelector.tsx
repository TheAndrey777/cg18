import React from "react";
import ElementSelectorItem from "./ElementSelectorItem";
import { menuicon } from "../../assets/svg";
import { setTools } from "../../components/pixi/Grid";
import { useSelector } from "react-redux";
const ElementSelector = () => {
  const [currentElement, setElement] = React.useState(0);

  const name = useSelector((state: any) => state.storage.activeOffice.name);
  console.log(name);
  const elements = [
    {
      title: "Линия",
      icon: menuicon,
    },
    {
      title: "Стол",
      icon: menuicon,
    },
    {
      title: "Стул",
      icon: menuicon,
    },
    {
      title: "Компьютер",
      icon: menuicon,
    },
    {
      title: "Дверь",
      icon: menuicon,
    },
    {
      title: "Растение",
      icon: menuicon,
    },
    {
      title: "Кресло",
      icon: menuicon,
    },
  ];

  return (
    <div className="w-[280px] h-full bg-layout-background rounded-[15px] p-[15px] mr-[20px] box-border">
      <div className="text-content-1 mb-[10px]  h-[30px] text-[20px] font-semibold pl-[10px] overflow-hidden text-ellipsis truncate">
        {name}
      </div>
      {elements.map((elem: any, i: number) => {
        return (
          <ElementSelectorItem
            key={i}
            title={elem.title}
            icon={elem.icon}
            isActive={currentElement === i}
            onClick={() => {
              setElement(i);
              setTools(i);
            }}
          />
        );
      })}
    </div>
  );
};

export default ElementSelector;
