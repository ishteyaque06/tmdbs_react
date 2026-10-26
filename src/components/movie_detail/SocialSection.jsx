import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../services/API_Client';
import CircularLoader from '../common/CircularLoader';

// --- Review Card Component ---
const ReviewCard = ({ review }) => {
    const { author, author_details, content, created_at } = review;

    // Format avatar path (TMDB avatars sometimes include full http links or relative paths)
    let avatarUrl = author_details?.avatar_path;
    if (avatarUrl) {
        if (avatarUrl.startsWith('/https')) {
            avatarUrl = avatarUrl.substring(1); // Remove leading slash if it's a full URL
        } else if (!avatarUrl.startsWith('http')) {
            avatarUrl = `https://image.tmdb.org/t/p/w185${avatarUrl}`;
        }
    } else {
        avatarUrl = '/no-profile.png'; // Fallback if no avatar
    }

    // Format date
    const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 w-95 shrink-0 flex flex-col justify-between">
            <div>
                {/* Top Row: Avatar, Author, Rating, and Date */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={avatarUrl}
                            alt={author}
                            className="w-10 h-10 rounded-full object-cover bg-black"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                        />
                        <div>
                            <h4 className="text-white font-bold text-sm line-clamp-1">{author || author_details?.username}</h4>
                            <p className="text-gray-400 text-xs">{formattedDate}</p>
                        </div>
                    </div>

                    {/* Star Rating Badge */}
                    {author_details?.rating && (
                        <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-lg">
                            <span className="text-yellow-500 text-xs">★</span>
                            <span className="text-yellow-400 font-bold text-xs">{author_details.rating}</span>
                        </div>
                    )}
                </div>

                {/* Bottom Row: Review Content */}
                <p className="text-gray-300 text-xs mt-4 line-clamp-4 leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    );
};

// --- Main Social Section Component ---

const SocialSection = ({ movieId }) => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const data = await fetchMovieReviews(movieId);
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            loadReviews();
        }
    }, [movieId]);

    if (isLoading) {
        return <CircularLoader />
    }
    if (reviews.length <= 0) {
        return null;
    }

    return (
        <section className="mt-10">
            {/* Header and Tab Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <h2>Social</h2>

                {/* Segmented Tab Switcher */}
                <div className="flex items-center bg-dark-100 rounded-xl border border-light-100/10 w-fit p-1">
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-l-lg transition-colors ${activeTab === 'reviews' ? 'bg-light-100/20 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Reviews ({reviews.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('discussions')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-r-lg transition-colors ${activeTab === 'discussions' ? 'bg-light-100/20 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Discussions (0)
                    </button>
                </div>
            </div>

            {/* Content Display based on active tab */}
            {activeTab === 'reviews' && (
                reviews.length === 0 ? (
                    <p className="text-gray-400 mt-6 text-sm">No reviews available for this movie.</p>
                ) : (
                    <ul className="flex flex-row overflow-x-auto gap-5 mt-4 w-full hide-scrollbar pb-4">
                        {reviews.map((review, index) => {
                            let roundedClass = '';
                            if (index === 0) roundedClass = 'rounded-l-2xl';
                            if (index === reviews.length - 1) roundedClass = 'rounded-r-2xl';

                            return (
                                <li key={review.id} className={`shrink-0 flex ${roundedClass}`}>
                                    <ReviewCard review={review} />
                                </li>
                            );
                        })}
                    </ul>
                )
            )}

            {activeTab === 'discussions' && (
                <p className="text-gray-400 mt-6 text-sm">No discussions available for this movie.</p>
            )}
        </section>
    );
};

export default SocialSection;