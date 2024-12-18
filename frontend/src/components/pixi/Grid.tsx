import { Mouse } from "../../PixiMouse/Mouse";
import { Point, getPointTexture } from "./Point";
import { Tile, getRectangleTexture } from "./Tile";
import { Vector, isInter } from "../../math/math";
import { Table } from "./objects/Table";
import { Door } from "./objects/Door";
import { Tree } from "./objects/Tree";
import { Chair } from "./objects/Chair";

import { Container } from "pixi.js";
import { Wall } from "./Wall";
import { colorRoom } from "../../math/graphs";
import KeyBoaurd from "../../keyboard/keyboard";
import { Monitor } from "./objects/Monitor";
import { useDispatch, useSelector } from "react-redux";
import { sendPacket } from "../../redux/slices/packet";
import { createPacket } from "../../packetCreator/packetCreator";
import { ChairMini } from "./objects/ChairMini";

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

const COPONENT_COLORS = [0xff0000, 0x00ffff, 0x0000ff];
let colorID = 0;

let setOpen1: any;
let setPositionX1: any;
let setPositionY1: any;

let setOpenMes1: any;
let setPositionXMes1: any;
let setPositionYMes1: any;
let setMessage1: any;

let dispatch1: any;
export let startDFS: any;

let id: any;

export class Grid extends Container {
  public loadItem = () => {};
  public onTimer = () => {};
  public setHooks = (
    setOpen: any,
    setPositionX: any,
    setPositionY: any,
    setPositionXMes: any,
    setPositionYMes: any,
    setMessage: any,
    setOpenMes: any
  ) => {
    setOpen1 = setOpen;
    setPositionX1 = setPositionX;
    setPositionY1 = setPositionY;
    setPositionXMes1 = setPositionXMes;
    setPositionYMes1 = setPositionYMes;
    setOpenMes1 = setOpenMes;
    setMessage1 = setMessage;
  };

  constructor(
    width: number,
    height: number,
    tileSize: number,
    app: any,
    dispatch: any
  ) {
    super();

    let mX1: number;
    let mY1: number;

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
      if (e.button === 2) {
        setOpenMes1(true);
        setPositionXMes1(Mouse.innerX(app));
        setPositionYMes1(Mouse.innerY(app));
        setMessage1("Это " + object.name);
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

    let walls = new Array<Wall1>(0);
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
      y2: number,
      obj: any
    ) => {
      const mX: number = Mouse.x(app);
      const mY: number = Mouse.y(app);

      if (seletedObject !== null) return;

      if (e.button == 2) {
        startPoint.visible = finishPoint.visible = false;
        selectWall.visible = false;

        if (obj.tint != 0xffffff) {
          setOpenMes1(true);
          setPositionXMes1(Mouse.innerX(app));
          setPositionYMes1(Mouse.innerY(app));
          setMessage1("Это " + obj.name);
        } else {
          setOpen1(true);
          setPositionX1(Mouse.innerX(app));
          setPositionY1(Mouse.innerY(app));
        }

        mX1 = mX * 2;
        mY1 = mY * 2;
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
        if (tools === 2) {
          addObject(
            new ChairMini({
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
        if (tools === 5) {
          addObject(
            new Tree({
              x: Math.round((mX / tileSize) * 2) * tileSize,
              y: Math.round((mY / tileSize) * 2) * tileSize,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            })
          );
        }
        if (tools === 6) {
          addObject(
            new Chair({
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
      if (KeyBoaurd.onKey("KeyS")) {
        const packData = createPacket({
          tiles: tileContainer.children,
          walls: walls,
          lightObjects: lightObject,
          heavyObjects: heavyObject,
          doors: doors,
        });
        console.log(packData);
        dispatch(
          sendPacket({ officeId: id > 0 ? id : 15, floorplan: packData })
        );
        // sendPacket({});
      }
      const mX = Mouse.x(app) - 8;
      const mY = Mouse.y(app) - 8;
      if (seletedObject !== null) {
        seletedObject.x = (mX + 8) * 2;
        seletedObject.y = (mY + 8) * 2;
      }

      if (tools !== 0) return;
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

    startDFS = (name: string) => {
      const list = colorRoom(
        Math.floor(mX1 / tileSize),
        Math.floor(mY1 / tileSize),
        w,
        h,
        tileSize,
        walls
        // tileContainer
      );

      console.log(name);

      const color = COPONENT_COLORS[colorID++ % COPONENT_COLORS.length];
      list.forEach((id) => {
        tileContainer.children[id].name = name;
        tileContainer.children[id].tint = color;
        tileContainer.children[id].alpha = 0.3;
      });
      if (list.length === 0) console.log("Error");
    };

    console.log();
    this.loadItem = (item: any) => {
      console.log(item);
      item = item[0];
      if (!item) return;
      if (!item.floorplan) return;
      id = item.id;
      const { packObject, packTiles, packedWalls } = item.floorplan;
      console.log(packObject, packTiles, packedWalls);

      walls = [];
      if (packedWalls)
        packedWalls.forEach((wall: any) => {
          wallContainer.addChild(
            new Wall({
              sx: wall.sx - 2.5 + POINT_SIZE,
              sy: wall.sy - 2.5 + POINT_SIZE,
              fx: wall.fx - 2.5 + POINT_SIZE,
              fy: wall.fy - 2.5 + POINT_SIZE,
              type: 0,
              angle: Math.abs(wall.sx - wall.fx) < 10 ? 1 : 0,
              app: app,
            })
          );
          walls.push({
            sx: wall.sx,
            sy: wall.sy,
            fx: wall.fx,
            fy: wall.fy,
            type: 0,
          });
        });

      console.log("packTiles", packTiles);
      if (packTiles)
        packTiles.forEach((tile: any) => {
          mX1 = tile.x;
          mY1 = tile.y;
          if (tile.name !== "") startDFS(tile.name);
        });

      if (packObject)
        packObject.forEach((object: any) => {
          if (object.name == "door" || object.name == "Дверь") {
            const obj = new Door({
              x: object.x,
              y: object.y,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            });
            obj.rotation = object.rotation;
            addObject(obj);
          }
          if (object.name == "monitor" || object.name == "Компьютер") {
            const obj = new Monitor({
              x: object.x,
              y: object.y,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            });
            obj.rotation = object.rotation;
            addObject(obj);
          }

          if (object.name == "Table" || object.name == "Стол") {
            const obj = new Table({
              x: object.x,
              y: object.y,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            });
            obj.rotation = object.rotation;
            addObject(obj);
          }
          if (object.name == "tree" || object.name == "Растение") {
            const obj = new Tree({
              x: object.x,
              y: object.y,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            });
            obj.rotation = object.rotation;
            addObject(obj);
          }
          if (object.name === "chair" || object.name === "Кресло") {
            const obj = new Chair({
              x: object.x,
              y: object.y,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            });
            obj.rotation = object.rotation;
            addObject(obj);
          }
          if (object.name === "ChairMini" || object.name === "Стул") {
            const obj = new ChairMini({
              x: object.x,
              y: object.y,
              app: app,
              onObjectClickDown: onObjectClickDown,
              onObjectClickUp: onObjectClickUp,
            });
            obj.rotation = object.rotation;
            addObject(obj);
          }
        });
      console.log(wallContainer);
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
