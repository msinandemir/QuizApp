import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizzesByCategoryId } from "../../service/api";
import QuizItem from "../../components/QuizItem";
import Paginator from "./components/Paginator";
function CategoryDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLastPage, setIsLastPage] = useState(null);
  const [isFirstPage, setIsFirstPage] = useState(null)
  const [totalPage, setTotalPage] = useState(0);
  const { categoryId } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuizzesByCategoryId(categoryId, pageNumber);
      setData(res);
      setIsLastPage(res.last);
      setIsFirstPage(res.first);
      setTotalPage(res.totalPages);
      setLoading(false);
    };

    fetchData();
  }, [categoryId, pageNumber]);

  return (
    <div className='w-[1700px] min-h-[calc(100vh-244px)] ml-auto mr-auto'>
      {(loading && <span>Yükleniyor...</span>) || (
        <div>
          <span className='mt-10 border-b text-lg font-bold block'>
            {`İşte ${data.content[0].category.category} Kategorisindeki Tüm Quizler`.toUpperCase()}
          </span>
          <div className='grid grid-cols-4 gap-10 mt-5'>
            {data.content.map((item, index) => (
              <QuizItem key={index} quiz={item} />
            ))}
          </div>
        </div>
      )}

      <Paginator
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isLastPage={isLastPage}
        totalPage={totalPage}
        isFirstPage={isFirstPage}
      />
    </div>
  );
}

export default CategoryDetails;
