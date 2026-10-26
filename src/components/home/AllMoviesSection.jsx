import { useEffect, useState } from "react";
import MovieCard from "../common/MovieCard";
import { fetchPopularMovies } from "../../services/API_Client";
import CircularLoader from "../common/CircularLoader";

function AllMoviesSection({ searchTerm }) {
    // Remember which search term the data belongs to
    const [result, setResult] = useState({ term: null, movies: [], error: "" });

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const movies = await fetchPopularMovies(searchTerm);
                if (!cancelled) setResult({ term: searchTerm, movies, error: "" });
            } catch (error) {
                console.error(`Error loading movies: ${error}`);
                if (!cancelled) {
                    setResult({
                        term: searchTerm,
                        movies: [],
                        error: "Failed to fetch movies. Please try again later.",
                    });
                }
            }
        };
        load();
        return () => { cancelled = true; };
    }, [searchTerm]);

    // Derived, so no synchronous setState in the effect
    const isLoading = result.term !== searchTerm;

    return (
        <section className="all-movies">
            <h2>All Movies</h2>

            {isLoading ? (
                <CircularLoader />
            ) : result.error ? (
                <p className="text-red-500 text-center py-10">{result.error}</p>
            ) : result.movies.length === 0 ? (
                <p className="text-gray-400 text-center py-10">No movies found.</p>
            ) : (
                <ul>
                    {result.movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default AllMoviesSection;