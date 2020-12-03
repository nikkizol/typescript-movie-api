"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var key_1 = require("./key");
var apiKey = new key_1.key();
var posters = document.querySelector("#poster");
var Movie = /** @class */ (function () {
    function Movie(title, poster) {
        this.title = title;
        this.poster = poster;
    }
    return Movie;
}());
function formatMovie(movie) {
    return { title: movie.Title, poster: movie.Poster };
}
var MovieService = /** @class */ (function () {
    function MovieService() {
    }
    MovieService.prototype.getMovies = function (title) {
        return fetch("http://www.omdbapi.com/?&apikey=" + apiKey.getKey() + "&s=" + title)
            .then(function (res) { return res.json(); })
            .then(function (res) { return res.Search.map(function (movie) { return formatMovie(movie); }); });
    };
    return MovieService;
}());
var apiClient = new MovieService();
function displayMovies() {
    var input = document.getElementById("inputTitle").value;
    apiClient.getMovies(input).then(function (data) {
        var movies = data;
        for (var i = 0; i < movies.length; i++) {
            if (movies[i].poster === "N/A") {
                movies[i].poster = "no-poster.jpg";
            }
            posters.innerHTML += '<div class="cards mt-4"><div class="overlay">' + movies[i].title + '</div><img style="height: 300px; width: 200px" src=' + movies[i].poster + '> </src></div>';
        }
    });
}
document.getElementById('run').addEventListener('click', function (event) {
    posters.innerHTML = "";
    displayMovies();
    event.preventDefault();
});
