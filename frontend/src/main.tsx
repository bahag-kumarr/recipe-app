import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import MyRouter from "./MyRouter.tsx";
import { RecipeProvider } from "./context/RecipeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <RecipeProvider>
    <BrowserRouter>
        <MyRouter />
    </BrowserRouter>
  </RecipeProvider>,
);
