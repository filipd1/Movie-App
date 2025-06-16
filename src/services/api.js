const API_KEY = "f21f77c5af310a330e9318f01af889bd";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data = await response.json()
    return data.results
}

export const getMovieById = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

export const getMovieReviews = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

export const getTopMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
}

export const getMovieCredits = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

export const getUpcomingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
}

export const getSimilarMovies = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

export const getPersonById = async (id) => {
    const response = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}