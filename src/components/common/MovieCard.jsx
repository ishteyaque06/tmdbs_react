import { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link

const MovieCard = ({ movie: { id, title, vote_average, poster_path, release_date, original_language } }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link to={`/movie/${id}`} className="movie-card block cursor-pointer">
            <div className="poster-container">
                {!isLoaded && <div className="poster-placeholder" />}
                <img
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                    alt={title}
                    onLoad={() => setIsLoaded(true)}
                    className={isLoaded ? 'loaded' : 'loading'}
                />
            </div>

            <div className="mt-4">
                <h3>{title}</h3>
            </div>

            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>&bull;</span>
                <p className="lang">{original_language}</p>
                <span>&bull;</span>
                <p className="year">{release_date ? release_date.split('-')[0] : ''}</p>
            </div>
        </Link>
    );
};

export default MovieCard;