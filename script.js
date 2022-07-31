let locationPlacement = null;

// get movie function

$(document).ready(function () {
  var movies = [];
  let books = [];

  $(document).on("click", ".movie-btn", getData);
  $(document).on("click", ".book-btn", getData);

  function getData() {
    var movie = $(this).attr("data-name");
    if ($(`[data-movie="${movie}"]`).length) {
      return;
    }
    let book = $(this).attr("data-name");
    if ($(`[data-book="${books}"]`).length) {
      return;
    }

    var queryURL =
      "https://www.omdbapi.com/?t=" + movie + "&type=movie&apikey=e7412d0b";
    var bookQueryURL = "https://www.googleapis.com/books/v1/volumes?q=" + book;

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
        var moviePoster = $("<img>");
        moviePoster.attr("src", response.Poster);

        //dump to divs
        movieCard.append(moviePoster);
        movieData.prepend(movieCard);
      } else if (
        $.ajax({
          url: bookQueryURL,
          method: "GET",
        }).then(function (response) {
          console.log(response);

          if (response.Response === "True") {
            var bookData = $("#output-bk");
            var bookCard = $("<div>");
            bookCard.attr("data-book", books);
            bookCard.attr("class", "card");

            //Get data
            var bookPoster = $("<img>");
            bookPoster.attr("src", response.Poster);

            //dump to divs
            bookCard.append(bookPoster);
            bookData.prepend(bookCard);
          }
        })
      );
      makeButtons();
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

  $("#submit").on("click", function () {
    //grab user input
    var input = $("#titleInput").val().trim();
    if (locationPlacement === "Books") {
      books.push(input);
    } else {
      movies.push(input);
    }
    store();
    console.log(books);
    console.log(movies);
    makeButtons();
    //clear input
    $("#titleInput").val("");
  });

  $("#dropdown").on("change", function (event) {
    locationPlacement = event.target.selectedOptions[0].value;
  });
  // getData(input);
  makeButtons();
  if (localStorage.getItem("favBM")) {
    var savedBM = JSON.parse(localStorage.getItem("favBM"));
    console.log(savedBM);
    for (var i = 0; i < savedBM.locPlace.length; i++) {
      if (savedBM.locPlace[i] == "Books") {
        let bk = $("<button>");
        bk.text(savedBM.titleNew[i]).attr("data-name", savedBM.titleNew[i]);
        $("#btn-bk-div").append(bk);
      } else if (savedBM.locPlace[i] == "Movies") {
        let mv = $("<button>");
        mv.text(savedBM.titleNew[i]).attr("data-name", savedBM.titleNew[i]);
        $("#btn-mv-div").append(mv);
      }
    }
  }
});

function store() {
  var locPlace = document.getElementById("dropdown").value;
  var titleNew = document.getElementById("titleInput").value;
  // var counter = 0;
  var favBM = {
    locPlace: [],
    titleNew: [],
  };

  var oldData = JSON.parse(localStorage.getItem("favBM"));
  if (oldData) {
    console.log(oldData);
    oldData.locPlace.push(locPlace);
    oldData.titleNew.push(titleNew);
    window.localStorage.setItem("favBM", JSON.stringify(oldData));
  } else {
    console.log(oldData);

    console.log(localStorage);

    favBM.locPlace.push(locPlace);
    favBM.titleNew.push(titleNew);
    window.localStorage.setItem("favBM", JSON.stringify(favBM));
  }
}

/* Example Book: 
    The Alchemist
    By - Paulo Coelho 
    ISBN-13 - 9780062315007 */

// To call getBook function: uncomment the line below

// getBook(9780062315007);
