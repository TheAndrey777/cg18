//import OfficeBlock from "../../components/blocks/officeBlock/OfficeBlock";
import { Button } from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { cn } from "../../lib/cn";
import { getOffice } from "../../redux/slices/offices";

import { worker1, worker2, worker3, worker4 } from "../../assets/png";

const Management = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const icons = [worker1, worker2, worker3, worker4];

  const { officeId } = useParams();
  const [active, setActive] = React.useState(0);

  const workers = useSelector((state: any) => state.office.offices).filter(
    (x: any) => x.id == officeId
  );

  React.useEffect(() => {
    dispatch(getOffice());
  }, []);

  return (
    <div className="w-full h-full rounded-[15px] grid grid-cols-[600px_1fr] gap-3">
      <div className="w-full h-full bg-layout-background rounded-[15px] box-border pt-[10px]">
        <div className="flex h-[70px] items-end justify-end box-border px-[20px] relative">
          <div className=" absolute top-0 left-0 px-[20px] box-border h-full w-full 1bg-red-400">
            <div className="text-content-1 font-semibold text-[22px]">
              Деловой оазис (офис в центре Таганрога)
            </div>
            <div className="text-content-1 w-[50%] text-[14px] leading-4 mt-[5px]">
              Данная вкладка позволяет вам легко управлять персоналом вашего
              офиса
            </div>
          </div>
          <Button
            color="default"
            onClick={() => {
              navigate("/home/offices");
            }}
            text="Назад"
          />
          <Button
            color="default"
            className="px-[10px]"
            onClick={() => {}}
            text="Фильтр"
          />
          <Button className="" onClick={() => {}} text="Добавить" />
        </div>
        <div className="w-full text-content-1">
          <div className="p-[20px]">
            <div className="grid grid-cols-[1fr_4fr_4fr] h-[50px] rounded-[10px] bg-default-100 mb-[10px] select-none">
              <div className="h-full w-full flex items-center justify-center text-content-1">
                #
              </div>
              <div className="h-full w-full flex items-center pl-[10px] box-border text-content-1">
                Имя сотрудника
              </div>
              <div className="h-full w-full flex items-center  pl-[10px] box-border text-content-1">
                Почта
              </div>
            </div>

            {workers[0] &&
              workers[0].workers &&
              workers[0].workers.map((v: any, i: number) => (
                <div
                  className={cn(
                    "grid grid-cols-[1fr_4fr_4fr] h-[40px] cursor-pointer hover:bg-default-100 hover:scale-[1.02] active:scale-[.98] transition-all text-content-1 rounded-[10px]",
                    active == i && "bg-default-100"
                  )}
                  onClick={() => setActive(i)}
                >
                  <div className="h-[40px] w-full flex items-center justify-center ">
                    {i + 1}
                  </div>
                  <div className="h-[40px] w-full flex items-center pl-[10px] box-border">
                    <img
                      className=" select-none h-[30px] w-[30px] rounded-full border-solid border-[2px] border-primary box-border m-[5px] mr-[10px]"
                      src={icons[i % 4]}
                      alt="logo"
                    />
                    {v.name + " " + v.surname}
                  </div>
                  <div className="h-[40px] w-full flex items-center  pl-[10px] box-border">
                    {v.email}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-layout-background w-full h-full  rounded-[15px] text-content-1 flex items-center justify-center">
        <div className="w-[300px]">
          Тут для сотрудника отрисуем информацию, где находится, что за ним
          закрепленно и тд
        </div>
      </div>
    </div>
  );
};

export default Management;
