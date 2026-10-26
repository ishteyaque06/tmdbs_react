import { MovieModel } from "../model/MovieModel";

// src/api.js
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

// Centralized function to fetch popular movies
export const fetchPopularMovies = async (query = '') => {
    try {
        const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
        const response = await fetch(
            endPoint,
            API_OPTIONS
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
        // return [];
    }
};

export const fetchTrendingMovies = async () => {
    try {
        const endPoint = `${API_BASE_URL}/trending/movie/day?language=en-US`
        const response = await fetch(
            endPoint,
            API_OPTIONS
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
        // return [];
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/movie/${id} ?language=en-US`, API_OPTIONS);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw new Error('Failed to fetch movies');
    }
};

export const fetchMovieCast = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/movie/${id}/credits?language=en-US`, API_OPTIONS);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data.cast || [];
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw new Error('Failed to fetch movies');
    }
};

export const fetchSimilarMovie = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/movie/${id}/recommendations?language=en-US`, API_OPTIONS);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return MovieModel.fromResponse(data.results);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw new Error('Failed to fetch movies');
    }
};

export const fetchMovieVideos = async (movieId) => {
    const response = await fetch(`${API_BASE_URL}/movie/${movieId}/videos`, API_OPTIONS);
    const data = await response.json();
    return data.results || [];
};

export const fetchMovieImages = async (movieId) => {
    const response = await fetch(`${API_BASE_URL}/movie/${movieId}/images`, API_OPTIONS);
    const data = await response.json();
    return {
        backdrops: data.backdrops || [],
        posters: data.posters || []
    };
};

export const fetchMovieReviews = async (movieId) => {
    const response = await fetch(`${API_BASE_URL}/movie/${movieId}/reviews`, API_OPTIONS);
    const data = await response.json();
    return data.results || [];
};


export const fetchActorDetail = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/person/${id}?language=en-US`, API_OPTIONS);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw new Error('Failed to fetch movies');
    }
};

export const fetchActorMovie = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/person/${id}/movie_credits?language=en-US`, API_OPTIONS);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return MovieModel.fromResponse(data.cast);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw new Error('Failed to fetch movies');
    }
};

// You can add more API calls here later, e.g.:
// export const searchMovies = async (query) => { ... }