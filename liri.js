require("dotenv").config();
//var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var fs = require("fs");


// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
const axios = require("axios");
// ...

// The command for Liri in a variable called "liriCommand"
let liriCommand = process.argv[2];

switch (liriCommand) {
    case "concert-this":
        concert_this();
        break;

    case "spotify-this-song":
        spotify_this_song();
        break;

    case "movie-this":
        movie_this();
        break;

    case "do-what-it-says":
        do_what_it_says();
        break;
}

function movie_this() {
    // Grab or assemble the movie name and store it in a variable called "movieName"
    let movieName = process.argv[3];
    // ...


    // Then run a request with axios to the OMDB API with the movie specified
    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=68dfadbe";


    // Then create a request with axios to the queryUrl
    axios.get(queryUrl).then(
        (response) => {
            const object1 = response.data.Ratings[1];
            let tomato = Object.values(object1);

            console.log("The movie's title is: " + response.data.Title);
            console.log("The movie's release year is: " + response.data.Year);
            console.log(`The movie's IMDB rating is: ${response.data.imdbRating}/10`);
            console.log("The movie's Rotten Tomatoes rating is: " + tomato[1])
            console.log("This movie was produced in: " + response.data.Country);
            console.log("The movie's language is: " + response.data.Language);
            console.log("The movie's plot is: " + response.data.Plot);
            console.log("The movie's actors are: " + response.data.Actors);
        }
    )
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function concert_this() {
    // Grab or assemble the artist name and store it in a variable called "artistName"
    let artistName = process.argv[3];
    // ...


    // Then run a request with axios to the Bands in Town API with the artist specified
    let queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"


    // Then create a request with axios to the queryUrl
    axios.get(queryUrl).then(
        (response) => {
            //console.log(response.data[1].datetime.slice(0,10));
            console.log("The venue is: " + response.data[1].venue.name);
            console.log(`The venue's location is: ${response.data[1].venue.city}, ${response.data[1].venue.region}`);
            console.log(`The date of the event is: ${response.data[1].datetime.slice(0, 10)}`);
        }
    )
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function spotify_this_song() {
    // Grab or assemble the artist name and store it in a variable called "artistName"
    let songName = process.argv[3];
    // ...


    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

function do_what_it_says() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        let newCommand = dataArr[0];
        let newQuery = dataArr[1];
        switch (newCommand) {
            case "concert-this":
                concert_this(newQuery);
                break;
        
            case "spotify-this-song":
                spotify_this_song(newQuery);
                break;
        
            case "movie-this":
                movie_this(newQuery);
                break;
        
            case "do-what-it-says":
                do_what_it_says(newQuery);
                break;
        }

    });
}