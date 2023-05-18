import React, { useEffect, useState } from "react";

function QuizScreen({ quiz, setResultDetails, resultDetails, setIsFinished }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const handleOnChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerTheQuestion = () => {
    const currentQuesitonsAnswer = quiz.questions[currentQuestionIndex].answer;
    if (currentQuesitonsAnswer === answer) {
      setResultDetails({
        ...resultDetails,
        correct: resultDetails.correct + 1,
      });
    } else {
      setResultDetails({
        ...resultDetails,
        inCorrect: resultDetails.inCorrect + 1,
      });
    }

    setAnswer("");
    setCurrentQuestionIndex(Number(currentQuestionIndex + 1));
    if (currentQuestionIndex + 1 >= quiz.questions.length) {
      setIsFinished(true);
      return;
    }
  };

  const handlePass = () => {
    setResultDetails({
      ...resultDetails,
      pass: Number(resultDetails.pass + 1),
    });
    setAnswer("");
    setCurrentQuestionIndex(Number(currentQuestionIndex + 1));
    if (currentQuestionIndex + 1 >= quiz.questions.length) {
      setIsFinished(true);
      return;
    }
  };
  return (
    <div className='flex flex-col gap-10 text-gray-300 '>
      <div className='flex items-center justify-center mt-4 relative'>
        <span className='text-center block  font-semibold text-lg'>
          {quiz.name.toUpperCase()}
        </span>
        <span className=' absolute right-0 w-12 h-12 flex justify-center items-center mr-5  text-sm rounded-full border border-gray-300'>
          <b>{currentQuestionIndex + 1}</b>/<b>{quiz.questions.length}</b>
        </span>
      </div>
      <div className='flex flex-col justify-center items-center gap-5'>
        <span className=''>
          Soru:&nbsp;{quiz.questions[Number(currentQuestionIndex)].questionText}
        </span>
        <input
          onChange={handleOnChange}
          value={answer}
          type='text'
          placeholder='Cevap...'
          className='bg-transparent border border-gray-300 rounded-md p-2'
        />
        <div className='flex gap-5'>
          <button
            onClick={handlePass}
            className='border rounded-full w-20 h-20 hover:opacity-70 text-black bg-orange-400 border-orange-400 font-bold'
          >
            Pas Geç
          </button>
          <button
            disabled={answer.length < 1}
            onClick={handleAnswerTheQuestion}
            className='border rounded-full w-20 h-20 hover:opacity-70 text-black border-green-500 bg-green-500 font-bold disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizScreen;
