import React, { useEffect, useState } from "react";
import { useQuiz } from "../../../context/QuizContext";
import { useCategory } from "../../../context/CategoryContext";

function QuizDetails() {
  const { quiz, setQuiz } = useQuiz();
  const { categories } = useCategory();

  const handleSelectChange = (e) => {
    setQuiz({
      ...quiz,
      categoryId: e.target.value,
      category: e.target.options[e.target.selectedIndex].text,
    });
  };

  useEffect(() => {
    if (categories.length > 0) {
      const initCategory = categories[0];
      setQuiz({
        ...quiz,
        categoryId: initCategory.id,
        category: initCategory.category,
      });
    }
  }, [categories]);
  return (
    <div>
      <div className='flex flex-col gap-3 text-sm w-[250px]'>
        <div className='flex flex-col'>
          <label htmlFor='quiz-name'>Quiz adı: </label>
          <input
            className='focus:outline-none rounded p-1 text-black'
            maxLength={100}
            value={quiz.name}
            onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
            id='quiz-name'
            type='text'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='quiz-description'>Quiz açıklaması: </label>
          <textarea
            className='focus:outline-none rounded p-1 text-black resize-none h-32'
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            id='quiz-description'
            maxLength={255}
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='quiz-category'>Kategori:</label>
          <select
            className='focus:outline-none rounded p-1 text-black'
            value={quiz.cagegoryId}
            onChange={handleSelectChange}
            id='quiz-category'
          >
            {categories &&
              categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.category.split("")[0].toUpperCase() +
                    item.category.slice(1)}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default QuizDetails;
