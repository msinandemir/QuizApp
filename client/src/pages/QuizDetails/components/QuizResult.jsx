import React, { useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { incrementQuizPopularity } from "../../../service/api";


function QuizResult({ resultDetails }) {
  const {quizId} = useParams()
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    incrementQuizPopularity(quizId);
  }, []);
  return (
    <div className='text-gray-300 w-full h-full flex justify-center items-center'>
      <div className='flex flex-col gap-3'>
        <span>
          Doğru Cevap Sayısı:&nbsp;
          <span className='text-green-500'>{resultDetails.correct}</span>
        </span>
        <span>
          Yanlış Cevap Sayısı:&nbsp;
          <span className='text-red-600'>{resultDetails.inCorrect}</span>
        </span>
        <span>
          Pas Geçilen Sayısı:&nbsp;
          <span className='text-orange-500'>{resultDetails.pass}</span>
        </span>
        <button
          onClick={handleGoToHome}
          className='border border-gray-300 rounded p-1 hover:bg-slate-300 hover:text-black transition-all hover:opacity-70'
        >
          Ana Sayfa
        </button>
      </div>
    </div>
  );
}

export default QuizResult;
