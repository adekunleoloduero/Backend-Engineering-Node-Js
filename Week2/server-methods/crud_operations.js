const fs = require('fs');
const path = require('path');


const booksDbPath = path.join(__dirname, 'db', 'books.json');


function getAllBooks(req, res) {
    res.writeHead(200);
    fs.readFile(booksDbPath, 'utf8', (err, data) => {
        if (err) {
            fileError(err, res);
        }
        res.writeHead(200);
        res.end(data);
    });
}


function addBook(req, res) {
    const booksDataStream = [];
    req.on("data", (chunk) => {
        booksDataStream.push(chunk);
    });

    req.on("end", () => {
        fs.readFile(booksDbPath, 'utf8', (err, data) => {
            if (err) {
                fileError(err, res);
            }
            
            let oldBooks = data;
            let newBook = JSON.parse(booksDataStream);
            oldBooks = JSON.parse(oldBooks);

            //Generate id for new book
            let newBookId = oldBooks[oldBooks.length - 1].id + 1;

            //Append new data to exiting record
            newBook.id = newBookId;
            let updatedBooks = [...oldBooks, newBook];

            //Write updated record to file
            updatedBooks = JSON.stringify(updatedBooks);
            fs.writeFile(booksDbPath, updatedBooks, (err) => {
                if (err) {
                    fileError(err, res);
                }
                res.end('Success, new book has been added!');
            });
        });        
    });
}


// function updateBook()


function fileError(err, res) {
    res.writeHead(400);
    console.log(`An error occured: ${err}`);
    res.end('Failed, try again!');
}


module.exports = {
    getAllBooks,
    addBook,
}