import { Stage, useApp } from "@pixi/react";
import { Grid } from "./Grid";

interface Props {}

function PixiApplication(props: Props) {
  const {} = props;

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <span>123321</span>
      <Stage width={500} height={500} renderOnComponentChange={true}>
        <Grid size={20} height={500} width={500}></Grid>
      </Stage>
    </div>
  );
}

export default PixiApplication;
