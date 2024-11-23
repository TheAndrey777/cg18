import PixiApplication from "../../components/pixi/App";
import ElementSelector from "./ElementSelector";

const Editor = () => {
  return (
    <div className="w-full h-full grid grid-cols-[300px_1fr] overflow-hidden relative">
      <ElementSelector />
      <div className="h-full">
        <PixiApplication />
      </div>
    </div>
  );
};

export default Editor;
