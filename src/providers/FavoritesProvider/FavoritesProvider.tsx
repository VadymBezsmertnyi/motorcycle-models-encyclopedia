import React, {
  useMemo,
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";
import { MotorcycleType } from "../MotorcyclesProvider/MotorcyclesProvider.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { motorcyclesContext } from "../MotorcyclesProvider/MotorcyclesProvider";

type FavoritesContext = {
  favorites: MotorcycleType[];
  setFavorite: (id: number) => Promise<void>;
};

type FavoritesProviderProps = {
  children?: React.ReactNode;
};

const KEY_STORAGE_FAVORITES_IDS = "KEY_STORAGE_FAVORITES_IDS";

export const favoritesContext = React.createContext({} as FavoritesContext);

export const FavoritesProvider: FunctionComponent<FavoritesProviderProps> = ({
  children,
}) => {
  const { motorcyclesDB } = useContext(motorcyclesContext);
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<MotorcycleType[]>([]);

  const getFavorites = async () => {
    const favoritesIdsJSON = await AsyncStorage.getItem(
      KEY_STORAGE_FAVORITES_IDS
    );
    const favoritesIds = favoritesIdsJSON
      ? (JSON.parse(favoritesIdsJSON) as number[])
      : [];
    const favoritesMotorcycles = motorcyclesDB.filter((moto) =>
      moto.id ? favoritesIds.includes(moto.id) : false
    );

    setFavoritesIds(favoritesIds);
    setFavorites(favoritesMotorcycles);
  };

  const setFavorite = async (id: number) => {
    const isFavorite = favoritesIds.includes(id);
    if (isFavorite) {
      const newFavoritesIds = favoritesIds.filter(
        (idFavorite) => idFavorite !== id
      );
      setFavoritesIds(newFavoritesIds);
      setFavorites((state) => state.filter((moto) => moto.id !== id));
      await AsyncStorage.setItem(
        KEY_STORAGE_FAVORITES_IDS,
        JSON.stringify(newFavoritesIds)
      );
    } else {
      const moto =
        motorcyclesDB.find((motoState) => motoState.id === id) || null;
      const newFavoritesIds = [...favoritesIds, id];
      setFavoritesIds(newFavoritesIds);
      if (moto) setFavorites((state) => [...state, moto]);
      await AsyncStorage.setItem(
        KEY_STORAGE_FAVORITES_IDS,
        JSON.stringify(newFavoritesIds)
      );
    }
  };

  const contextValue: FavoritesContext = useMemo(
    () => ({ favorites, setFavorite }),
    [favorites, favoritesIds]
  );

  useEffect(() => {
    if (motorcyclesDB.length > 0) getFavorites();
  }, [motorcyclesDB]);

  return (
    <favoritesContext.Provider value={contextValue}>
      {children}
    </favoritesContext.Provider>
  );
};
