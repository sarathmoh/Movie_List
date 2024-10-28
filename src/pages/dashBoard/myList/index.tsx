import { useWatchListContext } from "@/contexts/watchListContext";
import { useEffect, useState } from "react";
import MovieCard from "@/components/dashBoard/MovieCard";
import { useParams } from "react-router-dom";

const MyList = () => {
  const { watchList } = useWatchListContext();
  const [movies, setMovies] = useState([]);
  const { searchKey } = useParams();

  useEffect(() => {
    const movies = watchList.filter((item) => {
      return item.searchKey === searchKey;
    });
    setMovies(movies);
  }, [watchList, searchKey]);

  if(movies.length===0) return <div>
    <p>Sorry no movies found with title {searchKey} please go to home</p>

  </div>
  return (
    <div>
      <div>{searchKey}</div>

      <div className="grid grid-cols-4 gap-2 p-2  ">
        {movies.map((item) => {
          return (
            <MovieCard
              pageType="watchlist"
              searchKey={item?.searchKey}
              isBookMarked={item?.isBookMarked}
              key={item?.id}
              id={item?.id}
              title={item?.title}
              year={item?.year}
              posterUrl={item?.poster}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MyList;
