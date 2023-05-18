import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { FiClipboard } from "react-icons/fi";
import { BsClipboard2Check } from "react-icons/bs";

function QuizLoading({ error, isFinished, quizId, deleteKey }) {
  const [copyed, setCopyed] = useState(false);

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(deleteKey);
    setCopyed(true);
  };
  return (
    <>
      {(isFinished && (
        <div className='flex justify-center items-center flex-col gap-4'>
          <span className='text-green-400 text-xl'>
            Quiz Başarıyla Oluşturuldu!
          </span>
          <div className=' flex flex-col items-center'>
            <span>Oluşturduğun quizi silmek için bu anahtarı kullan:</span>
            <div className='flex gap-1 mt-3 items-center'>
              <span className='font-bold'>{deleteKey}</span>
              {(!copyed && (
                <FiClipboard
                  onClick={handleCopyToClipboard}
                  className='cursor-pointer hover:opacity-70'
                  size={20}
                />
              )) || <BsClipboard2Check title="Anahtar kopyalandı!" size={20}/>}
            </div>
          </div>

          <Link
            to={`/quiz/${quizId}`}
            className='h-10 w-40 border border-gray-400 bg-transparent flex justify-center items-center text-lg hover:opacity-70'
          >
            Quize Git
          </Link>
        </div>
      )) ||
        (error?.error && (
          <div className='flex gap-4 flex-col justify-center items-center text-red-500 text-2xl'>
            {error.message.toUpperCase()}
            <Link
              to={"/"}
              className='bg-gray-300 h-10 w-40 hover:opacity-70 text-black rounded-lg flex justify-center items-center'
            >
              Ana Sayfa
            </Link>
          </div>
        )) || (
          <div className='flex justify-center items-center gap-4 flex-col'>
            <Spinner />
            <span>Quiz Oluşturuluyor...</span>
          </div>
        )}
    </>
  );
}

export default QuizLoading;
