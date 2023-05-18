import React from "react";
import Slider from "./components/Slider";
import CategoryItem from "./components/CategoryItem";
import { useCategory } from "../../context/CategoryContext";

function Home() {
  const { categories } = useCategory();

  return (
    <div className='w-[1400px] ml-auto mr-auto '>
      <h1 className='text-lg font-bold border-b  w-full mt-10'>TRENDLER ⭐️</h1>

      <Slider />

      <div className='flex flex-col gap-5  mt-3'>
        {categories.map((category, index) => (
          <CategoryItem key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Home;
