import { Key } from "./Key.js";
let apiKey = new Key();
const posters = document.querySelector("#poster");
const input = document.getElementById("inputTitle");
const errorMsg = document.getElementById("errorMsg");
const searchButton = document.getElementById('run');
const imgNoPoster = "no-poster.jpg";
const id = '';
const title = '';
class Movie {
    constructor(title, poster, id) {
        this.title = title;
        this.poster = poster;
        this.id = id;
    }
}
class MovieSearchById {
    getMovies(id) {
        return fetch(`http://www.omdbapi.com/?&apikey=${apiKey.getKey()}&i=${id}`)
            .then(res => res.json());
    }
}
class MovieSearchByTitle {
    getMovies(title) {
        return fetch(`http://www.omdbapi.com/?&apikey=${apiKey.getKey()}&s=${title}`)
            .then(res => res.json())
            .then(res => res.Search.map((movie) => formatMovie(movie)));
    }
}
function msgError() {
    return '<div class="alert alert-light" role="alert">' + "Please enter correct movie title" + '</div>';
}
function displayingMoviesInHtml(movies, i) {
    return '<div class="cards mt-4"><div class="movieId">' + movies[i].id + '</div><div class="overlay">' + movies[i].title + '</div><img style="height: 300px; width: 200px" src=' + movies[i].poster + '></div>';
}
function displayingSelectedMovieInHtml(movies) {
    const imdbId = movies.imdbID;
    return '<div class="media"> <img class="d-flex align-self-start mr-3" style="height: 400px; width: 300px" src=' + movies.Poster + '> <div class="media-body"> <h1 class="mt-0 title">' + movies.Title + ' (' + movies.Year + ') </h1> <ul><li> IMDb Rating: ' + movies.imdbRating + '</li><li> Country: ' + movies.Country + '</li><li> Genre: ' + movies.Genre + '</li><li> Actors: ' + movies.Actors + '</li><li>Link to IMDb: <a class="imdbLink" href=https://www.imdb.com/title/' + imdbId + '/>IMDb</a></li></ul><h5>Plot:</h5><p>' + movies.Plot + '</p></div></div>';
}
function resetDOM() {
    errorMsg.innerHTML = "";
    posters.innerHTML = "";
}
function selectMovieClass(id, title) {
    let apiClient;
    if (title == "") {
        apiClient = new MovieSearchById().getMovies(id);
    }
    else {
        apiClient = new MovieSearchByTitle().getMovies(title);
    }
    return apiClient;
}
function openMovieOnNewPage(allPosters, data) {
    allPosters.forEach((poster) => poster.addEventListener('click', function () {
        resetDOM();
        displayMovies(poster.childNodes[0].firstChild.nodeValue, title);
    }));
}
function formatMovie(movie) {
    return { title: movie.Title, poster: movie.Poster, id: movie.imdbID };
}
function displayMovies(id, title) {
    selectMovieClass(id, title).then((data) => {
        let movies = data;
        if (movies.length == undefined) {
            return posters.innerHTML += displayingSelectedMovieInHtml(movies);
        }
        else
            for (let i = 0; i < movies.length; i++) {
                if (movies[i].poster === "N/A") {
                    movies[i].poster = imgNoPoster;
                }
                posters.innerHTML += displayingMoviesInHtml(movies, i);
            }
        const allPosters = document.querySelectorAll(".cards");
        openMovieOnNewPage(allPosters, movies);
    }).catch(error => {
        console.error(error);
        errorMsg.innerHTML = msgError();
    });
}
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetDOM();
    if (input.value == "") {
        errorMsg.innerHTML = msgError();
        posters.removeChild(posters);
    }
    displayMovies(id, input.value);
});
