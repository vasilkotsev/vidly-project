import httpService from "./httpService";
import { apiUrl } from "../config.json";

export function getMovies() {
  return httpService.get(`${apiUrl}/movies`); // Promise
}

export function deleteMovie(id) {
  return httpService.delete(`${apiUrl}/movies/${id}`); //Promise
}
