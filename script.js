var posters = document.querySelector("#poster");
var Movie = /** @class */ (function () {
    function Movie(title, poster) {
        this.title = title;
        this.poster = poster;
    }
    return Movie;
}());
var MovieService = /** @class */ (function () {
    function MovieService() {
    }
    MovieService.prototype.getMovies = function (title) {
        return fetch("http://www.omdbapi.com/?&apikey=e32b2320&s=" + title)
            .then(function (res) { return res.json(); });
    };
    return MovieService;
}());
var apiClient = new MovieService();
apiClient.getMovies("rock").then(function (data) { return (console.log(data)); });
