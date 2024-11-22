import PixiApplication from "../../components/pixi/App";
import Menu from "../../components/navigation/menu/Menu";

const Home = () => {
  return (
    <div className="bg-default-100 bg-red-200 min-h-full w-full relative grid grid-cols-[auto_1fr] gap-[20px] p-[25px] box-border ">
      <Menu />
      <div className="bg-green-300 w-full">
        <div className="w-full h-[60px] text-content-1 bg-orange-300 ">
          header
        </div>
        <div className="bg-blue-200">
          <PixiApplication />
        </div>
      </div>
    </div>
  );
};

export default Home;
