require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");


// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
const axios = require("axios");
// ...

function runCommand() {
    const array = process.argv;
    //console.log(index + ': ' + val);
    if (array[2] === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            //console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            //console.log(dataArr);

            // array[2] = dataArr[0];
            // //console.log(array[2]);
            // array[3] = dataArr[1];
            //console.log(array[3]);
            //console.log(array);
            switch (dataArr[2]) {
                case "concert-this":
                    concert_this();
                    break;

                case "spotify-this-song":
                    spotify_this_song();
                    break;

                case "movie-this":
                    movie_this();
                    break;
            }
        })
    }
    else {
        switch (array[2]) {
            case "concert-this":
                concert_this();
                break;

            case "spotify-this-song":
                if (!array[3]) {
                    array[3] = "The Sign";
                }
                spotify_this_song();
                break;

            case "movie-this":
                if (!array[3]) {
                    array[3] = "Mr. Nobody";
                }
                movie_this();
                break;
        }
    }

}

runCommand();

// The command for Liri in a variable called "liriCommand"
// let liriCommand = process.argv[2];


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
            console.log(`The date of the event is: ${moment(response.data[1].datetime.slice(0, 10)).format("L")}`);
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
    // Grab or assemble the song title and store it in a variable called "songName"
    let songName = process.argv[3];
    // ...


    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(data.tracks.items[0]);
        console.log(`
        Artist: ${data.tracks.items[0].artists[0].name}
        Song Name: ${data.tracks.items[0].name}
        Album: ${data.tracks.items[0].album.name}
        Preview: ${data.tracks.items[0].external_urls.spotify}
        `)
    });
}

/*function do_what_it_says() {
    const args = process.argv;
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        console.log(dataArr);

        let newCommand = dataArr[0];
        console.log(newCommand);
        let newQuery = dataArr[1];
        console.log(newQuery);
        console.log(newCommand === "spotify-this-song");
        switch (newCommand) {
            case "concert-this":
                concert_this(newQuery);
                break;

            case "spotify-this-song":
                spotify_this_song();
                break;

            case "movie-this":
                movie_this(newQuery);
                break;
        }

    });
}*/