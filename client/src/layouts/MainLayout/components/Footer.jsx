import React from "react";
import reactIcon from "../../../assets/images/ReactIcon.png";
import { Link } from "react-router-dom";
import { useCategory } from "../../../context/CategoryContext";

function Footer({ showDeleteModal }) {
  const { convertedCategories } = useCategory();
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <div className='h-56 bg-zinc-900 mt-10 '>
      <div className=' text-gray-400 flex flex-col mr-auto ml-auto w-[1400px] h-full'>
        <div className='flex mt-8  items-center '>
          <div>
            <Link
              onClick={handleScroll}
              to='/'
              replace
              className='font-semibold text-3xl select-none cursor-pointer text-white'
            >
              Quiz App
            </Link>
          </div>

          <div className='flex flex-1 justify-center gap-40'>
            <div>
              <h1 className='text-white text-sm font-semibold cursor-default'>
                Menü
              </h1>
              <ul>
                <li>
                  <Link
                    className='text-sm'
                    onClick={handleScroll}
                    to='/quiz/create'
                    replace
                  >
                    Quiz Oluştur
                  </Link>
                </li>
                <li>
                  <span
                    onClick={() => showDeleteModal(true)}
                    className='cursor-pointer text-sm'
                  >
                    Quiz Sil
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h1 className='cursor-default text-white text-sm font-bold'>
                Categoriler
              </h1>
              <ul className='flex flex-col'>
                {convertedCategories &&
                  convertedCategories.map((item, index) => (
                    <li key={index}>
                      <Link
                        className='text-sm'
                        onClick={handleScroll}
                        to={`/category/${item.id}`}
                        replace
                      >
                        {item.category}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='flex flex-1 mt-5  gap-3 items-center justify-center'>
          Made with ❤️ and
          <img className='w-6' src={reactIcon} alt='react icon' />
        </div>
      </div>
    </div>
  );
}

export default Footer;
