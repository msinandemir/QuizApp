import React, { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import QuizDetails from "./components/quizDetails";
import QuestionDetails from "./components/questionDetails";
import QuizView from "./components/quizView";
import { useQuiz } from "../../context/QuizContext";

function CreateQuiz() {
  const [formPage, setFromPage] = useState(1);
  const { quiz, setQuiz } = useQuiz();

  const [steps, setSteps] = useState([
    <QuizDetails />,
    <QuestionDetails />,
    <QuizView />,
  ]);

  const showStepComponent = () => {
    return steps[formPage - 1];
  };

  useEffect(() => {
    return () => {
      setQuiz({
        name: "",
        description: "",
        category: "Kategori",
        categoryId: 1,
        questions: [],
      });
    };
  }, []);

  return (
    <div className='w-full  h-[calc(100vh-72px)] flex flex-col  justify-center items-center'>
      <div className='w-[550px]'>
        <div className=' w-full bg-[#2e2e2e] h-[600px] rounded-lg shadow-lg relative'>
          <ProgressBar page={formPage} />
          <div className='text-gray-300 flex justify-center h-full items-center'>
            {showStepComponent()}
          </div>
        </div>
        <div className='flex w-full justify-between mt-5'>
          <button
            className='text-gray-300 bg-[#2e2e2e] rounded p-1 w-20 disabled:opacity-50 hover:opacity-70 flex gap-1 justify-center items-center text-lg'
            disabled={formPage === 1 ? true : false}
            onClick={() => (formPage > 1 ? setFromPage(formPage - 1) : null)}
          >
            <SlArrowLeft size={15} /> Geri
          </button>
          <button
            className='text-gray-300 bg-[#2e2e2e] rounded p-1 w-20 disabled:opacity-50 hover:opacity-70 flex gap-1 justify-center items-center text-lg'
            disabled={
              formPage === 3 ||
              quiz.name.trim() === "" ||
              quiz.description.trim() === ""
            }
            onClick={() => (formPage <= 3 ? setFromPage(formPage + 1) : null)}
          >
            İleri <SlArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
