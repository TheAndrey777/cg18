import { PixiComponent, useApp } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

interface TextureProps {
  width: number;
  height: number;
  lineSize: number;
  color: 0xffffff;
  app: any;
}

interface Props {
  texture: any;
  x: number;
  y: number;
  size: number;
  onTileClick: any;
  app: any;
}

export const getRectangleTexture = (props: TextureProps) => {
  const g = new Graphics();
  g.lineStyle(props.lineSize, 0xcccccc, props.lineSize);
  g.beginFill(props.color);
  g.drawRect(0, 0, props.width, props.height);
  g.endFill();

  return props.app.renderer.generateTexture(g);
};

export class Tile extends Sprite {
  public name123 = "";
  constructor(props: Props) {
    super(props.texture);

    this.x = props.x;
    this.y = props.y;
    this.interactive = true;
    this.on("pointerup", (e) => {
      props.onTileClick(
        e,
        props.app,
        this.x,
        this.y,
        this.x + this.width,
        this.y + this.height,
        this
      );
    });
  }
}
