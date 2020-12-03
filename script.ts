import {key} from "./key";

let apiKey = new key();

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
        return fetch(`http://www.omdbapi.com/?&apikey=${apiKey.getKey()}&s=${title}`)
            .then(res => res.json())
            .then(res => res.Search.map((movie: any) => formatMovie(movie)))
    }
}

const apiClient = new MovieService();

function displayMovies() {
    let input = (<HTMLInputElement>document.getElementById("inputTitle")).value;
    apiClient.getMovies(input).then((data) => {
        let movies = data;
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].poster === "N/A") {
                movies[i].poster = "no-poster.jpg"
            }
            posters.innerHTML += '<div class="cards mt-4"><div class="overlay">' + movies[i].title + '</div><img style="height: 300px; width: 200px" src=' + movies[i].poster + '> </src></div>'
        }
    })
}

document.getElementById('run').addEventListener('click', function (event) {
    posters.innerHTML = "";
    displayMovies();
    event.preventDefault();
});
