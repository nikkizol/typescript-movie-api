import { Key } from "./Key.js";
let apiKey = new Key();
const posters = document.querySelector("#poster");
const input = document.getElementById("inputTitle");
const errorMsg = document.getElementById("errorMsg");
class Movie {
    constructor(title, poster) {
        this.title = title;
        this.poster = poster;
    }
}
function formatMovie(movie) {
    return { title: movie.Title, poster: movie.Poster };
}
class MovieService {
    getMovies(title) {
        return fetch(`http://www.omdbapi.com/?&apikey=${apiKey.getKey()}&s=${title}`)
            .then(res => res.json())
            .then(res => res.Search.map((movie) => formatMovie(movie)));
    }
}
const apiClient = new MovieService();
function displayMovies() {
    apiClient.getMovies(input.value).then((data) => {
        let movies = data;
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].poster === "N/A") {
                movies[i].poster = "no-poster.jpg";
            }
            posters.innerHTML += '<div class="cards mt-4"><div class="overlay">' + movies[i].title + '</div><img style="height: 300px; width: 200px" src=' + movies[i].poster + '> </src></div>';
        }
    }).catch(error => {
        console.error(error);
        errorMsg.innerHTML = '<div class="alert alert-light" role="alert">' + "Please enter correct movie title" + '</div>';
    });
}
document.getElementById('run').addEventListener('click', function (event) {
    errorMsg.innerHTML = "";
    posters.innerHTML = "";
    displayMovies();
    event.preventDefault();
});
