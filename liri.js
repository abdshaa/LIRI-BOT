require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
    concertThis(value);
    break;
  case "spotify-this-song":
    spotifyThis(value);
    break;
  case "movie-this":
    movieThis(value);
    break;
  case "do-what-it-says":
    whatItSays();
    break;
  default:
}

//spotify
function spotifyThis(song) {
  spotify.search({ type: "track", value: song }, function(err, data) {
    if (err) {
      return console.log("Error: " + err);
    }
    console.log("Artist: ", data.tracks.items[0].artists[0].name);
    console.log("Song: ", data.track.items[0].name);
    console.log("Link: ", data.track.items[0].preview_url);
    console.log("Album: ", data.items[0].album.name);
  });
}
//concert
function concertThis(artist) {
  axios
    .get(
      "https://api.seatgeek.com/2/events -u MYCLIENTID:MjAzMDExNjB8MTU3ODkzNzQ2NC40NQ"
    )
    .then(function(response) {
      console.log("Name of venue: ", response.data[0].venue.name);
      console.log("Location ", response.data[0].venure.city);
      var Date = moment(responde.data[0].datetime).format("MM/DD/YYYY");
      console.log("Date of the Event: ", Date);
    });
}

//movies
function movieThis(movie) {
  axios
    .get("http://www.omdbapi.com/?i=tt3896198&apikey=88425c17" + movie)
    .then(function(data) {
      console.log("Movie Title: ", data.data.Title);
      console.log("Movie Published: ", data.data.Year);
      console.log("Country: ", data.data.Country);
      console.log("IMDB Rateing: ", data.data.Rated);
      console.log("Plot of the Movie: ", data.data.Plot);
      console.log("Movie Language: ", data.data.Language);
    });
}

//do what it says
function whatItSays() {
  fs.readFile("random.txt", function(err, data) {
    var value = data[0];
    var action = data[0];
    switch (action) {
      case "movie-this":
        movieThis(value);
        break;
      case "spotify-this":
        spotifyThis(value);
        break;
      case "concert-this":
        concertThis(value);
        break;
    }
  });
}
