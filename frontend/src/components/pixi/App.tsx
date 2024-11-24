import { Stage, useApp } from "@pixi/react";
import { Grid, startDFS } from "./Grid";
import React, { useRef, useEffect } from "react";
import { Application, Container, Graphics } from "pixi.js";
import KeyBoard from "../../keyboard/keyboard";
import { ContextMenu } from "../navigation/context/ContextMenu";
import { Modal } from "../navigation/modal/Modal";
import { useDispatch, useSelector } from "react-redux";

import Spiner from "../spiner/Spiner";
import { close } from "../../assets/svg";
import { Input } from "../input/Input";
import { Button } from "../button/Button";

interface Props {}

function PixiApplication(props: Props) {
  const {} = props;

  const width = window.innerWidth / 1.5;
  const height = window.innerWidth / 1.5;
  const ref = useRef(null);

  const [open, setOpen] = React.useState(false);
  const [positionX, setPositionX] = React.useState(0);
  const [positionY, setPositionY] = React.useState(0);
  const [name, setName] = React.useState("");
  const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  // const packet = useSelector((state: any) => state!.packet);
  // packet.send

  useEffect(() => {
    // On first render create our application
    const app = new Application({
      width: width,
      height: height,
      backgroundColor: 0x5bba6f,
      antialias: true,
      autoDensity: true,
      resolution: 2,
    });

    // @ts-ignore
    ref.current!.appendChild(app.view);

    const grid = new Grid(width, height, 40, app, dispatch);
    grid.setHooks(setOpen, setPositionX, setPositionY);
    app.stage.addChild(grid);
    ``;

    app.ticker.add((time) => {
      grid.onTimer();
      KeyBoard.onTimer();
    }, 15);

    app.start();

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        // setPositionX(e.pageX);
        // setPositionY(e.pageY);
        // setOpen(true);
      }}
    >
      <div ref={ref} />

      <Modal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        backdrop="opaque"
        className=" overflow-hidden"
      >
        <div className="h-[350px] w-[500px] bg-layout-background rounded-[15px] relative">
          <div
            className=" cursor-pointer absolute right-[15px] top-[15px] h-[25px] w-[25px] active:scale-[0.95] hover:scale-[1.15] transition-all duration-300 z-40 "
            onClick={() => {
              setAddModalOpen(false);
            }}
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

              <div className="w-[calc(100%-80px)] flex absolute  h-[75px] items-center justify-end">
                <Button
                  size="md"
                  onClick={() => {
                    startDFS(name);
                    setAddModalOpen(false);
                  }}
                  text="Создать"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <ContextMenu
        open={open}
        onOpenChange={setOpen}
        positionX={positionX}
        positionY={positionY}
      >
        <div className=" bg-layout-background rounded-[10px] h-fit w-[160px] border-solid border-[1px] border-default-300 p-[5px]">
          <div className="text-center  leading-5">
            Хотите создать новый регион?
          </div>
          <div className="grid grid-cols-2 gap-3 h-[40px] w-full place-items-center">
            <div
              className="flex items-center justify-center w-[60px] bg-default-200 rounded-[8px] cursor-pointer h-[35px] hover:scale-[1.03] transition-all  active:scale-95"
              onClick={() => {
                console.log("YES");
                setOpen(false);
                setAddModalOpen(true);
              }}
            >
              Да
            </div>
            <div
              className="flex items-center justify-center w-[60px] bg-default-200  rounded-[8px] cursor-pointer h-[35px] hover:scale-[1.03] transition-all active:scale-95"
              onClick={() => {
                console.log("NO");
                setOpen(false);
              }}
            >
              Нет
            </div>
          </div>
        </div>
      </ContextMenu>
    </div>
  );
}

export default PixiApplication;
