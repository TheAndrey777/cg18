import { Stage, useApp } from "@pixi/react";
import { Grid } from "./Grid";
import React, { useRef, useEffect } from "react";
import { Application, Container, Graphics } from "pixi.js";
import KeyBoard from "../../keyboard/keyboard";

interface Props {}

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

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <div ref={ref} />
    </div>
  );
}

export default PixiApplication;
