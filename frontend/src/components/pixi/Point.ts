import React from "react";
import { PixiComponent, useApp } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

interface Props {
  texture: any;
}

interface TextureProps {
  size: number;
  color: any;
  borderColor: any;
  app: any;
}

export const getPointTexture = (props: TextureProps) => {
  const g = new Graphics();
  g.lineStyle(3, props.borderColor, 3);
  g.beginFill(props.color, 0.7);
  g.drawCircle(0, 0, props.size);
  g.endFill();

  return props.app.renderer.generateTexture(g);
};

export class Point extends Sprite {
  constructor(props: Props) {
    super(props.texture);
    this.visible = false;
  }
}
