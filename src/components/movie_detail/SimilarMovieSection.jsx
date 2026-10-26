import { useEffect, useState } from "react";
import { fetchSimilarMovie } from "../../services/API_Client";
import SimilarMovieCard from "./SimilarMovieCard";
import CircularLoader from "../common/CircularLoader";

const SimilarMovies = (({ movieId }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadCast = async () => {
            try {
                const data = await fetchSimilarMovie(movieId);
                setMovies(data);
            } catch (error) {
                console.error('Error fetching cast:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            loadCast();
        }
    }, [movieId]);

    if (isLoading) {
        return <CircularLoader />

    }

    if (movies.length === 0) return null;

    return (
        <section className="mt-10">
            <h2>You might also like...</h2>
            <ul className="cast-container">
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <SimilarMovieCard movie={movie} />
                    </li>
                ))}
            </ul>
        </section>
    );
});

export default SimilarMovies