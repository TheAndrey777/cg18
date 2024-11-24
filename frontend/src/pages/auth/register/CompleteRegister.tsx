import React from "react";
import { Input } from "../../../components/input/Input";
import { Button } from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName, setSurname, registerUser } from "../../../redux/slices/user";

export const CompleteRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: any) => state.user.isAuthorized);

  const goBack = () => navigate("/auth/register");

  const completeRegister = () => {
    dispatch(registerUser());
    if (isAuthorized) navigate("/home");
    //navigate("/home");
  };

  const changeSurname = (s: string) => {
    dispatch(setSurname(s));
  };

  const changeName = (s: string) => {
    dispatch(setName(s));
  };

  React.useEffect(() => {
    if (isAuthorized) navigate("/home");
  }, [isAuthorized]);

  return (
    <div className="h-full w-full bg-default-100 flex items-center justify-center">
      <div className=" bg-layout-background w-[25rem] h-[29rem] rounded-[15px] box-border p-[25px] relative">
        <div className="text-content-1 w-full h-[3.125rem] text-[28px] font-bold text-center">
          Последний шаг
        </div>
        <div className="text-content-1  w-full h-[3.4375rem] text-[12px] text-center mt-[15px]">
          Для завершения регистрации введите фамилию и имя сотрудника.
        </div>

        <div className="mt-[15px]">
          <Input
            required
            label="Фамилия"
            radius="sm"
            className="w-[22rem]"
            onChange={changeSurname}
          />
          <Input
            required
            label="Имя"
            radius="sm"
            className="w-[22rem] mt-[15px]"
            onChange={changeName}
          />

          <div className="w-[calc(100%-50px)] absolute bottom-0">
            <Button
              className="w-full mb-[8px]"
              size="lg"
              onClick={completeRegister}
              text="Зарегистрировать аккаунт"
            />
            <Button
              variant="bordered"
              color="default"
              className="w-full  mb-[25px]"
              size="lg"
              onClick={goBack}
              text="Назад"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegister;
