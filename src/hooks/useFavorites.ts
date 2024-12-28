import { useEffect, useState } from "react";

import { useLocalStorage } from "usehooks-ts";

export const useFavorites = () => {
  const [myFavorites = [], setMyFavorites, removeValue] = useLocalStorage<
    number[]
  >("favorites", []);

  const [localFavs, setLocalFavs] = useState<number[]>([]);

  useEffect(() => {
    setLocalFavs(myFavorites);
  }, [myFavorites]);

  // add fav function
  const addFav = (id: number) => {
    if (!myFavorites.includes(id)) {
      setMyFavorites([...myFavorites, id]);
    }
  };

  const removeFav = (id: number) => {
    setMyFavorites(myFavorites.filter((fav) => fav !== id));
  };

  const handleFavorite = (id: number) => {
    if (!myFavorites.includes(id)) {
      addFav(id);
    } else {
      removeFav(id);
    }
  };

  return { favs: localFavs, addFav, removeFav, handleFavorite };
};
