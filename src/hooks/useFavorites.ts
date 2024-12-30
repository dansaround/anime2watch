import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useFavorites = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  // Crear key dinámica basada en el user.id o usar 'default' si no hay usuario
  const storageKey = isSignedIn ? `favorites-${user?.id}` : "favorites-default";

  const [myFavorites = [], setMyFavorites] = useLocalStorage<number[]>(
    storageKey,
    []
  );

  const [localFavs, setLocalFavs] = useState<number[]>([]);

  // Actualizar localFavs cuando cambian los favoritos o el usuario
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalFavs(myFavorites);
    }
  }, [myFavorites, isSignedIn]);

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
