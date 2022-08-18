const http = require('http');
const { books, authors } = require('./fixtures');

const HOST = 'localhost';
const PORT = '5000'; 

//Create server
const server = http.createServer(requestHandler);

//Handle requests
function requestHandler(req, res) {
    switch (req.url) {
        case '/books':
            res.end(JSON.stringify(books));
            break;
        case '/authors':
            res.end(JSON.stringify(authors));
            break;
        default:
            res.writeHead(404);
            console.log('Invalid Route!');
            break;
    }
}


//Start server
server.listen(PORT, HOST, () => {
    console.log(`Server is started and listening for request at: http://${HOST}:${PORT}`);
});