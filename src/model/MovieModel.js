export class MovieModel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.title = data.title || 'Untitled';
        this.backdropPath = data.backdrop_path || null;
        this.posterPath = data.poster_path || null;
        this.voteAverage = data.vote_average || 0;
        this.releaseDate = data.release_date || '';
    }

    // Computed Property (Getter) for Vote Percentage
    get votePercentage() {
        return this.voteAverage ? Math.round(this.voteAverage * 10) : null;
    }

    // Computed Property (Getter) for Card Image URL
    get cardImageUrl() {
        if (this.backdropPath) {
            return `https://image.tmdb.org/t/p/w300${this.backdropPath}`;
        }
        if (this.posterPath) {
            return `https://image.tmdb.org/t/p/w300${this.posterPath}`;
        }
        return '/no-movie.png';
    }

    // Static Factory Method (Similar to Swift's Decodable initializer)
    static fromResponse(dataArray) {
        if (!Array.isArray(dataArray)) return [];
        return dataArray.map((item) => new MovieModel(item));
    }
}