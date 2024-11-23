import Menu from "../../components/navigation/menu/Menu";
import Editor from "../../views/editor/Editor";
import Offices from "../../views/offices/Offices";

const Home = () => {
  return (
    <div className="bg-default-100 min-h-full w-full relative grid grid-cols-[auto_1fr] gap-[20px] p-[25px] box-border ">
      <Menu />
      <div className="bg-green-3001 w-full">
        <div className="w-full h-[60px] text-content-1 bg-orange-3001 ">
          header
        </div>
        <div className="bg-yellow-3001">
          <Offices />
        </div>
      </div>
    </div>
  );
};

export default Home;
