export const convertCategoryName = (categories) => {
  const pattern = /\S+/;
  const converted = [];

  for (let category of categories) {
    let match = category.category.match(pattern);
    converted.push({
      ...category,
      category: match[0].split("")[0].toUpperCase() + match[0].slice(1),
    });
  }

  return converted;
};
