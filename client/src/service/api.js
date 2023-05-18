import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCategories = async () => {
  try {
    const res = await axios.get(BASE_URL + "categories");
    return res.data;
  } catch (error) {
    throw new error("Kategoriler bulunamadı.");
  }
};

export const addQuiz = async (data) => {
  try {
    let newQuiz = JSON.stringify({
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
    });

    const res = await axios.post(BASE_URL + "quizzes", newQuiz, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    throw new error("Quiz oluşturulurken bir hata oluştu.");
  }
};

export const addQuestion = async ({ question, quizId }) => {
  try {
    let newQuestion = JSON.stringify({
      questionText: question.question,
      answer: question.answer,
      quizId: quizId,
    });

    const res = await axios.post(BASE_URL + "questions", newQuestion, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    throw new error("Soru oluşturulurken bir hata oluştu.");
  }
};

export const getTrends = async () => {
  try {
    const res = await axios.get(BASE_URL + "quizzes/trends");
    return res.data;
  } catch (error) {
    throw new error("Trendler bulunamadı.");
  }
};

export const getLastQuizzes = async (categoryId) => {
  try {
    const res = await axios.get(
      BASE_URL + `quizzes/last-quizzes/${categoryId}`
    );
    return res.data;
  } catch (error) {
    throw new error("Son kayıtlar bulunamadı.");
  }
};

export const getQuizzesByCategoryId = async (categoryId, pageNumber) => {
  try {
    const res = await axios.get(
      BASE_URL +
        `quizzes/getByCategoryId/${categoryId}?pageNumber=${pageNumber}`
    );
    return res.data;
  } catch (error) {
    throw new error("Quizler bulunamadı.");
  }
};

export const deleteQuiz = async (deleteKey) => {
  try {
    await axios.delete(BASE_URL + `quizzes?deleteKey=${deleteKey}`);
  } catch (error) {
    throw new error("Quiz silinemedi");
  }
};

export const findQuizByDeleteKey = async (deleteKey) => {
  try {
    const res = await axios.get(BASE_URL + `quizzes?deleteKey=${deleteKey}`);
    return res.data;
  } catch (error) {
    throw new error("Quiz bulunamadı");
  }
};

export const getQuizById = async (quizId) => {
  try {
    const res = await axios.get(BASE_URL + `quizzes/get-quiz-by-id/${quizId}`);
    return res.data;
  } catch (error) {
    throw new error("Quiz bulunamadı");
  }
};

export const incrementQuizPopularity = async (quizId) => {
  try {
    await axios.put(BASE_URL + `quizzes/${quizId}`);
  } catch (error) {
    throw new error("Quiz bulunamadı");
  }
};


export const searchQuiz = async (quizName) => {
  try {
    const res = await axios.get(BASE_URL + `quizzes/search-quiz?quizName=${quizName}`)
    return res.data
  } catch (error) {
    throw new error("Quiz bulunamadı")
  }
}