import React from "react";
import { PixiComponent, useApp } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

const COLORS = [0x111111, 0xff0000, 0x00ff00];

interface Props {
  sx: number;
  sy: number;
  fx: number;
  fy: number;
  angle: number;
  app: any;
  type: number;
}

interface textureProps {
  angle: number;
  app: any;
}

let hTexture: any = null;
let wTexture: any = null;

export const getWallTexture = (props: textureProps) => {
  const g = new Graphics();
  g.lineStyle(4, 0xffffff, 1);

  if (hTexture !== null && props.angle) return hTexture;
  if (wTexture !== null && !props.angle) return wTexture;
  // g.moveTo(props.sx, props.sy);
  // g.lineTo(props.fx, props.fy);

  // console.log((props.sx + props.fx) / 2, (props.sy + props.fy) / 2);

  g.moveTo(0, 0);
  if (!props.angle) g.lineTo(200, 0);
  else g.lineTo(0, 200);
  g.endFill();

  return props.app.renderer.generateTexture(g);
};

export class Wall extends Sprite {
  constructor(props: Props) {
    super(
      getWallTexture({
        angle: props.angle,
        app: props.app,
      })
    );

    this.tint = COLORS[props.type];

    if (hTexture !== null)
      hTexture = getWallTexture({ angle: 1, app: props.app });
    if (wTexture !== null)
      wTexture = getWallTexture({ angle: 0, app: props.app });
    // console.log(this.texture);
    this.x = (props.sx + props.fx) / 2 + 2;
    this.y = (props.sy + props.fy) / 2 + 2;

    const dx = Math.abs(props.sx - props.fx);
    const dy = Math.abs(props.sy - props.fy);

    this.height = this.width = 4;
    if (!props.angle) this.width = dx;
    else this.height = dy;

    this.interactive = true;
    this.anchor.set(0.5);

    console.log(this.texture, this.x, this.y);
    console.log(this);
  }

  public update(props: Props) {
    this.texture = getWallTexture({
      angle: props.angle,
      app: props.app,
    });

    this.tint = COLORS[props.type];

    this.x = (props.sx + props.fx) / 2;
    this.y = (props.sy + props.fy) / 2;

    const dx = Math.abs(props.sx - props.fx);
    const dy = Math.abs(props.sy - props.fy);

    this.height = this.width = 4;
    if (!props.angle) this.width = dx;
    else this.height = dy;

    this.anchor.set(0.5);
    this.alpha = 0.5;
    this.visible = true;
  }
}
