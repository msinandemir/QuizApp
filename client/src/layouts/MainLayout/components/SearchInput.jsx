import React, { useEffect, useState } from "react";
import { searchQuiz } from "../../../service/api";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedQuizzes, setSearchedQuizzes] = useState();
  const [onFocus, setOnFocus] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleGoToQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
    // setSearchInput("");
  };

  useEffect(() => {
    if (searchInput.length < 3) return;
    const fetchData = async () => {
      const res = await searchQuiz(searchInput);
      setSearchedQuizzes(res);
    };
    fetchData();
  }, [searchInput]);
  return (
    <div
      onFocus={() => setOnFocus(true)}
      onBlur={() => setOnFocus(false)}
      className='relative '
    >
      <input
        onChange={handleOnChange}
        onFocus={() => setOnFocus(true)}
        value={searchInput}
        className='border p-2 w-[300px] focus:outline-none rounded-md '
        placeholder='Quiz ara...'
        type='text'
      />
      {searchInput.length > 0 && onFocus && (
        <div
          className='absolute  w-full bg-white border text-sm  z-10 rounded mt-1 '
          onMouseDown={(e) => e.preventDefault()}
        >
          {(searchInput.length < 3 && <span className="text-center block mt-2 mb-2">Yazama devam et...</span>) ||
            (searchedQuizzes && searchedQuizzes.length > 0 && (
              <div className='flex flex-col  '>
                {searchedQuizzes?.map((quiz, index) => (
                  <div
                    key={index}
                    onClick={() => handleGoToQuiz(quiz.id)}
                    className={`border-b p-2 cursor-pointer hover:bg-gray-100 h-[50px] flex items-center ${
                      index === 4 ? "border-b-0" : ""
                    }`}
                  >
                    {quiz.name}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
