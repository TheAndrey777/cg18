import { Mouse } from "../../PixiMouse/Mouse";
import { Point, getPointTexture } from "./Point";
import { Rectangle, getRectangleTexture } from "./Rectangle";
import { Container, useApp, PixiRef } from "@pixi/react";
import React from "react";

interface Props {
  width: number;
  height: number;
  size: number;
}

interface Tile {
  x: number;
  y: number;
  color: number;
}

type IPoint = PixiRef<typeof Point>;

export const Grid = (props: Props) => {
  const { height, width, size } = props;

  const pointRefS = React.useRef<IPoint>(null);
  const pointRefF = React.useRef<IPoint>(null);
  const POINT_SIZE = 10;

  const app = useApp();
  const onClick = (
    e: any,
    app: any,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const mX: number = Mouse.x(app);
    const mY: number = Mouse.y(app);
    console.log(Mouse.x(app), Mouse.y(app));

    if (e.button == 2) {
      if (pointRefS.current!.visible) pointRefS.current!.visible = false;
      if (pointRefF.current!.visible) pointRefF.current!.visible = false;
    } else {
      if (!pointRefS.current!.visible) {
        console.log(1);
        if (mX - x1 / 2 < x2 / 2 - mX) pointRefS.current!.x = x1 - POINT_SIZE;
        else pointRefS.current!.x = x2 - POINT_SIZE;

        if (mY - y1 / 2 < y2 / 2 - mY) pointRefS.current!.y = y1 - POINT_SIZE;
        else pointRefS.current!.y = y2 - POINT_SIZE;

        pointRefS.current!.visible = true;
      } else if (!pointRefF.current!.visible) {
        console.log(2);
        if (mX - x1 / 2 < x2 / 2 - mX) pointRefF.current!.x = x1 - POINT_SIZE;
        else pointRefF.current!.x = x2 - POINT_SIZE;

        if (mY - y1 / 2 < y2 / 2 - mY) pointRefF.current!.y = y1 - POINT_SIZE;
        else pointRefF.current!.y = y2 - POINT_SIZE;
        pointRefF.current!.visible = true;
      } else {
        console.log(3);
        if (pointRefS.current!.visible) pointRefS.current!.visible = false;
        if (pointRefF.current!.visible) pointRefF.current!.visible = false;
      }
    }
  };

  let h: number = (height / size) * 2;
  let w: number = (width / size) * 2;

  let grid: Tile[] = [];
  const lineSize: number = 1;
  for (let i = 0; i < h; i++)
    for (let j = 0; j < w; j++)
      grid.push({
        x: j * size,
        y: i * size,
        color: 0xffffff,
      });

  const rectangleTexture = getRectangleTexture({
    lineSize: lineSize,
    width: size,
    height: size,
    color: 0xffffff,
  });

  return (
    <Container scale={0.5}>
      {grid.map((item, id) => (
        <Rectangle
          key={id}
          texture={rectangleTexture}
          width={size}
          height={size}
          x={item.x}
          y={item.y}
          onClick={onClick}
          app={app}
        />
      ))}
      <Point
        ref={pointRefS}
        texture={getPointTexture({
          size: POINT_SIZE,
          color: 0xfdba74,
          borderColor: 0xff0000,
        })}
        x={100}
        y={100}
      />
      <Point
        ref={pointRefF}
        texture={getPointTexture({
          size: POINT_SIZE,
          color: 0x00ff00,
          borderColor: 0xffff00,
        })}
        x={200}
        y={200}
      />
    </Container>
  );
};
