import { useContext, createContext, useState } from "react";

const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const intialValue = {
    name: "",
    description: "",
    category: "",
    categoryId: null,
    questions: [],
  };
  const [quiz, setQuiz] = useState(intialValue);
  const values = { quiz, setQuiz };
  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const quiz = useContext(QuizContext);
  return quiz;
};
