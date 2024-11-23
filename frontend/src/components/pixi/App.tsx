import { Stage, useApp } from "@pixi/react";
import { Grid } from "./Grid";
import React, { useRef, useEffect } from "react";
import { Application, Container, Graphics } from "pixi.js";
import { ContextMenu } from "../navigation/context/ContextMenu";

interface Props {}

function PixiApplication(props: Props) {
  const {} = props;

  const ref = useRef(null);

  useEffect(() => {
    // On first render create our application
    const app = new Application({
      width: 500,
      height: 500,
      backgroundColor: 0x5bba6f,
    });

    // @ts-ignore
    ref.current!.appendChild(app.view);

    const grid = new Grid(500, 500, 30, app);
    app.stage.addChild(grid);

    let smTime = 0;
    app.ticker.add((time) => {
      smTime += time;
      smTime = 0;
      grid.onTimer();
    }, 15);

    // Start the PixiJS app
    app.start();

    return () => {
      // On unload completely destroy the application and all of it's children
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
        <div>asdfalkj</div>
      </ContextMenu>
    </div>
  );

  // return (
  //   <div onContextMenu={(e) => e.preventDefault()}>
  //     <span>123321</span>
  //     <Stage width={500} height={500} renderOnComponentChange={true}>
  //       <Grid size={20} height={500} width={500}></Grid>
  //     </Stage>
  //   </div>
  // );
}

export default PixiApplication;
