import { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/API_Client';
import CastSection from '../components/movie_detail/CastSection';
import SimilarMovies from '../components/movie_detail/SimilarMovieSection';
import MediaSection from '../components/movie_detail/MediaSection';
import SocialSection from '../components/movie_detail/SocialSection';
import BackButton from '../components/common/BackButton';
import CircularLoader from '../components/common/CircularLoader';

function MovieDetails({ id }) {
    //const { id } = useParams(); // Grabs the movie ID from the URL (:id)
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        let cancelled = false;

        const loadDetail = async () => {
            try {
                const data = await fetchMovieDetails(id);
                if (!cancelled) setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        loadDetail();
        return () => { cancelled = true; };
    }, [id]);

    if (isLoading) {
        return <CircularLoader />
    }

    if (!movie) {
        return <div className="text-white text-center py-20">Movie not found.</div>;
    }

    return (
        <div className="wrapper text-white py-10">
            <BackButton />
            <section className="mt-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'}
                        alt={movie.title}
                        className="rounded-xl w-full md:w-100 aspect-video md:aspect-2/3 object-cover shadow-lg shrink-0"
                    />
                    <div className="flex-1">
                        <p className="text-3xl md:text-4xl font-bold mb-4 text-white">{movie.title}</p>
                        <p className="text-light-200 italic mb-4">{movie.tagline}</p>
                        <p className="text-gray-300 mb-6 leading-relaxed">{movie.overview}</p>

                        <div className="space-y-2 text-gray-200">
                            <p><strong>Release Date:</strong> {movie.release_date}</p>
                            <p><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10</p>
                            <p><strong>Runtime:</strong> {movie.runtime} mins</p>
                        </div>
                    </div>
                </div>
            </section>
            <CastSection movieId={id} />
            <SocialSection movieId={id} />
            <MediaSection movieId={id} />
            <SimilarMovies movieId={id} />
        </div>
    );
}

export default MovieDetails;