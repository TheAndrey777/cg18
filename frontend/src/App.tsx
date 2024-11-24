import { Switch } from "./components/switch/Switch";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/register/Register";
import CompleteRegister from "./pages/auth/register/CompleteRegister";
import ProtectedRoute from "./lib/ProtectedRoute";
const App = () => {
  return (
    <>
      <Switch
        className="fixed right-0 bottom-0 z-50  "
        variant="theme"
        size="lg"
        onChange={(state: boolean) => {
          document.documentElement.setAttribute(
            "data-theme",
            state ? "dark" : "light"
          );
        }}
      />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/register/complete" element={<CompleteRegister />} />
        <Route
          path="/home/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
