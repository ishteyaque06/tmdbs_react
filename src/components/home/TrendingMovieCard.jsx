
import { Link } from 'react-router-dom'; // Import Link

const TrendingMovieCard = ({ movie: { id, poster_path, title }, index }) => {
    return (
        <Link to={`/movie/${id}`} className="contents">
            <p>{index + 1}</p>
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w300/${poster_path}` : '/no-movie.png'}
                alt={title}
            />
        </Link>
    );
};

export default TrendingMovieCard;