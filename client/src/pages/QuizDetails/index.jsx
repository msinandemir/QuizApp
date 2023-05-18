import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../service/api";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import QuizResult from "./components/QuizResult";

function QuizDetails() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [resultDetails, setResultDetails] = useState({
    correct: 0,
    inCorrect: 0,
    pass: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuizById(quizId);
      setQuiz(res);
    };
    fetchData();
  }, [quizId]);
  return (
    <div className='h-[calc(100vh-336px)] ml-auto mr-auto w-[1400px] flex justify-center items-center'>
      {quiz && (
        <div className='bg-zinc-900 w-[600px] h-[300px] rounded-md'>
          {(isFinished && <QuizResult resultDetails={resultDetails} />) ||
            (!isStart && (
              <StartScreen quiz={quiz} setIsStart={setIsStart} />
            )) || (
              <QuizScreen
                quiz={quiz}
                resultDetails={resultDetails}
                setResultDetails={setResultDetails}
                setIsFinished={setIsFinished}
              />
            )}
        </div>
      )}
    </div>
  );
}

export default QuizDetails;
