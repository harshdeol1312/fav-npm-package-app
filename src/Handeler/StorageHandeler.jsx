//StoragHandeler
export const getRes = () => {
  return JSON.parse(localStorage.getItem('results')) || [];
};

export const setRes = (results) => {
  localStorage.setItem('results', JSON.stringify(results));
};


export const getFav = () => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return storedFavorites;
};

export const setFav = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
