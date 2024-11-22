import { PixiComponent } from "@pixi/react";
import { Color, Graphics } from "pixi.js";
import { Rectangle } from "./Rectangle";
import { Container, PixiRef } from "@pixi/react";
import React from "react";

type IContainer = PixiRef<typeof Container>; // Pixi Container

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

export const Grid = (props: Props) => {
  const { height, width, size } = props;
  const containerRef = React.useRef<IContainer>(null);

  let h: number = (height / size) * 2;
  let w: number = (width / size) * 2;

  let grid: Tile[] = [];
  const lineSize: number = 1;
  for (let i = 0; i < h; i++)
    for (let j = 0; j < w; j++)
      grid.push({
        x: j * size + j * lineSize,
        y: i * size + i * lineSize,
        color: 0xffffff,
      });

  console.log(grid);

  return (
    <Container scale={0.5} ref={containerRef}>
      {grid.map((item, id) => (
        <Rectangle
          x={item.x}
          y={item.y}
          lineSize={lineSize}
          width={size}
          height={size}
          color={item.color}
        />
      ))}
    </Container>
  );
};
