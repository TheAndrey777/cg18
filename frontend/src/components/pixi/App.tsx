import { Stage, useApp } from "@pixi/react";
import { Grid } from "./Grid";
import React, { useRef, useEffect } from "react";
import { Application, Container, Graphics } from "pixi.js";

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

    // Add app to DOM
    ref.current!.appendChild(app.view);

    app.stage.addChild(new Grid(500, 500, 30, app));

    app.ticker.add(() => {}, 100);

    // Start the PixiJS app
    app.start();

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
  }, []);

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <span>123321</span>
      <div ref={ref} />
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
