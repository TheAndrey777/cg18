//import OfficeBlock from "../../components/blocks/officeBlock/OfficeBlock";
import { Button } from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { cn } from "../../lib/cn";
import { getOffice, inviteUser } from "../../redux/slices/offices";
import { Modal } from "../../components/navigation/modal/Modal";
import { Input } from "../../components/input/Input";
import { close } from "../../assets/svg";
import Spiner from "../../components/spiner/Spiner";
import { worker1, worker2, worker3, worker4 } from "../../assets/png";
import { getAllUsers } from "../../redux/slices/user";
import { setMenuActiveId } from "../../redux/slices/storage";

const Management = () => {
  const createStatus = useSelector((state: any) => state.office.add.status);
  const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const icons = [worker1, worker2, worker3, worker4];

  const { officeId } = useParams();
  const [active, setActive] = React.useState(0);
  const [activeValid, setActiveValid] = React.useState(0);

  const [username, setUsername] = React.useState("");

  const workers = useSelector((state: any) => state.office.offices).filter(
    (x: any) => x.id == officeId
  );

  const users = useSelector((state: any) => state.user.users);
  const offices = useSelector((state: any) => state.office.offices);
  const [validUsers, setValidUsers] = React.useState<any[]>([]);
  console.log(users);
  console.log("val", validUsers);

  React.useEffect(() => {
    dispatch(setMenuActiveId({ id: 1 }));
    dispatch(getOffice());
    dispatch(getAllUsers());
  }, []);

  React.useEffect(() => {
    if (username == "") setValidUsers(users);
    else setValidUsers(users.filter((s: any) => s.email.includes(username)));
  }, [username]);

  return (
    <>
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
              {}
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
            <Button
              className=""
              onClick={() => {
                setAddModalOpen(true);
                dispatch(getAllUsers());
              }}
              text="Добавить"
            />
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
                    key={i}
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

        <div className="bg-layout-background w-full h-full  rounded-[15px] text-content-1 flex justify-center relative">
          <div className="w-full h-full">
            <div className="text-content-1 m-[20px] mb-0">
              Ответственный за оборудование
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
                    Тип оборудования
                  </div>
                </div>

                {offices[0].floorplan.packObject.map((v: any, i: number) => (
                  <div
                    key={i}
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
                        src={icons[0]}
                        alt="logo"
                      />
                      {workers[0].workers[0].name +
                        " " +
                        workers[0].workers[0].surname}
                    </div>
                    <div className="h-[40px] w-full flex items-center  pl-[10px] box-border">
                      {v.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        backdrop="opaque"
        className=" overflow-hidden"
      >
        <div className=" w-[500px] h-[490px] bg-layout-background rounded-[15px] relative">
          {createStatus == "loading" && (
            <div className=" absolute h-full w-full flex items-center justify-center bg-layout-divider z-50">
              <Spiner />
            </div>
          )}
          <div
            className=" cursor-pointer absolute right-[15px] top-[15px] h-[25px] w-[25px] active:scale-[0.95] hover:scale-[1.15] transition-all duration-300 z-40 "
            onClick={() => setAddModalOpen(false)}
          >
            <img
              className=" cursor-pointerh-[25px] w-[25px]"
              src={close}
              alt="close"
              onClick={() => setAddModalOpen(false)}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full relative box-border px-[40px]">
              <div className="font-semibold text-[20px] text-content-1 pt-[30px] pb-[10px]  ">
                Добавление новых сотрудников
              </div>
              <div className="text-[14px] text-content-1  pb-[10px]  ">
                Найдите пользователя, которого хотите добавить в ваш офис, и
                нажмите на кнопку Пригласить
              </div>

              <div className="w-full h-[270px]  ">
                <Input
                  onChange={setUsername}
                  size="md"
                  radius="sm"
                  label="Почта пользователя"
                  className="mb-[10px]"
                />
                {validUsers &&
                  validUsers.slice(0, 5).map((v: any, i: number) => (
                    <div
                      key={i}
                      className={cn(
                        "grid grid-cols-[1fr_8fr_8fr] h-[40px] cursor-pointer hover:bg-default-100 hover:scale-[1.02] active:scale-[.98] transition-all text-content-1 rounded-[10px]",
                        activeValid == i && "bg-default-100"
                      )}
                      onClick={() => setActiveValid(i)}
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
                        {v.name}
                      </div>
                      <div className="h-[40px] w-full flex items-center  pl-[10px] box-border">
                        {v.email}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="w-[calc(100%-80px)] flex absolute  h-[75px] items-center justify-end">
                <Button
                  className="m-4"
                  size="md"
                  color="default"
                  onClick={() => setAddModalOpen(false)}
                  text="Отмена"
                />
                <Button
                  size="md"
                  disabled={createStatus == "loading"}
                  onClick={() => {
                    if (activeValid < validUsers.length)
                      dispatch(
                        inviteUser({
                          officeId: officeId,
                          userId: validUsers[activeValid].id,
                        })
                      );
                  }}
                  text="Пригласить"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Management;
