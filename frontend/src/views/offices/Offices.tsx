import OfficeBlock from "../../components/blocks/officeBlock/OfficeBlock";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const Offices = () => {
  const navigate = useNavigate();
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
          onClick={() => {}}
          text="Фильтр"
        />
        <Button className="" onClick={() => {}} text="Добавить" />
      </div>
      <OfficeBlock />
      <OfficeBlock />
      <OfficeBlock />
      <OfficeBlock />
    </div>
  );
};

export default Offices;
