import React from "react";
import { Button } from "../../components/button/Button";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { Input } from "../../components/input/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const clickLogin = () => {
    dispatch(loginUser({ login: login, password: password }));
  };
  return (
    <div className="h-full w-full bg-default-100 flex items-center justify-center">
      <div className=" bg-layout-background w-[25rem] h-[34.375rem] rounded-[15px] box-border p-[25px] relative">
        <div className="text-content-1 w-full h-[3.125rem] text-[28px] font-bold text-center">
          Вход в аккаунт
        </div>
        <div className="text-content-1  w-full h-[3.4375rem] text-[12px] text-center mt-[15px]">
          Для начала работы вам необходимо войти в аккаунт. Заполните поля ниже
          и нажмите кнопку войти
        </div>

        <div className="mt-[15px]">
          <Input
            label="Логин"
            radius="sm"
            className="w-[22rem]"
            onChange={setLogin}
          />
          <Input
            label="Пароль"
            type="password"
            radius="sm"
            className="w-[22rem] mt-[15px]"
            onChange={setPassword}
          />

          <Checkbox
            className="mt-[15px]"
            label="Сохранить вход"
            onChange={(state: boolean) => console.log(state)}
          />
        </div>

        <div className="w-[calc(100%-50px)] absolute bottom-0">
          <Button
            className="w-full mb-[8px]"
            size="lg"
            onClick={clickLogin}
            text="Войти"
          />
          <Button
            variant="bordered"
            color="default"
            className="w-full  mb-[25px]"
            size="lg"
            onClick={() => {
              console.log("Click");
            }}
            text="Зарегистрироваться"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
