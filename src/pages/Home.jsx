//import TrendingMovieCard from '../components/TrendingMovieCard';
import Search from '../components/home/Search'
import { useState } from "react";
import { useDebounce } from "react-use";
import TrendingSection from '../components/home/TrendingSection';
import AllMoviesSection from '../components/home/AllMoviesSection';

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 600, [searchTerm]);
    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <TrendingSection visible={searchTerm.trim() === ""} />
                <AllMoviesSection searchTerm={debouncedSearchTerm} />
            </div>
        </main>
    );
}

export default Home;