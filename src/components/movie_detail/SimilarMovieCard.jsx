import { Link } from "react-router-dom";


const SimilarMovieCard = ({ movie }) => {
    return (
        <Link
            to={`/movie/${movie.id}`}
            className="bg-dark-100 p-3 rounded-2xl shadow-inner shadow-light-100/10 min-w-60 max-w-60 flex flex-col transition-transform hover:scale-105"
        >
            {/* Image using Model Getter */}
            <img
                src={movie.cardImageUrl}
                alt={movie.title}
                className="w-full h-33.75 rounded-xl object-cover"
            />

            {/* Title & Vote Percentage using Model Getter */}
            <div className="mt-3 flex items-center justify-between gap-2">
                <h4 className="text-white font-bold text-sm line-clamp-1 flex-1">
                    {movie.title}
                </h4>

                {movie.votePercentage !== null && (
                    <span className="text-xs font-semibold text-light-100 bg-light-100/10 px-2 py-0.5 rounded-md shrink-0">
                        {movie.votePercentage}%
                    </span>
                )}
            </div>
        </Link>
    );
};

export default SimilarMovieCard;