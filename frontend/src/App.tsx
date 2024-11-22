import { Switch } from "./components/switch/Switch";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";

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
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
