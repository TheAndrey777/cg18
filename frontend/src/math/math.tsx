export class Vector {
  public sx: number;
  public sy: number;
  public fx: number;
  public fy: number;
  public x: number;
  public y: number;

  constructor(sx: number, sy: number, fx: number, fy: number) {
    this.sx = sx;
    this.sy = sy;

    this.fx = fx;
    this.fy = fy;

    this.x = fx - sx;
    this.y = fy - sy;
  }
}

export const getVectorMult = (v1: Vector, v2: Vector) => {
  return v1.x * v2.y - v2.x * v1.y;
};

export const getSign = (x: number) => (x ? x / Math.abs(x) : x);

export const max = (x: number, y: number) => {
  return x > y ? x : y;
};

export const min = (x: number, y: number) => {
  return x < y ? x : y;
};

export const isInter = (v1: Vector, v2: Vector) => {
  if (
    max(min(v1.sx, v1.fx), min(v2.sx, v2.fx)) >
    min(max(v1.sx, v1.fx), max(v2.sx, v2.fx)) - 6
  )
    return false;
  if (
    max(min(v1.sy, v1.fy), min(v2.sy, v2.fy)) >
    min(max(v1.sy, v1.fy), max(v2.sy, v2.fy)) - 6
  )
    return false;

  const v1_1 = new Vector(v1.sx, v1.sy, v2.sx, v2.sy);
  const v1_2 = new Vector(v1.sx, v1.sy, v2.fx, v2.fy);
  const v2_1 = new Vector(v2.sx, v2.sy, v1.sx, v1.sy);
  const v2_2 = new Vector(v2.sx, v2.sy, v1.fx, v1.fy);

  return !(
    getSign(getVectorMult(v1, v1_1)) * getSign(getVectorMult(v1, v1_2)) > 0 ||
    getSign(getVectorMult(v2, v2_1)) * getSign(getVectorMult(v2, v2_2)) > 0
  );
};