import {Key} from "./Key.js";

let apiKey = new Key();

const posters = document.querySelector("#poster")!;
const input = (<HTMLInputElement>document.getElementById("inputTitle"));
const errorMsg = document.getElementById("errorMsg")!;
const searchButton = document.getElementById('run')!;
const imgNoPoster = "no-poster.jpg";
const id = '';
const title = '';

class Movie {
    title: string;
    poster: string;
    id: string;

    constructor(title: string, poster: string, id: string) {
        this.title = title;
        this.poster = poster;
        this.id = id;

    }
}

class MovieSearchById {
    getMovies(id: string): Promise<Movie[]> {
        return fetch(`http://www.omdbapi.com/?&apikey=${apiKey.getKey()}&i=${id}`)
            .then(res => res.json())
    }
}

class MovieSearchByTitle {
    getMovies(title: string): Promise<Movie[]> {
        return fetch(`http://www.omdbapi.com/?&apikey=${apiKey.getKey()}&s=${title}`)
            .then(res => res.json())
            .then(res => res.Search.map((movie: any) => formatMovie(movie)))
    }
}

function msgError() {
    return '<div class="alert alert-light" role="alert">' + "Please enter correct movie title" + '</div>'
}

function displayingMoviesInHtml(movies: any, i: number) {
    return '<div class="cards mt-4"><div class="movieId">' + movies[i].id + '</div><div class="overlay">' + movies[i].title + '</div><img style="height: 300px; width: 200px" src=' + movies[i].poster + '> </src></div>'
}

function displayingSelectedMovieInHtml(movies: any) {
    return '<div class="cards mt-4"><div class="movieId">' + movies.Title + '</div><div class="overlay">' + movies.Title + '</div><img style="height: 300px; width: 200px" src=' + movies.Poster + '> </src></div>'
}

function resetDOM() {
    errorMsg.innerHTML = "";
    posters.innerHTML = "";
}

function selectMovieClass(id: string, title: string) {
    let apiClient;
    if (title == "") {
        apiClient = new MovieSearchById().getMovies(id)
    } else {
        apiClient = new MovieSearchByTitle().getMovies(title)
    }
    return apiClient;
}

function openMovieOnNewPage(allPosters: any, data: any) {
    allPosters.forEach((poster: any) => poster.addEventListener('click', function () {
        resetDOM()
        displayMovies(poster.childNodes[0].firstChild.nodeValue, title)
    }))
}

function formatMovie(movie: any): Movie {
    return {title: movie.Title, poster: movie.Poster, id: movie.imdbID}
}

function displayMovies(id: string, title: string) {
    selectMovieClass(id, title).then((data) => {
        let movies = data;
        if (movies.length == undefined) {
            return posters.innerHTML += displayingSelectedMovieInHtml(movies)
        } else
            for (let i = 0; i < movies.length; i++) {
                if (movies[i].poster === "N/A") {
                    movies[i].poster = imgNoPoster;
                }
                posters.innerHTML += displayingMoviesInHtml(movies, i)
            }
        const allPosters = document.querySelectorAll(".cards")!;
        openMovieOnNewPage(allPosters, movies);
    }).catch(error => {
        console.error(error);
        errorMsg.innerHTML = msgError()
    })
}

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetDOM()
    if (input.value == "") {
        errorMsg.innerHTML = msgError()
        posters.removeChild(posters);
    }
    displayMovies(id, input.value)
});

