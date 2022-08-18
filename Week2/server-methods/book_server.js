const http = require('http');
const { getAllBooks, addBook } =  require('./crud_operations');

const HOST_NAME = 'localhost';
const PORT = '5000';

//Request Handler
function requestHandler(req, res) {
    //Get all books
    if (req.url === '/books' && req.method === 'GET') {
        getAllBooks(req, res);
    }

    //Add a new book
    if (req.url === '/books' && req.method === 'POST') {
        addBook(req, res);
    }

    //Update the book record
    if (req.url === '/books' && req.method === 'PUT') {
        return
    }

    //Delete a book
    if (req.url === '/books' && req.method === 'DELETE') {
        return
    }
}


//Create Server
const server = http.createServer(requestHandler);


//Start server
server.listen(PORT, HOST_NAME, () => {
    console.log(`Server is running and listening to requests at: http://${HOST_NAME}:${PORT}`);
})