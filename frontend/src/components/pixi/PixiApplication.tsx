import { Stage } from "@pixi/react";
import { Grid } from "./Grid";

export const App = () => (
  <Stage width={500} height={500}>
    <Grid size={20} height={500} width={500}></Grid>
  </Stage>
);
