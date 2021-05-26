import { useParams } from 'react-router-dom';

const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = ''; //если есть
const TREND_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
export const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(TREND_URL);
}

export function fetchMoviesByName(name) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${name}&language=en-US&page=1&include_adult=false`,
  );
}

export function fetchMovieById(id) {
  console.log(id);
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieCast(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`,
  );
}

// function fetchImage(keyWord, page) {
//   return fetch(
//     `${BASE_URL}``https://pixabay.com/api/?q=${keyWord}&page=${page}&key=19008570-42b7cc415e1b0453677c4c4a2&image_type=photo&orientation=horizontal&per_page=12`,
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     return Promise.reject(new Error('No response from server'));
//   });
// }

// const api = { fetchImage };

// export default api;
