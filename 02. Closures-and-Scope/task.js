/* Task Description */
/* 
 *  Create a module for working with books
 *  The module must provide the following functionalities:
 *  Add a new book to category
 *  Each book has unique title, author and ISBN
 *  It must return the newly created book with assigned ID
 *  If the category is missi`ng, it must be automatically created
 *  List all books
 *  Books are sorted by ID
 *  This can be done by author, by category or all
 *  List all categories
 *  Categories are sorted by ID
 *  Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *  When adding a book/category, the ID is generated automatically
 *  Add validation everywhere, where possible
 *  Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *  Author is any non-empty string
 *  Unique params are Book title and Book ISBN
 *  Book ISBN is an unique code that contains either 10 or 13 digits
 *  If something is not valid - throw Error
 */

function solve() {

	var library = (function() {
		var books = [];
		var categories = [];
		let counterID = 1;

		function listBooks() {
			let book = arguments[0];

			if (!book) {
				return books;
			}
			if (book.category) {
				return books.filter(x => x.category === book.category);
			}
			if (book.author) {
				return books.filter(x => x.author === book.author);
			}

			return books;
		}

		function addBook(book) {

			let titleLength = book.title.length;

			if (titleLength < 2 || titleLength > 100) {
				throw Error('Invalid title name');
			}

			if (book.author === '') {
				throw Error('Invalid author name');
			}

			if (!book.isbn.match(/^[0-9]{10}$/) && !book.isbn.match(/^[0-9]{13}$/)) {
				throw "Invalid ISBN format";
			}

			books.forEach(b => {
				if (b.title === book.title || b.isbn === book.isbn) {
					throw new Error('Book title and ISBN should be unique!');
				}
			});

			if (categories.indexOf(book.category) < 0) {
				categories.push(book.category);
			}

			book.ID = counterID;
			counterID += 1;
			books.push(book);
			return book;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	}());
	return library;
}

module.exports = solve;

// testing library
var book = {
	title: 'the good parts',
	isbn: '1234567890',
	author: 'Crockford',
	category: 'javascript'
};

var book1 = {
	title: 'the art of unit testing',
	isbn: '5456897456321',
	author: 'Osherove',
	category: 'c#'
};

var testCategory = {
	category: 'javascript'
};

var testAuthor = {
	author: 'Osherove'
};

var library = solve();
library.books.add(book);
library.books.add(book1);

console.log(library.books.list(testCategory));
console.log(library.books.list(testAuthor));
console.log(library.categories.list());