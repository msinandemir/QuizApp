import React from "react";
import { useNavigate } from "react-router-dom";
function StartScreen({ quiz, setIsStart }) {

  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleStartQuiz = () => {
    setIsStart(true)
  }
  return (
    <div className='text-gray-300 flex flex-col justify-center items-center w-full h-full'>
      <span>
        <b className='text-lg'>{quiz.name}</b> İsimli quize başlamak istiyor
        musun?
      </span>
      <div className='flex gap-5 mt-4'>
        <button onClick={handleGoToHome} className='w-[100px] h-7 rounded-sm border border-gray-300 transition-all hover:text-black hover:bg-gray-300'>
          Hayır
        </button>
        <button onClick={handleStartQuiz} className='w-[100px] h-7 rounded-sm border border-gray-300 transition-all hover:text-black hover:bg-gray-300'>
          Evet
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
