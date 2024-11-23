import { useApp } from "@pixi/react";
import { Application } from "pixi.js";

const SCREEN_WIDTH = 3162;
const SCREEN_HEIGHT = 1779;

export const Mouse = {
  x: (app: number) => {
    const pointer = app.renderer.plugins.interaction.pointer;
    let scale = app.stage.scale;
    return pointer.screenX * scale.x;
  },
  y: (app: any) => {
    const pointer = app.renderer.plugins.interaction.pointer;
    let scale = app.stage.scale;
    return pointer.screenY * scale.y;
  },

  innerX: (app: any) => {
    const pointer = app.renderer.plugins.interaction.pointer;
    return pointer.pageX;
  },

  innerY: (app: any) => {
    const pointer = app.renderer.plugins.interaction.pointer;
    return pointer.pageY;
  },
};
