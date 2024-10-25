import api from "..";

export const fetchMovies = async (payload: string) => {
  const { data } = await api.get(
    `?apikey=${import.meta.env.VITE_API_KEY}&s=${payload}&plot=short`
  );
  return data;
};
