import React, { useEffect, useState } from "react";
import { useQuiz } from "../../../context/QuizContext";
import { addQuiz, addQuestion, deleteQuiz } from "../../../service/api";
import QuizLoading from "./QuizLoading";

function QuizView() {
  const { quiz, setQuiz } = useQuiz();
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState();
  const [currentQuizDeleteKey, setCurrentQuizDeleteKey] = useState(null);
  const [quizId, setQuizId] = useState();

  useEffect(() => {
    console.log(quizId);
  }, [quizId]);
  const handleShareQuiz = async () => {
    try {
      setIsStart(true);
      const quizRes = await addQuiz(quiz);
      if (quizRes === null) return;
      setCurrentQuizDeleteKey(quizRes.deleteKey);
      setQuizId(quizRes.id);
      const id = quizRes.id;
      quiz.questions.map(async (question) => {
        await addQuestion({ question, quizId:id });
      });
      if (quizRes.id) {
        setIsFinished(true);
      }
    } catch (error) {
      setError({
        error: true,
        message: "Quiz oluşturulurken bir hata oluştu!",
      });
      if (currentQuizDeleteKey) {
        await deleteQuiz(currentQuizDeleteKey);
      }
    }
  };
  return (
    <>
      <div className='flex flex-col justify-center items-center  mt-10 gap-3 text-xs w-full p-4'>
        {(isStart && isFinished && (
          <QuizLoading
            quizId={quizId}
            deleteKey={currentQuizDeleteKey}
            error={error}
            isFinished={isFinished}
          />
        )) ||
          (quiz.questions.length === 0 && (
            <span className='text-xl text-red-600 text-center'>
              Quizi paylaşmak için en az 1 adet soru eklemeniz gerekir. Lütfen
              soru ekleme sayfasına gidin ve soru ekleyin!
            </span>
          )) || (
            <div>
              <div className='flex flex-col justify-center gap-5'>
                <div className='flex  items-center flex-col'>
                  <span className='text-xl font-semibold'>Quiz adı:</span>
                  <p
                    className='text-xs text-center'
                    style={{ wordBreak: "break-word" }}
                  >
                    {quiz.name}
                  </p>
                </div>

                <div className='flex  items-center flex-col'>
                  <span className='text-xl font-semibold'>
                    Quiz açıklaması:{" "}
                  </span>
                  <p
                    className='text-xs text-center'
                    style={{ wordBreak: "break-word" }}
                  >
                    {quiz.description}
                  </p>
                </div>

                <div className='flex  items-center flex-col'>
                  <span className='text-lg font-semibold'>Kategori: </span>
                  <span className='text-sm text-center'>{quiz.category}</span>
                </div>

                <div className='flex  items-center flex-col'>
                  <span className='text-xl font-semibold'>Soru adeti: </span>
                  <span className='text-xs text-center'>
                    {quiz.questions.length}
                  </span>
                </div>
              </div>
              <button
                onClick={handleShareQuiz}
                className='h-10 w-[250px] rounded-xl bg-slate-300 text-black text-lg mt-3 font-semibold hover:opacity-70 '
              >
                Quizi Paylaş
              </button>
            </div>
          )}
      </div>
    </>
  );
}

export default QuizView;
