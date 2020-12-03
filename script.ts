const posters = document.querySelector("#poster");

class Movie {
    title: string;
    poster: string;

    constructor(title: string, poster: string) {
        this.title = title;
        this.poster = poster;

    }
}

function formatMovie(movie: any): Movie {
    return {title: movie.Title, poster: movie.Poster}
}

class MovieService {
    getMovies(title: string): Promise<Movie[]> {
        return fetch(`http://www.omdbapi.com/?&apikey=e32b2320&s=${title}`)
            .then(res => res.json())
            .then(res => res.Search.map((movie: any) => formatMovie(movie)))
    }
}

const apiClient = new MovieService();

apiClient.getMovies("rock").then((data) => (console.log(data)))