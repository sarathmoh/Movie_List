import axios from "axios";
const api = axios.create({
  baseURL: `https://www.omdbapi.com`,
  headers: { "Content-Type": "application/json" },
});
export default api;
