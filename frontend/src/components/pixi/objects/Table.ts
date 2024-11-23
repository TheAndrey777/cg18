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

const getTableTexture = (props: TextureProps) => {
  const g = new Graphics();
  g.lineStyle(4, 0xa65500, 1);
  g.beginFill(0xffa240, 0.7);
  g.drawRoundedRect(0, 0, 30, 50, 10);
  g.endFill();

  return props.app.renderer.generateTexture(g);
};

export class Table extends Sprite {
  public weight = 1;
  public fixed = 0;

  constructor(props: Props) {
    super(getTableTexture({ app: props.app }));
    console.log("Table");

    this.anchor.set(0.5);
    this.x = props.x;
    this.y = props.y;
    this.interactive = true;
    this.on("pointerdown", (e) => props.onObjectClickDown(e, this));
    this.on("pointerup", (e) => props.onObjectClickUp(e, this));
    this.on("wheel", () => (this.rotation += 0.1 * Math.PI));
  }
}
