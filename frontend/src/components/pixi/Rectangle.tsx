import { PixiComponent } from "@pixi/react";
import { Graphics } from "pixi.js";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  lineSize: number;
}

export const Rectangle = PixiComponent<Props, Graphics>("Rectangle", {
  create: () => new Graphics(),
  applyProps: (ins, _, props) => {
    ins.lineStyle(props.lineSize, 0x0fff00, props.lineSize);
    ins.beginFill(props.color);
    ins.drawRect(props.x, props.y, props.width, props.height);
    ins.endFill();
  },
});
