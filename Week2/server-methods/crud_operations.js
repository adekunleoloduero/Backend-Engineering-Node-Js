const fs = require('fs');
const path = require('path');

// const fs = require('fs');
// const path = require('path');

const booksDbPath = path.join(__dirname, 'db', 'books.json');


function getAllBooks(req, res) {
    res.writeHead(200);
    fs.readFile(booksDbPath, 'utf8', (err, data) => {
        if (err) {
            console.log(`An error occured: ${err}`);
        }
        res.end(data);
    });
}


function addBook(req, res) {
    fs.readFile(path.join(__dirname, 'db', 'books.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(`An error occured: ${err}`);
        }
        const booksDataStream = []
        req.on("data", (chunk) => {
            booksDataStream.push(chunk);
        });
        req.on("end", () => {
            res.writeHead(200);
            const allBooks = Buffer.concat(booksDataStream).toString();
            console.log(allBooks);
        })
    });
}



module.exports = {
    getAllBooks,
    addBook,
}