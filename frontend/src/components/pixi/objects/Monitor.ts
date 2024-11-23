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
  g.lineStyle(2, 0xaaaaaa, 1);
  g.beginFill(0xbbbbbb, 1);
  g.drawRect(0, 0, 4, 20);
  g.endFill();

  return props.app.renderer.generateTexture(g);
};

export class Monitor extends Sprite {
  public weight = 0;
  public fixed = 0;

  constructor(props: Props) {
    super(getMonitorTexture({ app: props.app }));
    console.log("Monitor");

    this.anchor.set(0.5);
    this.x = props.x;
    this.y = props.y;
    this.interactive = true;
    this.on("mousedown", (e) => props.onObjectClickDown(e, this));
    this.on("mouseup", (e) => props.onObjectClickUp(e, this));
    this.on("wheel", () => (this.rotation += 0.1 * Math.PI));
  }
}
