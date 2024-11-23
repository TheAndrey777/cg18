type directions = {
  up: number;
  down: number;
  right: number;
  left: number;
};

let tiles: any;

export function colorRoom(
  x: number,
  y: number,
  w: number,
  h: number,
  size: number,
  walls: any,
  containetOfTiles: any
) {
  tiles = containetOfTiles;
  let directions: directions[][] = [];
  for (let i = 0; i < h; i++) {
    directions.push([]);
    for (let j = 0; j < w; j++)
      directions[i].push({ up: 1, down: 1, right: 1, left: 1 });
  }

  walls.forEach((wall: any) => {
    let cx = Math.floor(wall.sx / size);
    let cy = Math.floor(wall.sy / size);
    let tx = Math.floor(wall.fx / size);
    let ty = Math.floor(wall.fy / size);

    let horizontal = cy == ty;

    console.log(wall, { cx: cx, cy: cy, tx: tx, ty: ty });
    if (horizontal) {
      for (let i = Math.min(cx, tx) + 1; i <= Math.max(cx, tx); i++) {
        directions[cy][i].down = 0;
        directions[cy + 1][i].up = 0;
      }
    } else {
      for (let i = Math.min(cy, ty) + 1; i <= Math.max(cy, ty); i++) {
        directions[i][cx + 1].left = 0;
        directions[i][cx].right = 0;
      }
    }
  });

  console.log(directions);

  let used: number[][] = [];
  for (let i = 0; i < h; i++) {
    used.push([]);
    for (let j = 0; j < w; j++) used[i].push(0);
  }

  if (dfsCheck(x, y, used, directions)) return [];

  let list: number[] = [];
  dfs(x, y, used, directions, list);

  return list;
}

function dfsCheck(x: number, y: number, used: any, directions: any) {
  if (x < 0 || y < 0) return true;
  if (y >= used.length || x >= used[0].length) return true;
  if (used[y][x]) return false;
  used[y][x] = 1;

  if (directions[y][x].left && dfsCheck(x - 1, y, used, directions))
    return true;
  if (directions[y][x].right && dfsCheck(x + 1, y, used, directions))
    return true;
  if (directions[y][x].up && dfsCheck(x, y - 1, used, directions)) return true;
  if (directions[y][x].down && dfsCheck(x, y + 1, used, directions))
    return true;
}

function dfs(x: number, y: number, used: any, directions: any, list: any) {
  if (x < 0 || y < 0) return;
  if (y >= used.length || x >= used[0].length) return;
  if (used[y][x] == 2) return;
  used[y][x] = 2;
  // tiles.children[used.length * y + x].tint = 0xff00ff;

  if (directions[y][x].left && dfs(x - 1, y, used, directions, list)) return;
  if (directions[y][x].right && dfs(x + 1, y, used, directions, list)) return;
  if (directions[y][x].up && dfs(x, y - 1, used, directions, list)) return;
  if (directions[y][x].down && dfs(x, y + 1, used, directions, list)) return;

  list.push(y * used.length + x);
}
