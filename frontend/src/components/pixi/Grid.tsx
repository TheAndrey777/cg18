import { Mouse } from "../../PixiMouse/Mouse";
import { Point, getPointTexture } from "./Point";
// import { Wall, getWallTexture } from "./Wall";
import { Tile, getRectangleTexture } from "./Tile";
import { Sprite } from "pixi.js";
// import { Container, useApp, PixiRef, Sprite, PixiComponent } from "@pixi/react";
// import React, { useState } from "react";
import { Vector, isInter } from "../../math/math";

import { Container } from "pixi.js";
import { Wall } from "./Wall";

// interface Props {
//   width: number;
//   height: number;
//   size: number;
// }

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

    const pointContainer = new Container();
    pointContainer.addChild(startPoint);
    pointContainer.addChild(finishPoint);

    const walls = new Array<Wall1>(0);
    const wallContainer = new Container();

    const addWall = () => {
      const v = new Vector(
        startPoint.x + POINT_SIZE,
        startPoint.y + POINT_SIZE,
        finishPoint.x + POINT_SIZE,
        finishPoint.y + POINT_SIZE
      );

      let isFound: boolean = false;
      walls.forEach((wall) => {
        if (isInter(new Vector(wall.sx, wall.sy, wall.fx, wall.fy), v))
          isFound = true;
      });

      if (!isFound) {
        const wall = {
          sx: startPoint.x,
          sy: startPoint.y,
          fx: finishPoint.x,
          fy: finishPoint.y,
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
            type: 1,
          })
        );
      }
    };

    const onTileClick = (
      e: any,
      app: any,
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ) => {
      console.log({ button: e.button });
      const mX: number = Mouse.x(app);
      const mY: number = Mouse.y(app);
      console.log(Mouse.x(app), Mouse.y(app));

      if (e.button == 2) {
        if (startPoint.visible) startPoint.visible = false;
        if (finishPoint.visible) finishPoint.visible = false;
      } else {
        if (!startPoint.visible) {
          startPoint.x = getNearPosition(x1, x2, mX) - POINT_SIZE - 1.5;
          startPoint.y = getNearPosition(y1, y2, mY) - POINT_SIZE - 1.5;
          startPoint.visible = true;
        } else if (!finishPoint.visible) {
          finishPoint.x = getNearPosition(x1, x2, mX) - POINT_SIZE - 1.5;
          finishPoint.y = getNearPosition(y1, y2, mY) - POINT_SIZE - 1.5;
          finishPoint.visible = true;

          console.log(finishPoint.x, finishPoint.y);

          addWall();
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

    this.addChild(tileContainer);
    this.addChild(wallContainer);
    this.addChild(pointContainer);
  }
}

// type IPoint = PixiRef<typeof Point>;
// type IContainer = PixiRef<typeof Container>;

// const getNearPosition = (x1: number, x2: number, mX: number) =>
//   mX - x1 / 2 < x2 / 2 - mX ? x1 : x2;

// export const Grid = (props: Props) => {
//   const { height, width, size } = props;

//   const pointRefS = React.useRef<IPoint>(null);
//   const pointRefF = React.useRef<IPoint>(null);
//   const containerRefF = React.useRef<IContainer>(null);
//   const POINT_SIZE = 10;

//   const [walls, setWalls] = useState<Wall1[]>([]);

//   console.log(walls);

//   const addWall = () => {
//     const v = new Vector(
//       pointRefS.current!.x,
//       pointRefS.current!.y,
//       pointRefF.current!.x,
//       pointRefF.current!.y
//     );

//     let isFound: boolean = false;
//     walls.forEach((wall) => {
//       if (isInter(new Vector(wall.sx, wall.sy, wall.fx, wall.fy), v))
//         isFound = true;
//     });

//     if (!isFound) {
//       const wall = { sx: v.sx, sy: v.sy, fx: v.fx, fy: v.fy, type: 1 };
//       //      setWalls([...walls, wall]);
//     }
//   };

//   const app = useApp();
//   const onClick = (
//     e: any,
//     app: any,
//     x1: number,
//     y1: number,
//     x2: number,
//     y2: number
//   ) => {
//     const mX: number = Mouse.x(app);
//     const mY: number = Mouse.y(app);
//     console.log(Mouse.x(app), Mouse.y(app));

//     if (e.button == 2) {
//       if (pointRefS.current!.visible) pointRefS.current!.visible = false;
//       if (pointRefF.current!.visible) pointRefF.current!.visible = false;
//     } else {
//       if (!pointRefS.current!.visible) {
//         pointRefS.current!.x = getNearPosition(x1, x2, mX) - POINT_SIZE - 1.5;
//         pointRefS.current!.y = getNearPosition(y1, y2, mY) - POINT_SIZE - 1.5;
//         pointRefS.current!.visible = true;
//       } else if (!pointRefF.current!.visible) {
//         pointRefF.current!.x = getNearPosition(x1, x2, mX) - POINT_SIZE - 1.5;
//         pointRefF.current!.y = getNearPosition(y1, y2, mY) - POINT_SIZE - 1.5;
//         pointRefF.current!.visible = true;

//         addWall();
//       } else {
//         if (pointRefS.current!.visible) pointRefS.current!.visible = false;
//         if (pointRefF.current!.visible) pointRefF.current!.visible = false;
//       }
//     }
//   };

//   let h: number = (height / size) * 2;
//   let w: number = (width / size) * 2;

//   let grid: Tile[] = [];
//   const lineSize: number = 1;
//   for (let i = 0; i < h; i++)
//     for (let j = 0; j < w; j++)
//       grid.push({
//         x: j * size,
//         y: i * size,
//         color: 0xffffff,
//       });

//   const rectangleTexture = getRectangleTexture({
//     lineSize: lineSize,
//     width: size,
//     height: size,
//     color: 0xffffff,
//   });

//   return (
//     <Container ref={containerRefF} scale={0.5}>
//       {grid.map((item, id) => (
//         <Rectangle
//           key={id}
//           texture={rectangleTexture}
//           width={size}
//           height={size}
//           x={item.x}
//           y={item.y}
//           onClick={onClick}
//           app={app}
//         />
//       ))}
//       {walls.map((wall, id) => (
//         <Wall
//           key={id}
//           texture={getWallTexture({
//             sx: wall.sx,
//             sy: wall.sy,
//             fx: wall.fx,
//             fy: wall.fy,
//             type: wall.type,
//           })}
//         />
//       ))}
//       <Point
//         ref={pointRefS}
//         texture={getPointTexture({
//           size: POINT_SIZE,
//           color: 0xfdba74,
//           borderColor: 0xff0000,
//         })}
//         x={100}
//         y={100}
//       />
//       <Point
//         ref={pointRefF}
//         texture={getPointTexture({
//           size: POINT_SIZE,
//           color: 0x00ff00,
//           borderColor: 0xffff00,
//         })}
//         x={200}
//         y={200}
//       />
//     </Container>
//   );
// };/
