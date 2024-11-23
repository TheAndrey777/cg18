import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/palette/theme-dark.css";
import "./styles/palette/theme-light.css";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
  </BrowserRouter>
);
