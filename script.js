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
        return fetch("http://www.omdbapi.com/?&apikey=e32b2320&s=" + title)
            .then(function (res) { return res.json(); })
            .then(function (res) { return res.Search.map(function (movie) { return formatMovie(movie); }); });
    };
    return MovieService;
}());
var apiClient = new MovieService();
apiClient.getMovies("rock").then(function (data) { return (console.log(data)); });
