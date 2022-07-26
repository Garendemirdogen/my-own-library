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

/* Example Book: 
    The Alchemist
    By - Paulo Coelho */

// To call getBook function: uncomment the line below
getBook(9780062315007);
