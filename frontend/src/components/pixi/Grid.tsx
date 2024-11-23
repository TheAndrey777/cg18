import { Mouse } from "../../PixiMouse/Mouse";
import { Point, getPointTexture } from "./Point";
import { Tile, getRectangleTexture } from "./Tile";
import { Vector, isInter } from "../../math/math";
import { Table } from "./objects/Table";
import { Door } from "./objects/Door";

import { Container } from "pixi.js";
import { Wall } from "./Wall";
import { colorRoom } from "../../math/graphs";
import KeyBoaurd from "../../keyboard/keyboard";
import { Monitor } from "./objects/Monitor";

let reset: any;

let tools = 0;

export const setTools = (id: number) => {
  tools = id;
  console.log(id);
  reset();
};

interface Tile1 {
  x: number;
  y: number;
  color: number;
  name: string;
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

  constructor(width: number, height: number, tileSize: number, app: any) {
    super();

    const heavyObject = [];
    const lightObject = [];
    const heavyObjectContainer = new Container();
    const lightObjectContainer = new Container();

    const doors = [];
    const doorContainer = new Container();

    const addObject = (object: any) => {
      if (object instanceof Door) {
        doors.push(object);
        doorContainer.addChild(object);
        return;
      }
      if (!object.weight) {
        lightObject.push(object);
        lightObjectContainer.addChild(object);
      } else {
        heavyObjectContainer.addChild(object);
        heavyObject.push(object);
      }
    };

    const deleteObject = (object: any) => {
      if (object instanceof Door) {
        doors.splice(doors.indexOf(object), 1);
        doorContainer.removeChild(object);
        return;
      }

      if (object.weight) {
        heavyObject.splice(heavyObject.indexOf(object), 1);
        heavyObjectContainer.removeChild(object);
      } else {
        lightObject.splice(lightObject.indexOf(object), 1);
        lightObjectContainer.removeChild(object);
      }
    };

    let seletedObject: any = null;
    const onObjectClickDown = (e: any, object: any) => {
      startPoint.visible = finishPoint.visible = selectWall.visible = false;
      if (e.button === 0) {
        if (seletedObject === null) seletedObject = object;
        console.log(seletedObject);
      }
    };

    const onObjectClickUp = (e: any, object: any) => {
      startPoint.visible = finishPoint.visible = selectWall.visible = false;
      if (e.button === 0) {
        if (seletedObject !== null) {
          seletedObject.x = Math.round(seletedObject.x / tileSize) * tileSize;
          seletedObject.y = Math.round(seletedObject.y / tileSize) * tileSize;
          console.log(seletedObject);
          seletedObject = null;
        }
      }
    };

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

    let h: number = (height / tileSize) * 2;
    let w: number = (width / tileSize) * 2;
    let grid: Tile1[] = [];
    const lineSize: number = 1;
    for (let i = 0; i < h; i++)
      for (let j = 0; j < w; j++)
        grid.push({
          x: j * tileSize,
          y: i * tileSize,
          color: 0xffffff,
          name: "",
        });

    const tileTexture = getRectangleTexture({
      lineSize: lineSize,
      width: tileSize,
      height: tileSize,
      color: 0xffffff,
      app: app,
    });

    const tileContainer = new Container();
    this.scale.set(0.5);

    const addWall = () => {
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
      let isFound: boolean = false;
      walls.forEach((wall) => {
        if (isInter(new Vector(wall.sx, wall.sy, wall.fx, wall.fy), v))
          isFound = true;
      });

      if (!isFound) {
        selectWall.visible = false;
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

      if (seletedObject !== null) return;

      if (e.button == 2) {
        startPoint.visible = finishPoint.visible = false;
        selectWall.visible = false;

        const name = "Кухня";
        const list = colorRoom(
          Math.floor((mX / tileSize) * 2),
          Math.floor((mY / tileSize) * 2),
          w,
          h,
          tileSize,
          walls
          // tileContainer
        );

        list.forEach((id) => {
          grid[id].name = name;
          // console.log(tileContainer);
          tileContainer.children[id].tint = 0xf5ab56;
        });
        console.log(list);
        if (list.length === 0) console.log;
        ("Error");
      } else {
        if (tools === 0) {
          if (!startPoint.visible) {
            startPoint.x = getNearPosition(x1, x2, mX) - POINT_SIZE - 1.5;
            startPoint.y = getNearPosition(y1, y2, mY) - POINT_SIZE - 1.5;
            startPoint.visible = true;
          } else if (!finishPoint.visible) {
            finishPoint.x = getNearPosition(x1, x2, mX) - POINT_SIZE - 1.5;
            finishPoint.y = getNearPosition(y1, y2, mY) - POINT_SIZE - 1.5;
            finishPoint.visible = true;

            if (addWall()) {
              startPoint.x = finishPoint.x;
              startPoint.y = finishPoint.y;
            }
            finishPoint.visible = false;
          } else {
            startPoint.visible = false;
            finishPoint.visible = false;
          }
        }
        if (tools === 1) {
          addObject(
            new Table({
              x: Math.round((mX / tileSize) * 2) * tileSize,
              y: Math.round((mY / tileSize) * 2) * tileSize,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            })
          );
        }
        if (tools === 3) {
          addObject(
            new Monitor({
              x: Math.round((mX / tileSize) * 2) * tileSize,
              y: Math.round((mY / tileSize) * 2) * tileSize,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            })
          );
        }
        if (tools === 4) {
          addObject(
            new Door({
              x: Math.round((mX / tileSize) * 2) * tileSize,
              y: Math.round((mY / tileSize) * 2) * tileSize,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            })
          );
        }
      }
    };

    tileContainer.addChild(
      ...grid.map((val, id) => {
        return new Tile({
          texture: tileTexture,
          size: tileSize,
          x: val.x,
          y: val.y,
          app: app,
          onTileClick: onTileClick,
        });
      })
    );

    this.onTimer = () => {
      if (KeyBoaurd.hasKey("Escape")) reset();
      if (tools !== 0) return;
      const mX = Mouse.x(app) - 8;
      const mY = Mouse.y(app) - 8;
      if (seletedObject !== null) {
        seletedObject.x = (mX + 8) * 2;
        seletedObject.y = (mY + 8) * 2;
      }
      if (startPoint.visible === finishPoint.visible) return;
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
        if (
          isInter(
            new Vector(
              wall.sx + 2.5,
              wall.sy + 2.5,
              wall.fx + 2.5,
              wall.fy + 2.5
            ),
            v
          )
        )
          isFound = true;
      });

      selectWall.visible = true;
      selectWall.update({
        sx: v.sx,
        sy: v.sy,
        fx: v.fx,
        fy: v.fy,
        type: isFound ? 1 : 2,
        angle: dx > dy ? 0 : 1,
        app: app,
      });
    };

    reset = () => {
      startPoint.visible = finishPoint.visible = false;
      selectWall.visible = false;

      if (seletedObject !== null) deleteObject(seletedObject);
      seletedObject = null;
    };

    this.addChild(tileContainer);
    this.addChild(heavyObjectContainer);
    this.addChild(lightObjectContainer);
    this.addChild(wallContainer);
    this.addChild(doorContainer);
    this.addChild(selectWall);
    this.addChild(pointContainer);
  }
}
