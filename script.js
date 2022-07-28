let locationPlacement = null;

var bookFormEl = document.querySelector("#book-form");
var bookInputEl = document.querySelector("#input");
var bookContainerEl = document.querySelector("#output-bk");
var bookSearchTerm = document.querySelector("#book-search-term");

// handler function starts
var bookHandler = function (event) {
  // prevent page from refreshing 
  event.preventDefault();

  // get value from input element 
  var bookName = bookInputEl.value.trim();

  if (bookName) {
    getBook(bookName);

    // clear old content 
    bookContainerEl.textContent = "";
    bookInputEl.value = "";
  }
  // else {
  //   alert("Please enter title of book");
  // }
};
// handler function ends

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
  // check if api returned any repos
  if (docs.length === 0) {
    bookContainerEl.textContent = "No Books Found.";
    return;
  }

  bookSearchTerm.textContent = searchTerm;

  // loop over book docs
  for (var i = 0; i < docs.length; i++) {
    // format book cover
    var bookCover = docs[i].cover_edition_key;

    // div container for book 
    var bookEl = document.querySelector("div");
    bookEl.id = "output-bk";

    // span element to hold book name
    var titleEl = document.createElement("span");
    titleEl.textContent = bookCover;

    // append to container
    bookEl.appendChild(titleEl);

    // append container to the dom 
    bookContainerEl.appendChild(bookEl);
  }
};
// display function ends

// handler original spot

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

  // submit button 
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

/* MODAL STARTS 
let modal;
document.addEventListener("click", (e) => {
  if (e.target.className === "modal-open") {
    modal = document.getElementById(e.target.dataset.id);
    openModal(modal);
  } else if (e.target.className === "modal-close") {
    closeModal(modal);
  } else {
    return;
  }
});

const openModal = (modal) => {
    document.body.style.overflow = "auto";
    modal.setAttribute("open", "true");
    document.addEventListener("keydown", escClose);
    let overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    document.body.appendChild(overlay);
  };

  const closeModal = (modal) => {
    document.body.style.overflow = "auto";
    modal.removeAttribute("open");
    document.removeEventListener("keydown", escClose);
    document.body.removeChild(document.getElementById("modal-overlay"));
  };

  const escClose = (e) => {
    if (e.keyCode == 27) {
      closeModal();
    }
  };
 MODAL ENDS */

/* Example Book: 
    Title - "The Alchemist"
    Author - "Paulo Coelho"
    ISBN-13 - 9780062315007 */

/* To call getBook function: 
      Uncomment the line below. 
      Write one of the three: title, author or isbn. */
 
      // getBook("The Alchemist Paulo Coelho");
