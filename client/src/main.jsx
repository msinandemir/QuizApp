import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/index.css";
import { QuizContextProvider } from "./context/QuizContext";
import { CategoryContextProvider } from "./context/CategoryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CategoryContextProvider>
    <QuizContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuizContextProvider>
  </CategoryContextProvider>
);
