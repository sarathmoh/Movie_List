import { useEffect, useState } from "react";
import { fetchMovies } from "@/api/movies";
import { Input } from "@/components/ui/input";
import Loader from "@/components/loader";
import MovieCard from "@/components/dashBoard/MovieCard";
import { useWatchListContext } from "@/contexts/watchListContext";
import { BookmarkPlus } from "lucide-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface Movie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
  isBookMarked: boolean;
  searchKey: string;
}

const schema = yup.object({
  title: yup.string().required("Please enter the title"),
});

type FormData = yup.InferType<typeof schema>;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { watchList } = useWatchListContext();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const getMovies = async () => {
    try {
      setIsLoading(true);
      const result = await fetchMovies(getValues("title"));

      const userSelection = result.Search?.map((movie: Movie) => {
        return watchList.some((watchListMovie) => {
          return watchListMovie.id === movie.imdbID;
        })
          ? {
              ...movie,

              isBookMarked: true,
              searchKey: getValues("title"),
            }
          : {
              ...movie,

              isBookMarked: false,
              searchKey: getValues("title"),
            };
      });

      setMovies(userSelection);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    getMovies();
  };
  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const filteredMovies = movies?.map((movie: Movie) => {
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

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="border-2 border-solid border-red-600 p-6">
        <h3 className="text-3xl">
          Welcome to <span className="text-red-600">Watchlists</span>
        </h3>
        <p>Browse movies,add them to watchlists and share them with friends.</p>
        <p>
          Just click the {<BookmarkPlus className="inline" />}to add a movie ,
          the poster to see more details or to mark the movie as watched.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex">
          <form
            onSubmit={handleSubmit(handleSearch)}
            className=" flex w-full flex-col"
          >
            <div className="flex w-full items-center">
              <Input
                {...register("title")}
                type="text"
                placeholder="Search by title"
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors?.title ? "border-red-500" : ""
                }`}
              />
              <button
                onClick={handleSearch}
                className="bg-red-600 text-white p-1 rounded-lg"
              >
                Search
              </button>
            </div>
            {errors.title && (
              <p className="text-red-500 m-1">{errors.title.message}</p>
            )}
          </form>
        </div>
        <div className="grid grid-cols-4 gap-5 max-sm:grid-cols-1 sm:max-md:grid-cols-2 md:max-lg:grid-cols-3">
          {isLoading ? (
            <Loader />
          ) : movies && movies?.length !== 0 ? (
            movies?.map((item) => {
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
            })
          ) : (
            <div className="col-span-4 bg-slate-200 py-3 px-2">
              <p className="text-red-600">
                Sorry no movies found please browse.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
