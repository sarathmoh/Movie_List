import { createContext, ReactNode, useContext, useState } from "react";
import { useAuthContext } from "./authContext";

interface Movie {
  title: string;
  year: number;
  id: string;
  poster: string;
}

interface WatchList {
  userId: string;
  title: string;
  year: number;
  id: string;
  poster: string;
}

interface DefaultValue {
  watchList: WatchList[];
  addToWatchList: (movie: Movie) => void;
}

interface WatchListProviderProps {
  children: ReactNode;
}

const defaultValue: DefaultValue = {
  watchList: [],
  addToWatchList: () => {},
};

const WatchListContext = createContext(defaultValue);

export const WatchListProvider: React.FC<WatchListProviderProps> = ({
  children,
}) => {
  const { user } = useAuthContext();
  const [watchList, setWatchList] = useState<WatchList[]>([]);

  const addToWatchList = (movieDetail: Movie) => {
    const isMoviePresent = watchList.some((movie: WatchList) => {
      return movie.id === movieDetail.id;
    });
    if (isMoviePresent) return;

    const allWatchLists = localStorage.getItem("watchLists");
    let movieLists = [];
    if (allWatchLists) {
      movieLists = JSON.parse(allWatchLists);
    }

    const newMovie = {
      userId: user?.id,
      ...movieDetail,
    };
    if (movieLists) {
      movieLists.push(newMovie);
      localStorage.setItem("watchLists", JSON.stringify(movieLists));
      setWatchList((prev) => {
        return [...prev, newMovie];
      });
    }
  };

  return (
    <WatchListContext.Provider value={{ watchList, addToWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchListContext = () => {
  const context = useContext(WatchListContext);
  return context;
};
