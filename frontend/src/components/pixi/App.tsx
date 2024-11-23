import { Stage, useApp } from "@pixi/react";
import { Grid } from "./Grid";
import React, { useRef, useEffect } from "react";
import { Application, Container, Graphics } from "pixi.js";
import KeyBoard from "../../keyboard/keyboard";
import { ContextMenu } from "../navigation/context/ContextMenu";

let tool = 0;

export const toolChange = (id: number) => {};

interface Props {}

export const toolChange = (id: number) => {
  console.log(id);
};

function PixiApplication(props: Props) {
  const {} = props;

  const width = window.innerWidth / 1.5;
  const height = window.innerWidth / 1.5;
  const ref = useRef(null);

  useEffect(() => {
    // On first render create our application
    const app = new Application({
      width: width,
      height: height,
      backgroundColor: 0x5bba6f,
      antialias: true,
      autoDensity: true,
      resolution: 2,
    });

    // @ts-ignore
    ref.current!.appendChild(app.view);

    const grid = new Grid(width, height, 40, app);
    app.stage.addChild(grid);

    app.ticker.add((time) => {
      grid.onTimer();
      KeyBoard.onTimer();
    }, 15);

    app.start();

    return () => {
      app.destroy(true, true);
    };
  }, []);

  const [open, setOpen] = React.useState(false);
  const [positionX, setPositionX] = React.useState(0);
  const [positionY, setPositionY] = React.useState(0);
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setPositionX(e.pageX);
        setPositionY(e.pageY);
        setOpen(true);
      }}
    >
      <div ref={ref} />

      <ContextMenu
        open={open}
        onOpenChange={setOpen}
        positionX={positionX}
        positionY={positionY}
      >
        <div className=" bg-layout-background rounded-[10px] h-fit w-[160px] border-solid border-[1px] border-default-300 p-[5px]">
          <div className="text-center  leading-5">
            Хотите создать новый регион?
          </div>
          <div className="grid grid-cols-2 gap-3 h-[40px] w-full place-items-center">
            <div
              className="flex items-center justify-center w-[60px] bg-default-200 rounded-[8px] cursor-pointer h-[35px] hover:scale-[1.03] transition-all  active:scale-95"
              onClick={() => {
                console.log("YES");
                setOpen(false);
              }}
            >
              Да
            </div>
            <div
              className="flex items-center justify-center w-[60px] bg-default-200  rounded-[8px] cursor-pointer h-[35px] hover:scale-[1.03] transition-all active:scale-95"
              onClick={() => {
                console.log("NO");
                setOpen(false);
              }}
            >
              Нет
            </div>
          </div>
        </div>
      </ContextMenu>
    </div>
  );
}

export default PixiApplication;
