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
  //   g.beginFill(0xffffff, 1);
  //   g.drawRect(-5, -5, 35, 35);
  //   g.endFill();
  g.lineStyle(8, 0xffffff, 1);
  g.moveTo(0, 0);
  g.lineTo(40, 0);
  g.closePath();
  g.lineStyle(4, 0x000000, 1);
  g.moveTo(0, 1);
  g.lineTo(20 * 2, 6 * 2);
  g.closePath();

  return props.app.renderer.generateTexture(g);
};

export class Door extends Sprite {
  public name = "Дверь";
  public weight = 0;
  public fixed = 0;

  constructor(props: Props) {
    super(getMonitorTexture({ app: props.app }));
    console.log("Дверь");

    this.anchor.set(0.5);
    this.x = props.x;
    this.y = props.y;
    this.anchor.set(0.5, 0.25);
    this.interactive = true;
    this.on("mousedown", (e) => props.onObjectClickDown(e, this));
    this.on("mouseup", (e) => props.onObjectClickUp(e, this));
    this.on("wheel", () => (this.rotation += Math.PI / 2));
  }
}
