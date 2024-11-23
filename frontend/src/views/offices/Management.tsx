import OfficeBlock from "../../components/blocks/officeBlock/OfficeBlock";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { cn } from "../../lib/cn";

import { worker1, worker2, worker3, worker4 } from "../../assets/png";

const Management = () => {
  const navigate = useNavigate();

  const [active, setActive] = React.useState(0);

  const items = [
    {
      id: 1234567890,
      name: "Джон Смит",
      icon: worker1,
      email: "johnsmith@mail.ru",
    },
    {
      id: 6543210987,
      name: "Давид Миллер",
      icon: worker1,
      email: "davidmiller@bk.ru",
    },
    {
      id: 5432109876,
      name: "Роман Долгопрудов",
      icon: worker4,
      email: "emilytaylor@gmail.com",
    },
    {
      id: 4321098765,
      name: "Денис Власов",
      icon: worker3,
      email: "robertjohnson@yahoo.com",
    },
    {
      id: 3210987654,
      name: "Катя Зернистая",
      icon: worker2,
      email: "kateroberts@outlook.com",
    },
    {
      id: 2109876543,
      name: "Иван Андреев",
      icon: worker4,
      email: "jameswilson@aol.com",
    },
    {
      id: 1098765432,
      name: "Семен Буков",
      icon: worker4,
      email: "lisathomas@protonmail.com",
    },
    {
      id: 9876543210,
      name: "Мэри Джонс",
      icon: worker3,
      email: "maryjones@yandex.ru",
    },
    {
      id: 7654321098,
      name: "Питер Браун",
      icon: worker4,
      email: "peterbrown@internet.ru",
    },
    {
      id: 1098765432,
      name: "Семен Буков",
      icon: worker1,
      email: "lisathomas@protonmail.com",
    },
    {
      id: 9876543210,
      name: "Мэри Джонс",
      icon: worker3,
      email: "maryjones@yandex.ru",
    },
    {
      id: 1098765432,
      name: "Семен Буков",
      icon: worker1,
      email: "lisathomas@protonmail.com",
    },
    {
      id: 9876543210,
      name: "Мэри Джонс",
      icon: worker4,
      email: "maryjones@yandex.ru",
    },
    {
      id: 8765432109,
      name: "Сара Уильямс",
      icon: worker1,
      email: "sarahwilliams@inbox.ru",
    },
  ];

  return (
    <div className="w-full h-fullrounded-[15px]">
      <div className="w-[600px] h-full  bg-layout-background rounded-[15px]">
        <div className="flex">
          <Button
            color="default"
            variant="bordered"
            onClick={() => {
              navigate("/home/offices");
            }}
            text="Назад"
          />
          <Button
            color="default"
            variant="bordered"
            className="px-[10px]"
            onClick={() => {}}
            text="Фильтер"
          />
        </div>
        Управление сотрудниками в офисе
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

            {items &&
              items.map((v: any, i: number) => (
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
                      src={v.icon}
                      alt="logo"
                    />
                    {v.name}
                  </div>
                  <div className="h-[40px] w-full flex items-center  pl-[10px] box-border">
                    {v.email}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
