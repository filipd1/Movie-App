const BASE_URL = "http://localhost:5000/api";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
};

export const getMovieById = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}`);
    const data = await response.json();
    return data;
};

export const getMovieReviews = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/reviews`)
    const data = await response.json()
    return data
}

export const getTopMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated`)
    const data = await response.json()
    return data.results
}

export const getMovieCredits = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits`)
    const data = await response.json()
    return data
}

export const getUpcomingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming`)
    const data = await response.json()
    return data.results
}

export const getSimilarMovies = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/similar`)
    const data = await response.json()
    return data
}

export const getMovieImages = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/images`)
    const data = await response.json()
    return data
}

export const getPersonById = async (id) => {
    const response = await fetch(`${BASE_URL}/person/${id}`)
    const data = await response.json()
    return data
}

export const getPersonCombinedCredits = async (id) => {
    const response = await fetch(`${BASE_URL}/person/${id}/combined_credits`)
    const data = await response.json()
    return data
}

export const getPopularTVSeries = async () => {
    const response = await fetch(`${BASE_URL}/tv/popular`)
    const data = await response.json()
    return data.results
}

export const getTopTVSeries = async () => {
    const response = await fetch(`${BASE_URL}/tv/top_rated`)
    const data = await response.json()
    return data.results
}

export const getTVSeriesById = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}`)
    const data = await response.json()
    return data
}

export const getTVSeriesCredits = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}/aggregate_credits`)
    const data = await response.json()
    return data
}

export const getTVSeriesImages = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}/images`)
    const data = await response.json()
    return data
}

export const getTVSeriesReviews = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}/reviews`)
    const data = await response.json()
    return data
}

export const getSimilarTVSeries = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}/similar`)
    const data = await response.json()
    return data
}