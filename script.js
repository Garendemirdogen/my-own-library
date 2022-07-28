let locationPlacement = null;

// add to library button
$(".addBtn").on("click", function (event) {
  event.preventDefault();
  // this alert is a test to see if button works when clicked
  // alert("this was clicked!");
});

// function to get books
var getBook = function (num) {
  /* made a variable for the open library url 
    using ISBN-13 (International Standard Book Number) */
  var openLibUrl = "https://openlibrary.org/isbn/" + num + ".json";

  // request information using fetch
  fetch(openLibUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

// button function fix?
// get movie function

$(document).ready(function () {
  var movies = [];
  let books = [];

  $(document).on("click", ".movie-btn", getData);

  function getData() {
    var movie = $(this).attr("data-name");
    if ($(`[data-movie="${movie}"]`).length) {
      return;
    }

    var array = [];
    if (localStorage.getItem("movies")) {
      JSON.parse(localStorage.getItem("movies")).map((item) =>
        array.push(item)
      );
      array.push(movie);
      localStorage.setItem("movies", JSON.stringify(array));
    } else {
      array.push();
      console.log(array);
      localStorage.setItem("movies", JSON.stringify(array));
    }
    console.log(localStorage.getItem("movies"));

    var queryURL =
      "https://www.omdbapi.com/?t=" + movie + "&type=movie&apikey=e7412d0b";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      if (response.Response === "True") {
        var movieData = $("#output-mv");
        var movieCard = $("<div>");
        movieCard.attr("data-movie", movie);
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
        var errorMovieIndex = movies.indexOf(movie);
        if (errorMovieIndex > -1) {
          movies.splice(errorMovieIndex, 1);
        }
        makeButtons();
      }
    });
  }

  function makeButtons() {
    $("#btn-mv-div").empty();
    $("#btn-bk-div").empty();

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
      $("#btn-mv-div").append(a);
    }
    for (var i = 0; i < books.length; i++) {
      //make button, append to movies
      var a = $("<button>");
      //add class
      a.addClass("book-btn");
      a.addClass("btn btn-primary");
      //add name
      a.attr("data-name", books[i]);
      //add text
      a.text(books[i]);
      //add button to div
      $("#btn-bk-div").append(a);
    }
  }

  // var modal = document.querySelector(".modal");
  // var closeButtons = document.querySelectorAll(".close-modal");
  // // set open modal behaviour
  // document.querySelector(".open-modal").addEventListener("click", function () {
  //   modal.classList.toggle("modal-open");
  // });
  // // set close modal behaviour
  // for (i = 0; i < closeButtons.length; ++i) {
  //   closeButtons[i].addEventListener("click", function () {
  //     modal.classList.toggle("modal-open");
  //   });
  // }
  // // close modal if clicked outside content area
  // document.querySelector(".modal-inner").addEventListener("click", function () {
  //   modal.classList.toggle("modal-open");
  // });
  // // prevent modal inner from closing parent when clicked
  // document
  //   .querySelector(".modal-content")
  //   .addEventListener("click", function (e) {
  //     e.stopPropagation();
  //   });

  $("#submit").on("click", function () {
    //grab user input
    var input = $("#input").val().trim();
    if (locationPlacement === "Books") {
      books.push(input);
    } else {
      movies.push(input);
    }

    console.log(books);
    console.log(movies);
    makeButtons();

    //clear input
    $("#input").val("");
  });

  $("#dropdown").on("change", function (event) {
    locationPlacement = event.target.selectedOptions[0].value;
  });
  // getData(input);
  makeButtons();
});

// console.log(localStorage.getItem("movies"));
/* Example Book: 
    The Alchemist
    By - Paulo Coelho */

// To call getBook function: uncomment the line below

// getBook(9780062315007);
