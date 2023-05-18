import React, { useEffect, useState } from "react";
import { useQuiz } from "../../../context/QuizContext";

function QuestionDetails() {
  const { quiz, setQuiz } = useQuiz();
  const [question, setQuestion] = useState({
    question: "",
    answer: "",
  });

  const addQuestion = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, question],
    }));
    setQuestion({question:"",answer:""})
  };

  return (
    <div className='flex flex-col gap-3 text-sm w-[250px]'>
      <div className='flex flex-col text-sm'>
        <label htmlFor='question'>Soru:</label>
        <input
          value={question.question}
          onChange={(e) =>
            setQuestion({ ...question, question: e.target.value })
          }
          className='focus:outline-none rounded p-1 text-black'
          id='question'
          type='text'
        />
      </div>
      <div className='flex flex-col text-sm'>
        <label htmlFor='answer'>Cevap:</label>
        <input
          value={question.answer}
          onChange={(e) => setQuestion({ ...question, answer: e.target.value })}
          className='focus:outline-none rounded p-1 text-black'
          id='answer'
          type='text'
        />
      </div>
      <button
        onClick={addQuestion}
        disabled={
          !(question.question && question.answer) || quiz.questions.length >= 20
        }
        className='rounded bg-transparent border border-gray-300  text-lg w-full hover:opacity-70 items-end disabled:opacity-40'
      >
        Ekle!
      </button>
      {(quiz.questions.length > 0 && (
        <div className='grid grid-cols-4 gap-2'>
          {quiz.questions.map((item, index) => (
            <span
              className='border text-center cursor-default'
              title={`Soru: ${item.question} Cevap: ${item.answer}`}
              key={index}
            >
              Soru {index + 1}
            </span>
          ))}
        </div>
      )) || (
        <span className='text-2xl text-red-600 text-center mt-5'>
          Eklenen soru yok!
        </span>
      )}
      {quiz.questions.length === 20 && (
        <span className='text-2xl text-red-600 text-center mt-5'>
          Sadece 20 adet soru ekleyebilirsiniz!
        </span>
      )}
    </div>
  );
}

export default QuestionDetails;
