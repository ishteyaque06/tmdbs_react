import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/API_Client";
import TrendingMovieCard from "./TrendingMovieCard";

function TrendingSection({ visible }) {
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const movies = await fetchTrendingMovies();
                if (!cancelled) setTrendingMovies(movies);
            } catch (error) {
                console.error(`Error loading trending movies: ${error}`);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    if (!visible || trendingMovies.length === 0) return null;

    return (
        <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
                {trendingMovies.map((movie, index) => (
                    <li key={movie.$id || movie.id}>
                        <TrendingMovieCard movie={movie} index={index} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default TrendingSection;