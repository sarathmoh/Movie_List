import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  title: string;
  year: number;
  plotSummary: string;
  posterUrl: string;
}

export default function MovieCard(
  { title, year, plotSummary, posterUrl }: MovieCardProps = {
    title: "Inception",
    year: 2010,
    plotSummary:
      "A thief who enters the dreams of others to steal secrets from their subconscious.",
    posterUrl: "/placeholder.svg?height=400&width=300",
  }
) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <div className=" w-[100%]">
        <img src={posterUrl} alt={`${title} poster`} className="object-cover w-full" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge variant="secondary">{year}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm line-clamp-3">
          {plotSummary}
        </CardDescription>
      </CardContent>
     
    </Card>
  );
}
