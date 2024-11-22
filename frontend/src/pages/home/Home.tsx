import React from "react";
import { cn } from "../../lib/cn";

const Home = () => {
  const [a, seta] = React.useState("");
  return (
    <div className="bg-default-100 bg-red-200 min-h-full w-full relative grid grid-cols-[auto_1fr] gap-[20px] p-[25px] box-border ">
      <div
        className={cn(
          "text-content-1 bg-layout-background w-[20rem] h-full transition-all ",
          a
        )}
        onClick={() => {
          seta("w-[40px]");
          if (a == "w-[40px]") seta("");
        }}
      >
        Типо меню
      </div>
      <div className="bg-green-300 w-full h-[2000px]"> asdf</div>
    </div>
  );
};

export default Home;
