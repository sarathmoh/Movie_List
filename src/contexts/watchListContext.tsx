import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./authContext";
import { Search } from "lucide-react";

interface Movie {
  title: string;
  year: number;
  id: string;
  poster: string;
  searchKey: string;
}

interface WatchList {
  userId: string;
  title: string;
  year: number;
  id: string;
  poster: string;
  searchKey: string;
}

interface DefaultValue {
  watchList: WatchList[];
  addToWatchList: (movie: Movie) => void;
  removeFromWatchList: (id: string, searchKey: string) => void;

  myList: string[];
}

interface WatchListProviderProps {
  children: ReactNode;
}

const defaultValue: DefaultValue = {
  watchList: [],
  addToWatchList: () => {},
  removeFromWatchList: () => {},
  myList: [],
};

const WatchListContext = createContext(defaultValue);

export const WatchListProvider: React.FC<WatchListProviderProps> = ({
  children,
}) => {
  const { user } = useAuthContext();
  const [watchList, setWatchList] = useState<WatchList[]>([]);
  const [myList, setMyList] = useState<string[]>([]);

  useEffect(() => {
    const watchlistString = localStorage.getItem("watchLists");
    if (watchlistString) {
      const watchList = JSON.parse(watchlistString);

      const myWatchList = watchList.filter((list) => {
        return list.userId === user.id;
      });

      const myList = [
        ...new Set(
          myWatchList.map((movie) => {
            return movie.searchKey;
          })
        ),
      ];

      setMyList(myList);

      setWatchList(myWatchList);
    }
  }, [user]);

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
      setMyList((prev) => {
        const newKeys = [...new Set([...prev, movieDetail.searchKey])];
        return newKeys;
      });
    }
  };

  const removeFromWatchList = (id: string, searchKey: string) => {
    const watchListString = localStorage.getItem("watchLists");
    if (watchListString) {
      const allWatchLists = JSON.parse(watchListString);
      const updatedWatchList = allWatchLists.filter((movie) => {
        return movie.id !== id && movie.userId == user.id;
      });
      localStorage.setItem("watchLists", JSON.stringify(updatedWatchList));
      const updatedMyWatchList = watchList.filter((item) => {
        return item.id !== id;
      });
      setWatchList(updatedMyWatchList);
      const updatedList = updatedMyWatchList.filter((item) => {
        return item.searchKey === searchKey;
      });
      if (updatedList.length === 0) {
        setMyList((prev) => {
          return prev.filter((item) => {
            return item !== searchKey;
          });
        });
      }
    }
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, addToWatchList, myList, removeFromWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchListContext = () => {
  const context = useContext(WatchListContext);
  return context;
};
