import { worker1 } from "../../../assets/png";
import { minimenuroow } from "../../../assets/svg";

const MiniProfile = () => {
  return (
    <div className=" absolute 1bg-red-200 bottom-0 w-[calc(100%-20px)] h-fit pb-[10px] box-border cursor-pointer">
      <div className="1bg-blue-300 h-[50px] rounded-[10px] box-border border-solid border-default-300  border-[1px]  flex items-center">
        <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center">
          <img
            src={worker1}
            alt="logo"
            className="h-[35px] w-[35px] rounded-full"
          />
        </div>

        <div className="text-content-1 flex items-center font-medium text-[16px]">
          Геннадий
        </div>

        <div className="absolute right-[15px] h-[15px] w-[15px]">
          <img src={minimenuroow} alt="roow" />
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
