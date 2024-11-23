import React from "react";
import ElementSelectorItem from "./ElementSelectorItem";
import { menuicon } from "../../assets/svg";
import { setTools } from "../../components/pixi/Grid";

const ElementSelector = () => {
  const [currentElement, setElement] = React.useState(0);

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
  ];

  return (
    <div className="w-[350px] h-full bg-layout-background rounded-[15px] p-[15px] mr-[20px]">
      <div className="text-content-1 mb-[20px] text-[22px] font-semibold pl-[20px]">
        Элементы:
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
