import React from "react";
import { PixiComponent, useApp } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

interface Props {
  x: number;
  y: number;
  texture: any;
}

interface TextureProps {
  size: number;
  color: any;
  borderColor: any;
}

export const getPointTexture = (props: TextureProps) => {
  const g = new Graphics();
  g.lineStyle(1, props.borderColor, 1);
  g.beginFill(props.color, 0.7);
  g.drawCircle(0, 0, props.size);
  g.endFill();

  const app = useApp();
  return app.renderer.generateTexture(g);
};

export const Point = PixiComponent<Props, Sprite>("Circle", {
  create: () => new Sprite(),
  applyProps: (ins, _, props) => {
    ins.texture = props.texture;
    ins.x = props.x;
    ins.y = props.y;
    ins.visible = false;
    //ins.width = props.width;
    //ins.height = props.height;
    ins.interactive = true;
    ins.on("pointerup", (e) => {
      //console.log({ button: e.button });
      //props.onClick(props.app);
    });
    console.log(ins);
  },
});
