import { getCurrentLanguage } from "../contexts/LangContextHelper"
import axios from "axios"
const BASE_URL = "https://movie-app-backend-xcuo.onrender.com"

const api = axios.create({
  baseURL: "https://movie-app-backend-xcuo.onrender.com"
})

// const api = axios.create({
//   baseURL: "http://localhost:5000/api"
// });

// const BASE_URL = "http://localhost:5000/api"
//const BASE_URL = "/api"

const fetchWithLanguage = async (endpoint, options = {}) => {
    const language = getCurrentLanguage() || "en-US"
    const separator = endpoint.includes("?") ? "&" : "?"
    const url = `${BASE_URL}${endpoint}${separator}language=${language}`

    const response = await fetch(url, options)
    return response.json()
}

export const getPopularMovies = async () => {
    const data = await fetchWithLanguage("/movie/popular")
    return data.results
}

export const getTopMovies = async () => {
    const data = await fetchWithLanguage("/movie/top_rated")
    return data.results
}

export const getMovieById = async (id) => {
    const data = await fetchWithLanguage(`/movie/${id}`)
    return data
};

export const getMovieReviews = async (id) => {
    const data = await fetchWithLanguage(`/movie/${id}/reviews`)
    return data
}

export const getMovieCredits = async (id) => {
    const data = await fetchWithLanguage(`/movie/${id}/credits`)
    return data
}

export const getUpcomingMovies = async () => {
    const data = await fetchWithLanguage(`/movie/upcoming`)
    return data.results
}

export const getSimilarMovies = async (id) => {
    const data = await fetchWithLanguage(`/movie/${id}/similar`)
    return data
}

export const getMovieImages = async (id) => {
    const data = await fetchWithLanguage(`/movie/${id}/images`)
    return data
}

export const getMovieVideos = async (id) => {
    const data = await fetchWithLanguage(`/movie/${id}/videos`)
    return data.results
}

export const getPopularTVSeries = async () => {
  const data = await fetchWithLanguage("/tv/popular")
  return data.results
}

export const getTopTVSeries = async () => {
    const data = await fetchWithLanguage("/tv/top_rated")
    return data.results
}

