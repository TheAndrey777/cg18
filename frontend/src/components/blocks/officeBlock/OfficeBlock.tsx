import { Button } from "../../button/Button";
import { officeicon } from "../../../assets/png";
import React from "react";

import { worker1, worker2, worker3, worker4 } from "../../../assets/png";

interface WorkersProps {
  workers?: any[];
}
const Workers: React.FC<WorkersProps> = ({ workers }) => {
  return (
    <div className="h-[40px] w-[150px] bottom-[20px] left-[280px] absolute flex">
      {workers && workers.length > 4 ? (
        <>
          {workers.slice(0, 4).map((v: any, i: number) => (
            <div className="w-[20px] relative">
              <div className="h-full aspect-square absolute left-0 hover:left-[-10px] transition-all">
                <img
                  key={i}
                  className="h-full aspect-square rounded-full border-solid border-[1px] border-primary box-border  cursor-pointer"
                  src={v}
                  alt="logo"
                />
              </div>
            </div>
          ))}
          <div className="bg-default-400 h-[40px] w-[40px] z-10 rounded-full flex items-center justify-center  border-solid border-[1px] border-default box-border cursor-pointer pr-[2px]">
            +{Math.min(99, workers.length - 4)}
          </div>
        </>
      ) : (
        workers &&
        workers.map((v: any, i: number) => (
          <div className="w-[30px] relative">
            <div className="h-full aspect-square absolute left-0 transition-all">
              <img
                key={i}
                className="h-full aspect-square rounded-full border-solid border-[1px] border-primary box-border"
                src={v}
                alt="logo"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const OfficeBlock = () => {
  const workers = [worker1, worker2, worker3, worker4, worker1, worker2];
  return (
    <div className="bg-layout-background w-[650px] h-[220px] rounded-[15px] mb-[15px] relative flex">
      <div className="h-full w-[280px] flex items-center justify-center select-none">
        <img
          className="h-[180px] w-[240px] mx-[20px] rounded-[10px]"
          src={officeicon}
          alt="img"
        />
      </div>
      <div className="w-full box-border p-[20px] pl-0">
        <div className="text-content-1 font-medium text-[20px]">
          Рабовладельческое отделение №2
        </div>
        <div className="text-content-1 text-[12px] font-semibold">Адрес:</div>
        <div className="text-content-1 text-[12px] ml-[5px]">
          г. Таганрог, ул. И я кричу, остановите катку
        </div>
      </div>
      <Workers workers={workers} />
      <div className="absolute right-5 bottom-5">
        <Button
          text="Управление"
          size="md"
          onClick={() => console.log("123 click")}
        />
      </div>
    </div>
  );
};

export default OfficeBlock;