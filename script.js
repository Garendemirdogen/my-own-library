let locationPlacement = null;

var bookFormEl = document.querySelector("#book-form");
var bookInputEl = document.querySelector("#input");
var bookContainerEl = document.querySelector("#output-bk");
var bookSearchTerm = document.querySelector("#book-search-term");

// book function start
var getBook = function (book) {
  /* made a variable for the open library url 
    using ISBN-13 (International Standard Book Number) */
  var openLibUrl = "https://openlibrary.org/search.json?q=" + book;
  // request information using fetch
  fetch(openLibUrl).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        displayBook(data, book);
      });
    }
    // } else {
    //   alert("Error: Book Not Found");
    // }
  });
  // .catch(function (error) {
  //   alert("Unable to connect to Open Library");
  // });
};

// book function ends

// display books function start
var displayBook = function (docs, searchTerm) {
  if (docs.length === 0) {
    bookContainerEl.textContent = "No Books Found.";
    return;
  }

  bookSearchTerm.textContent = searchTerm;

  // loop book docs
  for (var i = 0; i < docs.length; i++) {
    var bookCover = docs[0].cover_edition_key.value;

    var bookEl = document.createElement("div");
    bookEl.id = "output-bk";

    var titleEl = document.createElement("span");
    titleEl.textContent = bookCover;

    bookEl.appendChild(titleEl);

    bookContainerEl.appendChild(bookEl);
  }
};
// display function ends

// handler function starts
var bookHandler = function (event) {
  event.preventDefault();

  var bookName = bookInputEl.value.trim();

  if (bookName) {
    getBook(bookName);

    bookContainerEl.textContent = "";
    bookInputEl.value = "";
  }
  // else {
  //   alert("Please enter title of book");
  // }
};
// handler function ends

// add event listener starts
bookFormEl.addEventListener("submit", bookHandler);
// event listener ends

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

    //  // var array = [];
    //   //if (localStorage.getItem("movies")) {
    //   //  JSON.parse(localStorage.getItem("movies")).map((item) =>
    //     array.push(item)
    //     );
    //     array.push(movie);
    //     localStorage.setItem("movies", JSON.stringify(array));
    //   } else {
    //     array.push();
    //     console.log(array);
    //     localStorage.setItem("movies", JSON.stringify(array));
    //   }
    //   console.log(localStorage.getItem("movies"));

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

  // var modal = document.getElementById("myModal");

  // // Get the button that opens the modal
  // var btn = document.getElementById("myBtn");

  // // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close")[0];

  // // When the user clicks the button, open the modal
  // btn.onclick = function () {
  //   modal.style.display = "block";
  // };

  // // When the user clicks on <span> (x), close the modal
  // span.onclick = function () {
  //   modal.style.display = "none";
  // };

  // // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };

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
});

function store() {
  var locPlace = document.getElementById("dropdown").value;
  var titleNew = document.getElementById("titleInput").value;
  // var counter = 0;
  var favBM = {
    locPlace: [],
    titleNew: [],
  };

  window.localStorage.setItem("favBM", JSON.stringify(favBM));
  var oldData = JSON.parse(localStorage.getItem("favBM"));
  console.log(oldData);

  //oldData.push(locPlace, titleNew);
  //console.log(oldData);

  //localStorage.setItem(counter, locPlace, titleNew);
  //console.log(localStorage);
  //counter++;
  //window.localStorage.getItem("favBM", JSON.parse(favBM));
}

//for (var i = 0; i < localStorage.length; i++) {
//console.log(localStorage.getItem(localStorage.favBM(i)));
//}
//console.log(localStorage.getItem("movies"));
/* Example Book: 
    The Alchemist
    By - Paulo Coelho 
    ISBN-13 - 9780062315007 */

// To call getBook function: uncomment the line below

// getBook(9780062315007);

//local storage

//var selectorForm = document.getElementById('selector').value;
//var inputForm = document.getElementById('input').value;

//localStorage.setItem("selectorValue", selectorForm);
//localStorage.setItem("inoutValue" inputForm);
