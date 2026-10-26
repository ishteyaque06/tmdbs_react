import { useEffect, useState } from "react";
import { fetchActorMovie } from "../../services/API_Client";
import SimilarMovieCard from "../movie_detail/SimilarMovieCard";
import CircularLoader from "../common/CircularLoader";
const ActorSimilarMovieSection = (({ actorId }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadCast = async () => {
            try {
                const data = await fetchActorMovie(actorId);
                setMovies(data);
            } catch (error) {
                console.error('Error fetching cast:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (actorId) {
            loadCast();
        }
    }, [actorId]);

    if (isLoading) {
        return <CircularLoader />

    }
    if (movies.length === 0) return null;

    return (
        <section className="mt-10">
            <h2>Known For</h2>
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

export default ActorSimilarMovieSection