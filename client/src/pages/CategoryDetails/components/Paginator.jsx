import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function Paginator({
  pageNumber,
  setPageNumber,
  isLastPage,
  totalPage,
  isFirstPage,
}) {
  const handleIncreasePageNumber = () => {
    setPageNumber(Number(pageNumber + 1));
  };
  const handleDecreasePageNumber = () => {
    setPageNumber(Number(pageNumber - 1));
  };

  const handleGoToFirstPage = () => {
    setPageNumber(0);
  };
  const handleGoToLastPage = () => {
    setPageNumber(totalPage - 1);
  };
  return (
    <div className='justify-center flex mt-5 items-center gap-2'>
      <button disabled={isFirstPage} onClick={handleDecreasePageNumber}>
        {" "}
        <SlArrowLeft />
      </button>
      {(isFirstPage && (
        <span className='bg-blue-400 text-white  w-5 h-5 flex justify-center items-center cursor-default'>
          {pageNumber + 1}
        </span>
      )) || (
        <>
          <span onClick={handleGoToFirstPage} className='border border-blue-400 flex justify-center items-center cursor-pointer hover:bg-blue-400 hover:text-white w-5 h-5'>
            1
          </span>
          <span>...</span>
          <span className='bg-blue-400 text-white  w-5 h-5 flex justify-center items-center cursor-default'>
            {pageNumber + 1}
          </span>
        </>
      )}{" "}
      {!isLastPage && (
        <>
          <span>...</span>
          <span onClick={handleGoToLastPage} className='border border-blue-400 flex justify-center items-center cursor-pointer hover:bg-blue-400 hover:text-white w-5 h-5'>
            {totalPage}
          </span>
        </>
      )}
      <button disabled={isLastPage} onClick={handleIncreasePageNumber}>
        {" "}
        <SlArrowRight />
      </button>
    </div>
  );
}

export default Paginator;
