import Menu from "../../components/navigation/menu/Menu";
import Editor from "../../views/editor/Editor";
import { Route, Routes } from "react-router-dom";
import Offices from "../../views/offices/Offices";
import Management from "../../views/offices/Management";

const Home = () => {
  return (
    <div className="bg-default-100 min-h-full w-full relative grid grid-cols-[auto_1fr] gap-[20px] p-[20px] box-border ">
      <Menu />
      <div className="bg-green-3001 w-full">
        <Routes>
          <Route path="offices/*" element={<Offices />} />
          <Route path="management/:officeId/*" element={<Management />} />
          <Route path="management/*" element={<Management />} />
          <Route path="editor/*" element={<Editor />} />
          <Route path="editor/:officeId/*" element={<Editor />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
