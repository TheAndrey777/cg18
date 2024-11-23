import { Button } from "../../../components/button/Button";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { Input } from "../../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setUsername, setPassword } from "../../../redux/slices/user";
import React from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEmail = (s: string) => {
    dispatch(setEmail(s));
  };
  const changeUsername = (s: string) => {
    dispatch(setUsername(s));
  };
  const changePassword = (s: string) => {
    dispatch(setPassword(s));
  };

  const { username, email } = useSelector((state: any) => state.user);

  const [repeatPassword, setRepeatPassword] = React.useState<string>("");

  const isAuthorized = useSelector((state: any) => state.user.isAuthorized);

  React.useEffect(() => {
    if (isAuthorized) navigate("/home");
  }, [isAuthorized]);

  const clickRegister = () => {
    // dispatch(registerUser({ login: login, password: password, email: email }));
    // if (isAutorised) navigate("/home");
    navigate("complete");
  };
  const clickNavigateLogin = () => {
    navigate("/auth/login");
  };
  return (
    <div className="h-full w-full bg-default-100 flex items-center justify-center">
      <div className=" bg-layout-background w-[25rem] h-[38rem] rounded-[15px] box-border p-[25px] relative">
        <div className="text-content-1 w-full h-[3.125rem] text-[28px] font-bold text-center">
          Регистрация аккаунта
        </div>
        <div className="text-content-1  w-full h-[3.4375rem] text-[12px] text-center mt-[15px]">
          Для начала работы вам необходимо создать аккаунт. Заполните поля ниже
          и нажмите кнопку продолжить
        </div>

        <div className="mt-[15px]">
          <Input
            required
            label="Логин"
            radius="sm"
            className="w-[22rem]"
            onChange={changeUsername}
            defaultState={username}
          />
          <Input
            required
            label="Почта"
            type="email"
            radius="sm"
            className="w-[22rem] mt-[15px]"
            onChange={changeEmail}
            defaultState={email}
          />
          <Input
            required
            label="Пароль"
            type="password"
            radius="sm"
            className="w-[22rem] mt-[15px]"
            onChange={changePassword}
          />
          <Input
            required
            label="Повторите пароль"
            type="password"
            radius="sm"
            className="w-[22rem] mt-[15px]"
            onChange={setRepeatPassword}
          />

          <div className="relative">
            <Checkbox
              className="mt-[15px] z-10"
              onChange={(state: boolean) => {
                console.log(state);
              }}
            />
            <div className="text-[10px] absolute top-0 left-[35px] text-content-1">
              Нажимая «Создать аккаунт», вы соглашаетесь с Условиями
              обслуживания и Политикой конфиденциальности
            </div>
          </div>
        </div>

        <div className="w-[calc(100%-50px)] absolute bottom-0">
          <Button
            className="w-full mb-[8px]"
            size="lg"
            onClick={clickRegister}
            text="Продолжить"
          />
          <Button
            variant="bordered"
            color="default"
            className="w-full  mb-[25px]"
            size="lg"
            onClick={clickNavigateLogin}
            text="Вернуться ко входу"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
