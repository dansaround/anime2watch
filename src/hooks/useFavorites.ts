import { useEffect, useState } from "react";

import { useLocalStorage } from "usehooks-ts";

export const useFavorites = () => {
  const [myFavorites = [], setMyFavorites, removeValue] = useLocalStorage<
    number[]
  >("favorites", []);

  const [localFavs, setLocalFavs] = useState<number[]>([]);

  useEffect(() => {
    if (myFavorites.length) {
      setLocalFavs(myFavorites);
    }
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

  return { favs: localFavs, addFav, removeFav };
};
