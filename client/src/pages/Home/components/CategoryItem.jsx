import React, { useState, useEffect } from "react";
import QuizItem from "../../../components/QuizItem";
import { Link } from "react-router-dom";
import { getLastQuizzes } from "../../../service/api";

function CategoryItem({ category }) {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLastQuizzes(category.id);
      setQuizzes(data);
    };
    fetchData();
  }, []);
  return (
    <div className=' w-[1400px]'>
      <div className='flex border-b'>
        <h1 className='text-lg font-bold w-full mt-10 '>
          {category.category.toUpperCase()}
        </h1>
        <Link
          to={`/category/${category.id}`}
          className='flex-1 whitespace-nowrap text-base font-bold w-full mt-10 text-blue-400'
        >
          Daha Fazlasını Gör...
        </Link>
      </div>
      <div className='flex gap-20 mt-4 justify-center'>
        {quizzes &&
          quizzes.map((item, index) => <QuizItem key={index} quiz={item} />)}
      </div>
    </div>
  );
}

export default CategoryItem;
