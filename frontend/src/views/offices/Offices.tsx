import React from "react";
import OfficeBlock from "../../components/blocks/officeBlock/OfficeBlock";
import { Button } from "../../components/button/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  createOffice,
  getOffice,
  setAddStatus,
} from "../../redux/slices/offices";
import { Modal } from "../../components/navigation/modal/Modal";
import { close } from "../../assets/svg";
import { Input } from "../../components/input/Input";
import Spiner from "../../components/spiner/Spiner";
import { setMenuActiveId } from "../../redux/slices/storage";
//import { useNavigate } from "react-router-dom";

const Offices = () => {
  const dispatch = useDispatch();
  //dispatch(loginUser({ login: "123", password: "pas" }));
  const offices = useSelector((state: any) => state.office.offices);
  const createStatus = useSelector((state: any) => state.office.add.status);

  const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);
  console.log(createStatus);
  //const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(setMenuActiveId({ id: 1 }));
    dispatch(getOffice());
  }, []);

  React.useEffect(() => {
    if (createStatus == "loaded") {
      setAddModalOpen(false);
      dispatch(getOffice());
      dispatch(setAddStatus("none"));
    }
  }, [createStatus]);

  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");

  return (
    <div className="w-full h-full">
      <div className="flex h-[70px] w-[650px] items-end justify-end box-border px-[20px] relative mb-[20px]">
        <div className=" absolute top-0 left-0 px-[20px] box-border h-full w-full 1bg-red-400">
          <div className="text-content-1 font-semibold text-[22px]">
            Управление офисами
          </div>
          <div className="text-content-1 w-[60%] text-[14px] leading-4 mt-[5px]">
            Здесь представленны все ваши офисы. Выберите один и продолжите
            настройку в нем.
          </div>
        </div>

        <Button
          color="default"
          className="px-[10px]"
          onClick={() => {
            setAddModalOpen(true);
          }}
          text="Фильтр"
        />
        <Button
          className=""
          onClick={() => {
            setAddModalOpen(true);
          }}
          text="Добавить"
        />
      </div>

      {offices &&
        offices.map((v: any, i: number) => (
          <OfficeBlock
            key={i}
            id={v.id}
            title={v.name}
            address={v.address}
            workers={v.workers}
          />
        ))}

      <Modal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        backdrop="opaque"
        className=" overflow-hidden"
      >
        <div className="h-[350px] w-[500px] bg-layout-background rounded-[15px] relative">
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
                Создание офиса
              </div>
              <div className="text-[14px] text-content-1  pb-[10px]  ">
                Для создания офиса необходимо указать его адрес и название.
              </div>
              <Input
                required
                label="Название"
                radius="sm"
                size="md"
                className="w-full mt-[15px]"
                onChange={setName}
              />
              <Input
                required
                label="Адрес"
                radius="sm"
                size="md"
                className="w-full mt-[15px]"
                onChange={setAddress}
              />
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
                    dispatch(createOffice({ name: name, address: address }));
                  }}
                  text="Создать"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Offices;
