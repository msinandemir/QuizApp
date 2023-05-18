import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import ToUpBtn from "./components/toUpBtn";
import DelteQuizModal from "./components/deleteQuizModal";
import Footer from "./components/Footer";

function Index({ children }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [deleteQuizModal, setDeleteQuizModal] = useState(false);

  const handleShowDeleteModal = () => {
    setDeleteQuizModal(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      window.scrollY > 0 ? setShowTopBtn(true) : setShowTopBtn(false);
    });
  }, []);

  return (
    <>
      <Navbar showDeleteModal={handleShowDeleteModal} />
      {showTopBtn && <ToUpBtn />}

      {children}

      {deleteQuizModal && (
        <DelteQuizModal setDeleteQuizModal={setDeleteQuizModal} />
      )}
      <Footer showDeleteModal={handleShowDeleteModal} />
    </>
  );
}

export default Index;
