import { Key } from "./Key.js";
let apiKey = new Key();
const posters = document.querySelector("#poster");
const input = document.getElementById("inputTitle");
const errorMsg = document.getElementById("errorMsg");
class Movie {
    constructor(title, poster, id) {
        this.title = title;
        this.poster = poster;
        this.id = id;
    }
}
function formatMovie(movie) {
    return { title: movie.Title, poster: movie.Poster, id: movie.imdbID };
}
function openMovieOnNewPage(allPosters, data) {
    allPosters.forEach((poster) => poster.addEventListener('click', function () {
        posters.innerHTML = "";
        const title = '';
        displayMovies(poster.childNodes[0].firstChild.nodeValue, title);
    }));
}
class MovieServiceById {
    getMovies(id) {
        return fetch(`http://www.omdbapi.com/?&apikey=${apiKey.getKey()}&i=${id}`)
            .then(res => res.json());
    }
}
class MovieServiceByTitle {
    getMovies(title) {
        return fetch(`http://www.omdbapi.com/?&apikey=${apiKey.getKey()}&s=${title}`)
            .then(res => res.json())
            .then(res => res.Search.map((movie) => formatMovie(movie)));
    }
}
function selectMovieClass(id, title) {
    let apiClient;
    if (title == "") {
        apiClient = new MovieServiceById().getMovies(id);
    }
    else {
        apiClient = new MovieServiceByTitle().getMovies(title);
    }
    return apiClient;
}
function displayMovies(id, title) {
    selectMovieClass(id, title).then((data) => {
        let movies = data;
        if (movies.length == undefined) {
            return posters.innerHTML += '<div class="cards mt-4"><div class="movieId">' + movies.Title + '</div><div class="overlay">' + movies.Title + '</div><img style="height: 300px; width: 200px" src=' + movies.Poster + '> </src></div>';
        }
        else
            for (let i = 0; i < movies.length; i++) {
                if (movies[i].poster === "N/A") {
                    movies[i].poster = "no-poster.jpg";
                }
                posters.innerHTML += '<div class="cards mt-4"><div class="movieId">' + movies[i].id + '</div><div class="overlay">' + movies[i].title + '</div><img style="height: 300px; width: 200px" src=' + movies[i].poster + '> </src></div>';
            }
        const allPosters = document.querySelectorAll(".cards");
        openMovieOnNewPage(allPosters, movies);
        //     posters.innerHTML += '<div class="cards mt-4"><div class="movieId">' + movies.Title + '</div><div class="overlay">' + movies.Title + '</div><img style="height: 300px; width: 200px" src=' + movies.Poster + '> </src></div>'
    }).catch(error => {
        console.error(error);
        errorMsg.innerHTML = '<div class="alert alert-light" role="alert">' + "Please enter correct movie title" + '</div>';
    });
}
document.getElementById('run').addEventListener('click', function (event) {
    event.preventDefault();
    errorMsg.innerHTML = "";
    posters.innerHTML = "";
    const id = '';
    displayMovies(id, input.value);
});
