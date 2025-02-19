import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/app/store";

import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <CookiesProvider defaultSetOptions={{ path:'/' }}>

    <Provider store={store}>

      <App />
    </Provider>
    </CookiesProvider>
  </BrowserRouter>,
);
