require("dotenv").config();


const moment = require('moment');

var axios = require("axios");

var fs = require('fs');

var keys = require("./key");


const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

const userInput = process.argv[2];
const userQuery = process.argv.slice(3).join(" ");


function userCommand(userInput, userQuery) {
  switch (userInput) {
    case "concert-this":
      concertThis();
      break;
    case "spotify-this":
      spotifyThisSong();
      break;
    case "movie-this":
      movieThis();
      break;
    case "do-this":
      doThis(userQuery);
      break;
    default:
      console.log("I don't understand");
      break;
  }
}
userCommand(userInput, userQuery);

function concertThis() {
  console.log(`\n--------\n\nSEARCHING FOR ${userQuery}'s next show`);
  axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
  if (!error && response.statusCode === 200) {
    let userBand = JSON.parse(body);
    if(userBand.length > 0) {
      for (i = 0; i < 1; i++) {
        console.log(`\nArtist: ${userBand[i].lineup[0]}\nVenue: ${userBand[i].venue.name}\n City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

        let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00");
        console.log(`Date and time: ${concertDate}\n\n----------`);
      };
    } else {
      console.log("Couldn't find band or concert!");
    };
  };  
};

function spotifyThisSong() {
  console.log(`\n--------\n\nSEARCHING FOR "${userQuery}"`);

  if (!userQuery) { userQuery = "the sign ace of base" };
  spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    let spotifyArr = data.tracks.items;
      for (i = 0; i < spotifyArr.length; i++) {
        console.log(`\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\n\n----------`)
      };    
  });
};

function movieThis() {
  console.log(`\n--------\n\nSEARCHING FOR "${userQuery}"`);
  if (!userQuery) { userQuery = "some movie"; };
  request("http://www.ombdapi.co/?t=" + userQuery + "&apikey=2a7b1152", function (error, response) {
    let userMovie = JSON.parse(body);
    let ratingsArr = userMovie.Ratings;
    if (ratingsArr.length > 2) {
    }

    if (!error && response.statusCode === 200) {
      console.log(`\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nRotten Tomatos Rating: ${userMovie.Rating[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n----------`)
    } else {
      return console.log("Movie not found! Error: " + error);
    };
  });
};

function doThis() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) { return console.log(error); }
    let dataArr = data.split(",");

    userInput = dataArr[0];
    userQuery = dataArr[1];
    userCommand(userInput, userQuery);
  });
};

