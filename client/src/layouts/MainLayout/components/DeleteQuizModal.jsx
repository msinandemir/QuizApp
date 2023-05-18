import React, { useEffect, useState } from "react";
import { findQuizByDeleteKey, deleteQuiz } from "../../../service/api";

function DeleteQuizModal({ setDeleteQuizModal }) {
  const [quiz, setQuiz] = useState(null);
  const [confirm, setConfirm] = useState();
  const [deleteKey, setDeleteKey] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const closeModal = () => {
    setDeleteQuizModal(false);
  };

  const handleFindQuiz = async () => {
    const res = await findQuizByDeleteKey(deleteKey);
    setQuiz(res);
  };

  const handleDeleteQuiz = async () => {
    try {
      await deleteQuiz(deleteKey);
    } catch (error) {
      setError({
        error: true,
        message: "Quiz silinirken bir hata oluştu!",
      });
    } finally {
      if (!error.error) closeModal();
    }
  };

  useEffect(() => {
    if (confirm) {
      handleDeleteQuiz();
    }
  }, [confirm]);
  return (
    <>
      <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center'>
        <div className='w-[500px] min-h-[250px]  flex flex-col justify-center relative items-center gap-4 bg-[#2e2e2e] text-gray-300 p-5 rounded-xl z-50 opacity-100'>
          <span
            onClick={closeModal}
            className='absolute text-white top-3 right-3 cursor-pointer hover:opacity-70'
          >
            X
          </span>
          <div className='flex flex-col gap-1'>
            <label htmlFor='delete-key-input' className='text-sm'>
              Quiz silme anahtarı:
            </label>
            <input
              disabled={quiz}
              value={deleteKey}
              onChange={(e) => setDeleteKey(e.target.value)}
              id='delete-key-input'
              type='text'
              className='w-[320px] p-2 rounded-md focus:outline-none text-sm text-black'
            />
          </div>
          <button
            disabled={quiz || deleteKey === ""}
            onClick={handleFindQuiz}
            className='bg-slate-50 p-2 text-black hover:opacity-70 disabled:opacity-70 disabled:cursor-not-allowed rounded-md w-[200px] cursor-pointer'
          >
            Quizi Bul
          </button>

          {quiz && (
            <div className='flex flex-col gap-2 justify-center'>
              <span className='font-bold text-center'>{quiz.name}</span>

              <p className='text-sm'> isimli quizini silmek istiyor musun?</p>

              <div className='flex gap-4 justify-center text-white'>
                <button
                  onClick={() => {
                    setConfirm(true);
                  }}
                  className='p-1 rounded-sm bg-green-400 w-20 hover:opacity-70'
                >
                  Evet
                </button>
                <button
                  onClick={closeModal}
                  className='p-1 e rounded-sm bg-red-500 w-20 hover:opacity-70'
                >
                  Hayır
                </button>
              </div>
              {error?.error && (
                <div className='text-red-500 text-sm text-center'>
                  {error.message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DeleteQuizModal;
