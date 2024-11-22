import { Rectangle, getTexture } from "./Rectangle";
import { Container } from "@pixi/react";

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

  const texture = getTexture({
    lineSize: lineSize,
    width: size,
    height: size,
    color: 0xffffff,
  });

  return (
    <Container scale={0.5}>
      {grid.map((item, id) => (
        <Rectangle
          texture={texture}
          width={size}
          height={size}
          x={item.x}
          y={item.y}
        />
      ))}
    </Container>
  );
};
