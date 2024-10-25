import { useEffect, useState } from "react";
import { fetchMovies } from "@/api/movies";
import { Input } from "@/components/ui/input";
import Loader from "@/components/loader";
import MovieCard from "@/components/dashBoard/MovieCard";

const Home = () => {
  const [searchTitle, setSearchTitle] = useState("predator");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    try {
      setIsLoading(true);
      const result = await fetchMovies(searchTitle);
      console.log(result, "result");
      setMovies(result?.Search);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange=()=>{

  }
  useEffect(() => {
    getMovies();
  }, []);
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
        </div>
        <div className="grid grid-cols-4 gap-5 p-5">{movies?.map((item)=>{
          return   <MovieCard title={item?.Title} year={item?.Year } posterUrl={item?.Poster}/>
        })
          }
        
        </div>
      </div>
    </div>
  );
};
export default Home;
