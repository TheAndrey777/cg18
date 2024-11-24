import { sendPacket } from "../redux/slices/packet";

interface PackedTile {
  x: number;
  y: number;
  roomName: number;
  name: number;
}

interface PackedWall {
  sx: number;
  sy: number;
  fx: number;
  fy: number;
}

interface PackedObject {
  x: number;
  y: number;
  rotation: number;
  name: string;
}
let id1 = 1;
export const packTiles = (tiles: any) => {
  const packedTiles = Array<PackedTile>(0);
  tiles.forEach((tile: any) => {
    let isFound = false;
    packedTiles.forEach((packedTile) => {
      if (packedTile.roomName === tile.tint) isFound = true;
    });
    if (!isFound)
      packedTiles.push({
        x: tile.x,
        y: tile.y,
        roomName: tile.tint,
        name: tile.name || "Комната" + id1++,
      });
  });
  return packedTiles;
};

export const packWalls = (walls: any) => {
  const packedWalls = Array<PackedWall>(0);
  walls.forEach((wall: any) => {
    packedWalls.push({ sx: wall.sx, sy: wall.sy, fx: wall.fx, fy: wall.fy });
  });
  return packedWalls;
};

export const packObjects = (
  lightObjects: any,
  heavyObjects: any,
  doors: any
) => {
  const packedObjects = Array<PackedObject>(0);
  [...lightObjects, ...heavyObjects, ...doors].forEach((object: any) => {
    packedObjects.push({
      x: object.x,
      y: object.y,
      rotation: object.rotation,
      name: object.name,
    });
  });
  return packedObjects;
};

interface Data {
  tiles: any;
  walls: any;
  lightObjects: any;
  heavyObjects: any;
  doors: any;
}

interface PackedData {
  packedTiles: any;
  packedWalls: any;
  packedObjects: any;
}
export const createPacket = (data: Data) => {
  return {
    packTiles: packTiles(data.tiles),
    packedWalls: packWalls(data.walls),
    packObject: packObjects(data.lightObjects, data.heavyObjects, data.doors),
  };
};
