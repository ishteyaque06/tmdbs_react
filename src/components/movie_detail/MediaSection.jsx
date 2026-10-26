import { useEffect, useState } from 'react';
import { fetchMovieVideos, fetchMovieImages } from '../../services/API_Client';
import CircularLoader from '../common/CircularLoader';

// --- Sub-Card Components (Co-located) ---

const VideoCard = ({ video, onPlayClick }) => (
    <div
        onClick={() => onPlayClick(video)}
        className="bg-dark-100 p-3 rounded-2xl shadow-inner shadow-light-100/10 w-112.5 shrink-0 flex flex-col cursor-pointer transition-transform hover:scale-[1.02]"
    >
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
            <img
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-xl shadow-lg">
                    ▶
                </span>
            </div>
        </div>
        <h4 className="text-white font-bold text-sm line-clamp-1 mt-3">{video.name}</h4>
        <p className="text-gray-400 text-xs mt-1">{video.type} • {video.site}</p>
    </div>
);

const BackdropCard = ({ backdrop, roundedClass }) => (
    <div className="w-112.5 shrink-0 flex flex-col">
        <div className={`w-full aspect-video overflow-hidden bg-black ${roundedClass}`}>
            <img
                src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                alt="Movie backdrop"
                className="w-full h-full object-cover"
            />
        </div>
    </div>
);

const PosterCard = ({ poster, roundedClass }) => (
    <div className="w-60 shrink-0 flex flex-col">
        <div className={`w-full aspect-2/3 overflow-hidden bg-black ${roundedClass}`}>
            <img
                src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                alt="Movie poster"
                className="w-full h-full object-cover"
            />
        </div>
    </div>
);

// --- Main Media Section Component ---

const MediaSection = ({ movieId }) => {
    const [activeTab, setActiveTab] = useState('videos');
    const [videos, setVideos] = useState([]);
    const [backdrops, setBackdrops] = useState([]);
    const [posters, setPosters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [playingVideo, setPlayingVideo] = useState(null); // State for video modal popup

    useEffect(() => {
        const loadMedia = async () => {
            try {
                const [videoData, imageData] = await Promise.all([
                    fetchMovieVideos(movieId),
                    fetchMovieImages(movieId)
                ]);
                setVideos(videoData);
                setBackdrops(imageData.backdrops);
                setPosters(imageData.posters);
            } catch (error) {
                console.error('Error fetching media:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            loadMedia();
        }
    }, [movieId]);

    if (isLoading) {
        return <CircularLoader />
    }

    let currentItems = [];
    if (activeTab === 'videos') currentItems = videos;
    if (activeTab === 'backdrops') currentItems = backdrops;
    if (activeTab === 'posters') currentItems = posters;

    if (videos.length === 0 && backdrops.length === 0 && posters.length === 0) {
        return null;
    }

    return (
        <section className="mt-10 relative">
            {/* Header and Tab Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <h2>Media</h2>

                {/* Segmented Tab Switcher with rounded outer edges */}
                <div className="flex items-center bg-dark-100 rounded-xl border border-light-100/10 w-fit p-1">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-l-lg transition-colors ${activeTab === 'videos' ? 'bg-light-100/20 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Videos ({videos.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('backdrops')}
                        className={`px-4 py-1.5 text-sm font-semibold transition-colors ${activeTab === 'backdrops' ? 'bg-light-100/20 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Backdrops ({backdrops.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('posters')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-r-lg transition-colors ${activeTab === 'posters' ? 'bg-light-100/20 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Posters ({posters.length})
                    </button>
                </div>
            </div>

            {/* Scrollable Content Container */}
            {currentItems.length === 0 ? (
                <p className="text-gray-400 mt-6 text-sm">No {activeTab} available for this movie.</p>
            ) : (
                <ul className={`flex flex-row overflow-x-auto mt-4 w-full hide-scrollbar pb-4 ${activeTab === 'videos' ? 'gap-5' : 'gap-0'}`}>
                    {currentItems.map((item, index) => {
                        let roundedClass = '';
                        if (index === 0) roundedClass = 'rounded-l-2xl';
                        if (index === currentItems.length - 1) roundedClass = 'rounded-r-2xl';

                        return (
                            <li key={item.id || item.file_path || index} className="shrink-0 flex">
                                {activeTab === 'videos' && (
                                    <VideoCard
                                        video={item}
                                        onPlayClick={(vid) => setPlayingVideo(vid)}
                                    />
                                )}
                                {activeTab === 'backdrops' && <BackdropCard backdrop={item} roundedClass={roundedClass} />}
                                {activeTab === 'posters' && <PosterCard poster={item} roundedClass={roundedClass} />}
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* --- In-Place Video Modal Popup --- */}
            {playingVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-4xl bg-dark-100 rounded-2xl overflow-hidden shadow-2xl border border-light-100/10">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-light-100/10">
                            <h3 className="text-white font-bold text-base line-clamp-1">{playingVideo.name}</h3>
                            <button
                                onClick={() => setPlayingVideo(null)}
                                className="text-gray-400 hover:text-white bg-light-100/10 hover:bg-light-100/20 rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* YouTube Embed Player */}
                        <div className="relative w-full aspect-video bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${playingVideo.key}?autoplay=1`}
                                title={playingVideo.name}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MediaSection;