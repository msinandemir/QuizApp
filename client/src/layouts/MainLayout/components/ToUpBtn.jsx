import React from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

function Index() {
  const handleUpBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <BsFillArrowUpSquareFill
      onClick={() => handleUpBtn()}
      className="cursor-pointer hover:opacity-70  bottom-10 right-5 z-10 fixed"
      size={40}
    />
  );
}

export default Index;
