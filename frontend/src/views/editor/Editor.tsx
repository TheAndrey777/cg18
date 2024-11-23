import PixiApplication from "../../components/pixi/App";
import ElementSelector from "./ElementSelector";
import Tooltip from "../../components/tooltips/Tooltip";

const Editor = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <ElementSelector />
      <div className="bg-blue-200">
        <PixiApplication />
      </div>
      <Tooltip />
    </div>
  );
};

export default Editor;
