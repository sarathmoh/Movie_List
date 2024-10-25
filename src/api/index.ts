import axios from "axios";
const api = axios.create({
  baseURL: `http://www.omdbapi.com`,
  headers: { "Content-Type": "application/json" },
});
export default api;
