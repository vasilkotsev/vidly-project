import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = `${apiUrl}/movies`;

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  return httpService.get(`${apiEndPoint}`); // Promise
}
export function getMovie(id) {
  return httpService.get(movieUrl(id)); // Promise
}

export function saveMovie(movie) {
  /* Check if the movie has id (already exist) and delete _id property to send the body object request without it */
  if (movie._id) {
    const bodyObject = { ...movie };
    delete bodyObject._id;
    return httpService.put(movieUrl(movie._id), bodyObject); // Promise
  }
  /* Send post request to create a new movie */
  return httpService.post(`${apiEndPoint}`, movie); //Promise
}

export function deleteMovie(id) {
  return httpService.delete(movieUrl(id)); //Promise
}