export const getTVSeriesById = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}`)
    const data = await response.json()
    return data
}

export const getTVSeriesCredits = async (id) => {
    const data = await fetchWithLanguage(`/tv/${id}/credits`)
    return data
}

export const getTVSeriesReviews = async (id) => {
    const data = await fetchWithLanguage(`/tv/${id}/reviews`)
    return data
}

export const getSimilarTVSeries = async (id) => {
    const data = await fetchWithLanguage(`/tv/${id}/similar`)
    return data
}

export const getTVSeriesImages = async (id) => {
    const data = await fetchWithLanguage(`/tv/${id}/images`)
    return data
}

export const getTVSeriesVideos = async (id) => {
    const data = await fetchWithLanguage(`/tv/${id}/videos`)
    return data.results
}

export const getPersonById = async (id) => {
    const data = await fetchWithLanguage(`/person/${id}`)
    return data
}

export const getPersonCombinedCredits = async (id) => {
    const data = await fetchWithLanguage(`/person/${id}/credits`)
    return data
}

export const getTopMoviesMultiPages = async (pages = 5) => {
    const data = await fetchWithLanguage(`/movie/top/multi?pages=${pages}`)
    return data.results
}

export const getPopularMoviesMultiPages = async (pages = 3) => {
    const data = await fetchWithLanguage(`/movie/popular/multi?pages=${pages}`)
    return data.results
}

export const getTopTVSeriesMultiPages = async (pages = 5) => {
    const data = await fetchWithLanguage(`/tv/top/multi?pages=${pages}`)
    return data.results
}

export const getPopularTVSeriesMultiPages = async (pages = 3) => {
    const data = await fetchWithLanguage(`/tv/popular/multi?pages=${pages}`)
    return data.results
}

export const searchMedia = async (query) => {
    const data = await fetchWithLanguage(`/search?query=${encodeURIComponent(query)}`)
    return data.results
}

export const getUserRatings = async () => {
    const response = await fetch(`${BASE_URL}/ratings/all`)
    const data = await response.json()
    return data.usersRatings
}

// export const getPopularMovies = async () => {
//     const response = await fetch(`${BASE_URL}/movie/popular`)
//     const data = await response.json()
//     return data.results
// };

// export const getTopMovies = async () => {
//     const response = await fetch(`${BASE_URL}/movie/top_rated`)
//     const data = await response.json()
//     return data.results
// }

// export const getMovieById = async (id) => {
//     const response = await fetch(`${BASE_URL}/movie/${id}`)
//     const data = await response.json()
//     return data
// };

// export const getMovieReviews = async (id) => {
//     const response = await fetch(`${BASE_URL}/movie/${id}/reviews`)
//     const data = await response.json()
//     return data
// }

// export const getMovieCredits = async (id) => {
//     const response = await fetch(`${BASE_URL}/movie/${id}/credits`)
//     const data = await response.json()
//     return data
// }

// export const getUpcomingMovies = async () => {
//     const response = await fetch(`${BASE_URL}/movie/upcoming`)
//     const data = await response.json()
//     return data.results
// }

// export const getSimilarMovies = async (id) => {
//     const response = await fetch(`${BASE_URL}/movie/${id}/similar`)
//     const data = await response.json()
//     return data
// }

// export const getMovieImages = async (id) => {
//     const response = await fetch(`${BASE_URL}/movie/${id}/images`)
//     const data = await response.json()
//     return data
// }

// export const getMovieVideos = async (id) => {
//     const response = await fetch(`${BASE_URL}/movie/${id}/videos`)
//     const data = await response.json()
//     return data.results
// }

// export const getPopularTVSeries = async () => {
//     const response = await fetch(`${BASE_URL}/tv/popular`)
//     const data = await response.json()
//     return data.results
// }

// export const getTopTVSeries = async () => {
//     const response = await fetch(`${BASE_URL}/tv/top_rated`)
//     const data = await response.json()
//     return data.results
// }

// export const getTVSeriesById = async (id) => {
//     const response = await fetch(`${BASE_URL}/tv/${id}`)
//     const data = await response.json()
//     return data
// }

// export const getTVSeriesCredits = async (id) => {
//   const response = await fetch(`${BASE_URL}/tv/${id}/credits`)
//   const data = await response.json()
//   return data;
// }

// export const getTVSeriesReviews = async (id) => {
//     const response = await fetch(`${BASE_URL}/tv/${id}/reviews`)
//     const data = await response.json()
//     return data
// }

// export const getSimilarTVSeries = async (id) => {
//     const response = await fetch(`${BASE_URL}/tv/${id}/similar`)
//     const data = await response.json()
//     return data
// }

// export const getTVSeriesImages = async (id) => {
//     const response = await fetch(`${BASE_URL}/tv/${id}/images`)
//     const data = await response.json()
//     return data
// }

// export const getTVSeriesVideos = async (id) => {
//     const response = await fetch(`${BASE_URL}/tv/${id}/videos`)
//     const data = await response.json()
//     return data.results
// }

// export const getPersonById = async (id) => {
//     const response = await fetch(`${BASE_URL}/person/${id}`)
//     const data = await response.json()
//     return data
// }

// export const getPersonCombinedCredits = async (id) => {
//     const response = await fetch(`${BASE_URL}/person/${id}/credits`)
//     const data = await response.json()
//     return data
// }

// export const getTopMoviesMultiPages = async (pages = 5) => {
//     const response = await fetch(`${BASE_URL}/movie/top/multi?pages=${pages}`)
//     const data = await response.json()
//     return data.results
// }

// export const getPopularMoviesMultiPages = async (pages = 3) => {
//     const response = await fetch(`${BASE_URL}/movie/popular/multi?pages=${pages}`)
//     const data = await response.json()
//     return data.results
// }

// export const getTopTVSeriesMultiPages = async (pages = 5) => {
//     const response = await fetch(`${BASE_URL}/tv/top/multi?pages=${pages}`)
//     const data = await response.json()
//     return data.results
// }

// export const getPopularTVSeriesMultiPages = async (pages = 3) => {
//     const response = await fetch(`${BASE_URL}/tv/popular/multi?pages=${pages}`)
//     const data = await response.json()
//     return data.results
// }

// export const searchMedia = async (query) => {
//     const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`)
//     const data = await response.json()
//     return data.results
// }

// export const getUserRatings = async () => {
//     const response = await fetch(`${BASE_URL}/ratings/all`)
//     const data = await response.json()
//     return data.usersRatings
// }

export default api