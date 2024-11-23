import { Mouse } from "../../PixiMouse/Mouse";
import { Point, getPointTexture } from "./Point";
import { Tile, getRectangleTexture } from "./Tile";
import { Sprite } from "pixi.js";
import { Vector, isInter } from "../../math/math";

import { Container } from "pixi.js";
import { Wall } from "./Wall";

interface Tile1 {
  x: number;
  y: number;
  color: number;
}

interface Wall1 {
  sx: number;
  sy: number;
  fx: number;
  fy: number;
  type: number;
}

const getNearPosition = (x1: number, x2: number, mX: number) =>
  mX - x1 / 2 < x2 / 2 - mX ? x1 : x2;

const POINT_SIZE = 10;

export class Grid extends Container {
  public onTimer = () => {};

  constructor(width: number, height: number, size: number, app: any) {
    super();

    const startPoint = new Point({
      texture: getPointTexture({
        size: POINT_SIZE,
        color: 0x00ff00,
        borderColor: 0xffff00,
        app: app,
      }),
    });
    const finishPoint = new Point({
      texture: getPointTexture({
        size: POINT_SIZE,
        color: 0xfdba74,
        borderColor: 0xff0000,
        app: app,
      }),
    });

    const selectWall = new Wall({
      sx: 0,
      sy: 0,
      fx: 0,
      fy: 0,
      app: app,
      angle: 0,
      type: 2,
    });
    selectWall.visible = false;

    const pointContainer = new Container();
    pointContainer.addChild(startPoint);
    pointContainer.addChild(finishPoint);

    const walls = new Array<Wall1>(0);
    const wallContainer = new Container();

    const addWall = () => {
      selectWall.visible = false;
      const v = new Vector(
        startPoint.x + POINT_SIZE,
        startPoint.y + POINT_SIZE,
        finishPoint.x + POINT_SIZE,
        finishPoint.y + POINT_SIZE
      );

      if (Math.abs(v.sx - v.fx) > 15 && Math.abs(v.sy - v.fy) > 15) {
        console.log(321);
        return;
      }
      console.log(123);
      let isFound: boolean = false;
      walls.forEach((wall) => {
        if (isInter(new Vector(wall.sx, wall.sy, wall.fx, wall.fy), v))
          isFound = true;
      });

      if (!isFound) {
        const wall = {
          sx: startPoint.x + 2.5,
          sy: startPoint.y + 2.5,
          fx: finishPoint.x + 2.5,
          fy: finishPoint.y + 2.5,
          type: 1,
        };
        walls.push(wall);
        wallContainer.addChild(
          new Wall({
            sx: v.sx,
            sy: v.sy,
            fx: v.fx,
            fy: v.fy,
            app: app,
            angle: Math.abs(v.sx - v.fx) < Math.abs(v.sy - v.fy) ? 1 : 0,
            type: 0,
          })
        );
      }
      return !isFound;
    };

    const onTileClick = (
      e: any,
      app: any,
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ) => {
      const mX: number = Mouse.x(app);
      const mY: number = Mouse.y(app);

      if (e.button == 2) {
        startPoint.visible = finishPoint.visible = false;
        selectWall.visible = false;
      } else {
        if (!startPoint.visible) {
          startPoint.x = getNearPosition(x1, x2, mX) - POINT_SIZE - 1.5;
          startPoint.y = getNearPosition(y1, y2, mY) - POINT_SIZE - 1.5;
          startPoint.visible = true;
        } else if (!finishPoint.visible) {
          finishPoint.x = getNearPosition(x1, x2, mX) - POINT_SIZE - 1.5;
          finishPoint.y = getNearPosition(y1, y2, mY) - POINT_SIZE - 1.5;
          finishPoint.visible = true;

          if (!addWall()) startPoint.visible = false;
          else {
            startPoint.x = finishPoint.x;
            startPoint.y = finishPoint.y;
          }
          finishPoint.visible = false;
        } else {
          startPoint.visible = false;
          finishPoint.visible = false;
        }
      }
    };

    let h: number = (height / size) * 2;
    let w: number = (width / size) * 2;
    let grid: Tile1[] = [];
    const lineSize: number = 1;
    for (let i = 0; i < h; i++)
      for (let j = 0; j < w; j++)
        grid.push({
          x: j * size,
          y: i * size,
          color: 0xffffff,
        });

    const tileTexture = getRectangleTexture({
      lineSize: lineSize,
      width: size,
      height: size,
      color: 0xffffff,
      app: app,
    });

    const tileContainer = new Container();
    this.scale.set(0.5);
    tileContainer.addChild(
      ...grid.map((val, id) => {
        return new Tile({
          texture: tileTexture,
          size: size,
          x: val.x,
          y: val.y,
          app: app,
          onTileClick: onTileClick,
        });
      })
    );

    this.onTimer = () => {
      if (startPoint.visible === finishPoint.visible) return;
      const mX = Mouse.x(app) - 8;
      const mY = Mouse.y(app) - 8;
      const dx = Math.abs(startPoint.x / 2 - mX);
      const dy = Math.abs(startPoint.y / 2 - mY);

      let x: number = startPoint.x;
      let y: number = startPoint.y;
      if (dx > dy) x = mX * 2;
      else y = mY * 2;

      const v = new Vector(
        startPoint.x + POINT_SIZE + 2.5,
        startPoint.y + POINT_SIZE + 2.5,
        x + POINT_SIZE + 2.5,
        y + POINT_SIZE + 2.5
      );

      let isFound = false;
      walls.forEach((wall) => {
        if (isInter(new Vector(wall.sx, wall.sy, wall.fx, wall.fy), v))
          isFound = true;
      });

      selectWall.visible = true;
      selectWall.update({
        sx: startPoint.x + POINT_SIZE + 2.5,
        sy: startPoint.y + POINT_SIZE + 2.5,
        fx: x + POINT_SIZE + 2.5,
        fy: y + POINT_SIZE + 2.5,
        type: isFound ? 1 : 2,
        angle: dx > dy ? 0 : 1,
        app: app,
      });
    };

    app.stage.addEve;

    this.addChild(tileContainer);
    this.addChild(wallContainer);
    this.addChild(selectWall);
    this.addChild(pointContainer);
  }
}
