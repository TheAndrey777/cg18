import { PixiComponent, useApp } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

interface TextureProps {
  width: number;
  height: number;
  lineSize: number;
  color: 0xffffff;
}

interface Props {
  texture: any;
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: any;
  app: any;
}

export const getRectangleTexture = (props: TextureProps) => {
  const g = new Graphics();
  g.lineStyle(props.lineSize, 0xcccccc, props.lineSize);
  g.beginFill(props.color);
  g.drawRect(0, 0, props.width, props.height);
  g.endFill();

  const app = useApp();
  return app.renderer.generateTexture(g);
};

export const Rectangle = PixiComponent<Props, Sprite>("Rectangle", {
  create: () => new Sprite(),
  applyProps: (ins, _, props) => {
    ins.texture = props.texture;
    ins.x = props.x;
    ins.y = props.y;
    ins.width = props.width;
    ins.height = props.height;
    ins.interactive = true;
    ins.on("pointerup", (e) => {
      console.log({ button: e.button });
      props.onClick(e, props.app);
    });
  },
});
