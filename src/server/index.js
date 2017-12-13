var express = require('express');
var bodyParser = require('body-parser');
var dao = require("./data_access");

var app = express();

//added to allow cross domain calls from angular cli
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", 
              "Origin, X-Requested-With, charset, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); //Parse JSON body

app.use("/", express.static(__dirname + '/..'));
// add node_modules route since addition of 'src' directory
app.use("/node_modules", express.static(__dirname + '/../../node_modules'));

// find book
app.get("/books/:isbn", function(req, res) {
  var book = dao.findBook(req.params.isbn);

  if (book === undefined) {
    res.statusCode = 404;
    res.end();
  } else {
    res.send(book);
  }
});

//update book
app.put("/books/:isbn", function(req, res) {
  if (req.params.isbn === undefined || req.body === undefined) {
    res.statusCode = 500;
    res.end();

    return;
  }

  dao.updateBook(req.params.isbn, req.body);
  res.end();
});

// delete book
app.delete("/books/:isbn", function(req, res) {
  dao.deleteBook(req.params.isbn);
  res.end();
});


// all books
app.get("/books", function(req, res) {
  var books = dao.getAllBooks();

  res.send(books);
});

console.log("Open a browser to http://localhost:3000 to view the application");

app.listen(3000);