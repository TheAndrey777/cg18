import { Stage, useApp } from "@pixi/react";
import { Grid } from "./Grid";
import React, { useRef, useEffect } from "react";
import { Application, Container, Graphics } from "pixi.js";
import { ContextMenu } from "../navigation/context/ContextMenu";
import KeyBoard from "../../keyboard/keyboard";

interface Props {}

function PixiApplication(props: Props) {
  const {} = props;

  const ref = useRef(null);

  useEffect(() => {
    // On first render create our application
    const app = new Application({
      width: 1000,
      height: 1000,
      backgroundColor: 0x5bba6f,
    });

    // @ts-ignore
    ref.current!.appendChild(app.view);

    const grid = new Grid(1000, 1000, 30, app);
    app.stage.addChild(grid);

    app.ticker.add((time) => {
      grid.setTileSize(15);
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
        setOpen(true);
        setPositionX(e.pageX);
        setPositionY(e.pageY);
        console.log("Right Click", e.pageX, e.pageY);
      }}
    >
      <span>123321</span>
      <div ref={ref} />

      <ContextMenu
        positionX={positionX}
        positionY={positionY}
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex bor justify-center bg-orange-300 w-56 h-20">
          <input className="w-8 bg-gray-200" type="text"></input>
        </div>
      </ContextMenu>
    </div>
  );
}

export default PixiApplication;
