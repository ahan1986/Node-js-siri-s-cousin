require("dotenv").config();
var keys = require('./keys');

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var omdbApi = require('omdb-client');

var fs = require('fs');

var command = process.argv[2];

// creating for loop to collect any words after the 3rd index
var name = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    name += " " + process.argv[i];
}
// if command is do-what-it-says
if (command == 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) throw error;
        var a = data.split(',');
        var b = a[0];
        var c = a[1];
        //calling the function if the command is 'do-what-it-says'
        choco(b, c);
    })
} else {
    //function that take in everything except the do-what-liri-says
    choco(command, name);
}

// function choco that will take in the commands and do its respective job
function choco(command, name) {
    switch (command) {
        //tweeter portion
        case 'my-tweets':
            var params = {
                screen_name: 'AAHan86',
                count: 10
            };
            //using 'get' using the variable client that I have defined above
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    for (i = 0; i < tweets.length; i++) {
                        console.log(`============================ \n On ${tweets[i].created_at}: \n \n ${tweets[i].text} \n ============================`);
                    }
                }
            });
            //using 'post'
            // client.post('statuses/update', {status: name}, function(error, tweet, reponse) {
            //     if(error) throw error;
            //     console.log(tweet);
            //     // console.log(response);
            // })
            break;

        // spotify portion
        case 'spotify-this-song':
            //using variable spotify that i defined above
            if (name !== undefined) {
                spotify.search({ type: 'album', query: name }, function (err, data) {
                    if (err) {
                        console.log("there was an error somewhere with the spotify " + err);
                    }
                    var spot = data.albums.items;
                    for (var i = 0; i < spot.length; i++) {
                        var artists = spot[i].artists[0].name;
                        var title = spot[i].name;
                        var urlSpot = spot[i].external_urls.spotify;
                        var album = spot[i].album_type;
                        //showing the index along with the artists
                        console.log(`${i + 1}: \n Artists: ${artists} \n Title: ${title} \n Preview Link: ${urlSpot} \n Album Type: ${album} \n`);
                        console.log("===================================== \n");
                    }
                })
            } else {
                spotify.search({ type: 'album', query: 'Ace of Base' }, function (err, data) {
                    if (err) {
                        console.log("there was an error somewhere with the spotify " + err);
                    }
                    var spot = data.albums.items;
                    for (var i = 0; i < spot.length; i++) {
                        var artists = spot[i].artists[0].name;
                        var title = spot[i].name;
                        var urlSpot = spot[i].external_urls.spotify;
                        var album = spot[i].album_type;
                        //showing the index along with the artists
                        console.log(`${i + 1}: \n Artists: ${artists} \n Title: ${title} \n Preview Link: ${urlSpot} \n Album Type: ${album} \n`);
                        console.log("===================================== \n");
                    }
                })
            }
            break;

        case 'movie-this':
            if (name !== undefined) {
                var params = {
                    apiKey: 'trilogy',
                    title: name
                }
                omdbApi.get(params, function (err, data) {
                    if (err) throw err;
                    // console.log(data);
                    //title
                    console.log(data.Title);
                    //year
                    console.log(data.Year);
                    //rotten tomatoes ratings
                    console.log(data.Ratings[1].Source + ": " + data.Ratings[1].Value);
                    //country
                    console.log(data.Country);
                    // language of the movie
                    console.log(data.Language);
                    //plot
                    console.log(data.Plot);
                    //actors in the movie
                    console.log(data.Actors);
                });
            } else {
                var params = {
                    apiKey: 'trilogy',
                    title: 'Mr. Nobody'
                }
                omdbApi.get(params, function (err, data) {
                    if (err) throw err;
                    // console.log(data);
                    //title
                    console.log(data.Title);
                    //year
                    console.log(data.Year);
                    //rotten tomatoes ratings
                    console.log(data.Ratings[1].Source + ": " + data.Ratings[1].Value);
                    //country
                    console.log(data.Country);
                    // language of the movie
                    console.log(data.Language);
                    //plot
                    console.log(data.Plot);
                    //actors in the movie
                    console.log(data.Actors);
                });
            }
            break;

    }
}