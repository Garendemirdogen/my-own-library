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

// get movie function

$(document).ready(function () {
  function movieFinder() {
    const apiKey = "db0633cb7d87ac12e2e4f675d677f8a5";
    var title = $("input").val();
    var movieAPI = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`;
  }
});
/* Example Book: 
    The Alchemist
    By - Paulo Coelho */

// To call getBook function: uncomment the line below

// getBook(9780062315007);

