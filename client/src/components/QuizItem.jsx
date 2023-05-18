import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

function QuizItem({ quiz }) {
  return (
    <div className='bg-gray-200 p-2 rounded-md shadow-2xl min-w-[400px] min-h-[200px] flex flex-col justify-center'>
      <h1 className='font-bold tracking-wider'>{quiz.name}</h1>
      <p className='text-sm'>{quiz.description}</p>
      <div className='flex justify-end mt-4 '>
        <div className='h-7 overflow-hidden inline-block border rounded-md border-black'>
          <Link
            to={`/quiz/${quiz.id}`}
            style={{ transition: "all 300ms" }}
            className=' top-0 w-[130px]  text-sm font-semibold h-7 flex justify-center relative items-center hover:-top-7 after:content-["QUIZE_GİT"] after:absolute after:top-7 after:bg-black after:w-full after:h-7  after:flex after:items-center  after:justify-center after:text-gray-200'
          >
            <SlArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuizItem;
