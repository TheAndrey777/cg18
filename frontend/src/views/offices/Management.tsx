import OfficeBlock from "../../components/blocks/officeBlock/OfficeBlock";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const Management = () => {
  const navigate = useNavigate();

  const items = [
    { id: 1234567890, name: "Джон Смит", email: "johnsmith@mail.ru" },
    {
      id: 6543210987,
      name: "Давид Миллер",
      email: "davidmiller@bk.ru",
    },
    {
      id: 5432109876,
      name: "Роман Долгопрудов",
      email: "emilytaylor@gmail.com",
    },
    {
      id: 4321098765,
      name: "Денис Власов",
      email: "robertjohnson@yahoo.com",
    },
    {
      id: 3210987654,
      name: "Катя Зернистая",
      email: "kateroberts@outlook.com",
    },
    {
      id: 2109876543,
      name: "Иван Андреев",
      email: "jameswilson@aol.com",
    },
    {
      id: 1098765432,
      name: "Семен Буков",
      email: "lisathomas@protonmail.com",
    },
    {
      id: 9876543210,
      name: "Мэри Джонс",
      email: "maryjones@yandex.ru",
    },
    {
      id: 7654321098,
      name: "Питер Браун",
      email: "peterbrown@internet.ru",
    },
    {
      id: 8765432109,
      name: "Сара Уильямс",
      email: "sarahwilliams@inbox.ru",
    },
  ];

  return (
    <div className="w-full h-full bg-layout-background rounded-[15px]">
      {" "}
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
    </div>
  );
};

export default Management;
