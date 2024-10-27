import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkPlus } from "lucide-react";
import { useWatchListContext } from "@/contexts/watchListContext";

interface MovieCardProps {
  id: string;
  title: string;
  year: number;
  plotSummary: string;
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  posterUrl,
  id,
}) => {
  const { addToWatchList } = useWatchListContext();
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <div className="relative">
        <div className=" w-[100%]">
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="object-cover w-full"
          />
        </div>
        <BookmarkPlus
          color="white"
          size={"40px"}
          className="bg-black  absolute top-0 left-0"
          onClick={() => {
            const movie = {
              id: id,
              title: title,
              year: year,
              poster: posterUrl,
            };
            addToWatchList(movie);
          }}
        />
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge variant="secondary">{year}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* <CardDescription className="text-sm line-clamp-3">
          {plotSummary}
        </CardDescription> */}
      </CardContent>
    </Card>
  );
};

export default MovieCard
