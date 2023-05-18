import React from "react";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import CreateQuiz from "../pages/CreateQuiz";
import CategoryDetails from "../pages/CategoryDetails";
import QuizDetails from "../pages/QuizDetails";
import { Route, Routes, Navigate } from "react-router-dom";

function Index() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout children={<Home />} />} />
        <Route
          path='/quiz/create'
          element={<MainLayout children={<CreateQuiz />} />}
        />
        <Route
          path='/quiz/:quizId'
          element={<MainLayout children={<QuizDetails />} />}
        />
        <Route
          path='/category/:categoryId'
          element={<MainLayout children={<CategoryDetails />} />}
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default Index;
