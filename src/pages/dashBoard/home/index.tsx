import { useContext, useEffect, useState } from "react";
import { fetchMovies } from "@/api/movies";
import { Input } from "@/components/ui/input";
import Loader from "@/components/loader";
import MovieCard from "@/components/dashBoard/MovieCard";
import { useWatchListContext } from "@/contexts/watchListContext";

const Home = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const { watchList } = useWatchListContext();

  const getMovies = async () => {
    try {
      setIsLoading(true);
      const result = await fetchMovies(searchTitle);

      const userSelection = result.Search?.map((movie) => {
        return watchList.some((watchListMovie) => {
          return watchListMovie.id === movie.imdbID;
        })
          ? {
              ...movie,
              isBookMarked: true,
              searchKey: searchTitle,
            }
          : { ...movie, isBookMarked: false, searchKey: searchTitle };
      });

      setMovies(userSelection);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setSearchTitle(e.target.value);
  };
  const handleSearch = () => {
    getMovies();
  };
  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const filteredMovies = movies.map((movie) => {
      return watchList.some((watchListMovie) => {
        return watchListMovie.id === movie.imdbID;
      })
        ? {
            ...movie,
            isBookMarked: true,
          }
        : movie;
    });

    setMovies(filteredMovies);
  }, [watchList]);
  if (isLoading) return <Loader />;
  return (
    <div>
      <div>welcome</div>
      <div>
        <div>
          <Input
            type="text"
            placeholder="Search by title"
            onChange={handleChange}
            value={searchTitle}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="grid grid-cols-4 gap-5 p-5">
          {movies?.map((item) => {
            return (
              <MovieCard
                pageType="home"
                searchKey={item?.searchKey}
                isBookMarked={item?.isBookMarked}
                key={item?.imdbID}
                id={item?.imdbID}
                title={item?.Title}
                year={item?.Year}
                posterUrl={item?.Poster}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;
