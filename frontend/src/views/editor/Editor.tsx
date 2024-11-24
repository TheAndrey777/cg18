import { useParams } from "react-router-dom";
import PixiApplication from "../../components/pixi/App";
import ElementSelector from "./ElementSelector";
import { useDispatch } from "react-redux";
import { getOffice } from "../../redux/slices/offices";
import React from "react";
import { setMenuActiveId } from "../../redux/slices/storage";

const Editor = () => {
  const { officeId } = useParams();
  console.log(officeId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMenuActiveId({ id: 2 }));
    dispatch(getOffice());
  }, []);

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
