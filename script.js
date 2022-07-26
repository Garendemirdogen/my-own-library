// add to library button
$(".addBtn").on("click", function (event) {
  event.preventDefault();
  // this alert is a test to see if button works when clicked
  // alert("this was clicked!");
});

// book function start 
var getBook = function (num) {
  /* made a variable for the open library url 
    using ISBN-13 (International Standard Book Number) */
  var openLibUrl = "https://openlibrary.org/api/books?bibkeys=ISBN:" + num + "&jscmd=data&format=json";
  // request information using fetch
  fetch(openLibUrl).then(function (response) {
      response.json().then(function (data) {
        console.log(data);
      })
  })
};
// book function ends 

// display books function start 
var displayBook = function(num) {
  // loop to get author 
  for (var i = 0; i < num.length; i++) {

  }
};
// button function fix?
// get movie function

$(document).ready(function () {
  var movies = [];

  $(document).on("click", ".movie-btn", getData);

  function getData() {
    var movie = $(this).attr("data-name");
    var queryURL =
      "https://www.omdbapi.com/?t=" + movie + "&type=movie&apikey=e7412d0b";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      if (response.Response === "True") {
        var movieData = $("#output");
        var movieCard = $("<div>");
        movieCard.attr("class", "card");

        //Get data
        var poster = $("<img>");
        poster.attr("src", response.Poster);

        //dump to divs
        movieCard.append(poster);
        movieData.prepend(movieCard);
      }
      // Modal to alert user that is not a valid movie title
      // alert for now until I figure out the modals.
      else {
        alert("ERROR: No results found for " + movie);
        var errorMovieIndex = movies.indexOf(movie);
        if (errorMovieIndex > -1) {
          movies.splice(errorMovieIndex, 1);
        }
        makeButtons();
      }
    });
  }

  function makeButtons() {
    $("#btn-div").empty();
    for (var i = 0; i < movies.length; i++) {
      //make button, append to movies
      var a = $("<button>");
      //add class
      a.addClass("movie-btn");
      a.addClass("btn btn-primary");
      //add name
      a.attr("data-name", movies[i]);
      //add text
      a.text(movies[i]);
      //add button to div
      $("#btn-div").append(a);
    }
  }

  $("#submit").on("click", function () {
    //grab user input
    var newMovie = $("#input").val().trim();
    movies.push(newMovie);
    console.log(movies);
    makeButtons();

    //clear input
    $("#input").val("");
  });

  makeButtons();
});

/* Example Book: 
    The Alchemist
    By - Paulo Coelho 
    ISBN-13 - 9780062315007 */

// To call getBook function: uncomment the line below

// getBook(9780062315007);

