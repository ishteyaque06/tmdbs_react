import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../services/API_Client';
import { Link } from 'react-router-dom';
import CircularLoader from '../common/CircularLoader';

const CastCard = ({ cast }) => {
    return (
        <Link
            to={`/cast/${cast.id}`}
            className="rounded-2xl shadow-inner shadow-light-100/10 flex flex-col transition-transform hover:scale-105"
        >
            <div className='cast-card'>
                <img
                    src={cast.profile_path ? `https://image.tmdb.org/t/p/w200/${cast.profile_path}` : '/no-movie.png'}
                    alt={cast.name}
                    className="cast-card-image"
                />
                <div className="mt-3 w-full text-center">
                    <h4 className="text-white font-bold text-sm line-clamp-1">{cast.name}</h4>
                    <p className="text-gray-100 text-xs font-medium mt-1 line-clamp-1">
                        {cast.character || cast.job}
                    </p>
                </div>
            </div>
        </Link>
    );
};

const CastSection = ({ movieId }) => {
    const [casts, setCasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCast = async () => {
            try {
                const data = await fetchMovieCast(movieId);
                const filterData = data.filter((cast) => cast.known_for_department === 'Acting');
                setCasts(filterData);
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

    if (casts.length === 0) return null;

    return (
        <section className="mt-10">
            <h2>Cast</h2>
            <ul className="cast-container">
                {casts.map((cast) => (
                    <li key={cast.id || cast.credit_id}>
                        <CastCard cast={cast} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default CastSection;