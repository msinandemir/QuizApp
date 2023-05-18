import React from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

function Navbar({ showDeleteModal }) {
  return (
    <>
      <div className='border-b h-14'>
        <div className='mt-4 flex w-[1400px] ml-auto mr-auto  justify-between items-center'>
          <Link
            to='/'
            replace
            className='font-semibold text-xl select-none cursor-pointer'
          >
            Quiz App
          </Link>
          <SearchInput />
          <div className='flex gap-6'>
            <Link
              to='/quiz/create'
              className='border p-2 rounded-md font-normal bg-green-300  hover:opacity-70'
            >
              Quiz Oluştur
            </Link>
            <button
              onClick={showDeleteModal}
              className='border p-2 rounded-md font-normal border-red-500 hover:opacity-70'
            >
              Quiz Sil
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
