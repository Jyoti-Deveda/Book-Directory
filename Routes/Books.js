const express = require('express');
const { getBooks, addBook, updateBook, deleteBook } = require('../Controllers/books');
const Router = express.Router()

Router.get('/getBooks', getBooks);
Router.post('/addBook', addBook);
Router.put('/updateBook/:id', updateBook);
Router.delete('/deleteBook/:id', deleteBook);

exports.Router = Router;