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

apiClient.getMovies("rock").then((data) => (console.log(data)));

function displayMovies() {
    apiClient.getMovies("lol").then((data) => {
        let movies = data;
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].poster=== "N/A"){
                movies[i].poster = "no-poster.jpg"
            }
            posters.innerHTML += '<div class="cards mt-4"> <img style="height: 300px; width: 200px" src=' + movies[i].poster + '> </src></div>'
        }
    })
}
displayMovies()