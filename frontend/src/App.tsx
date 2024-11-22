import { Switch } from "./components/switch/Switch";
import Register from "./pages/auth/register";

const App = () => {
  return (
    <>
      <div className="fixed right-0 top-0">
        <Switch
          className=" fixed top-0 left-0 z-full"
          variant="theme"
          size="lg"
          onChange={(state: boolean) => {
            document.documentElement.setAttribute(
              "data-theme",
              state ? "dark" : "light"
            );
          }}
        />
      </div>
      <Register />
    </>
  );
};

export default App;
