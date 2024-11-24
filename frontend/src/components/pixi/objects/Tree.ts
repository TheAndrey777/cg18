import { Graphics, Sprite } from "pixi.js";

interface Props {
  x: number;
  y: number;
  app: any;
  onObjectClickDown: any;
  onObjectClickUp: any;
}

interface TextureProps {
  app: any;
}

const getMonitorTexture = (props: TextureProps) => {
  const g = new Graphics();
  g.beginFill(0x00ee00);
  g.drawCircle(0, 0, 10);
  g.closePath();

  return props.app.renderer.generateTexture(g);
};

export class Tree extends Sprite {
  public name = "tree";
  public weight = 0;
  public fixed = 0;

  constructor(props: Props) {
    super(getMonitorTexture({ app: props.app }));
    console.log("tree");

    this.anchor.set(0.5);
    this.x = props.x;
    this.y = props.y;
    this.interactive = true;
    this.on("mousedown", (e) => props.onObjectClickDown(e, this));
    this.on("mouseup", (e) => props.onObjectClickUp(e, this));
    this.on("wheel", () => (this.rotation += Math.PI / 2));
  }
}
