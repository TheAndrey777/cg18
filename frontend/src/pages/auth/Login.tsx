import React from "react";
import { Button } from "../../components/button/Button";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { Input } from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/user";
import { setUsername, setPassword } from "../../redux/slices/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeUsername = (s: string) => {
    dispatch(setUsername(s));
  };
  const changePassword = (s: string) => {
    dispatch(setPassword(s));
  };

  const isAuthorised = useSelector((state: any) => state.user.isAuthorized);

  React.useEffect(() => {
    if (isAuthorised) navigate("/home");
  }, [isAuthorised]);
  console.log("auth", isAuthorised);
  const clickLogin = () => {
    dispatch(loginUser());

    if (isAuthorised) navigate("/home");
  };
  const clickNavigateRegister = () => {
    navigate("/auth/register");
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
            required
            label="Логин"
            radius="sm"
            className="w-[22rem]"
            onChange={changeUsername}
          />
          <Input
            required
            label="Пароль"
            type="password"
            radius="sm"
            className="w-[22rem] mt-[15px]"
            onChange={changePassword}
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
            onClick={clickNavigateRegister}
            text="Зарегистрироваться"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
