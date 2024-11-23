import React from "react";
import { PixiComponent, useApp } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

const COLORS = [0x000000, 0xff0000];

interface Props {
  sx: number;
  sy: number;
  fx: number;
  fy: number;
  app: any;
  type: number;
}

export const getWallTexture = (props: Props) => {
  const g = new Graphics();
  g.beginFill(0x000000);
  g.lineStyle(5, 0x000000, 1);
  console.log(props.sx, props.sy, props.fx, props.fy);
  g.moveTo(props.sx, props.sy);
  g.lineTo(props.fx, props.fy);
  g.endFill();

  return props.app.renderer.generateTexture(g);
};

export class Wall extends Sprite {
  constructor(props: Props) {
    super(
      getWallTexture({
        sx: props.sx,
        sy: props.sy,
        fx: props.fx,
        fy: props.fy,
        app: props.app,
        type: 1,
      })
    );
    this.x = (props.sx + props.fx) / 2;
    this.y = (props.sy + props.fy) / 2;
    this.interactive = true;
    this.anchor.set(0.5);
  }
}
