import React, { useContext, createContext, useState, useEffect } from "react";
import { convertCategoryName } from "../helper/regex";
import { getCategories } from "../service/api";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [convertedCategories, setConvertedCategories] = useState([]);
  const values = { categories, convertedCategories };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data)
      const convertedCategory = convertCategoryName(data);
      setConvertedCategories(convertedCategory);
    };

    fetchData();
  }, []);

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const category = useContext(CategoryContext);
  return category;
};
