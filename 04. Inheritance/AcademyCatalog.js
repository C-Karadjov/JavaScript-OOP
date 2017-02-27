function solve() {

    var Validator = {
        validateStringEmpty(str) {
            if (typeof str !== 'string' || str === '') {
                throw 'Error';
            }
        },
        validateStringLenght(str, start, end) {
            if (str.length < start || str.length > end) {
                throw 'Error'
            }
        },
        validateStringLenghtExactly(str, start, end) {
            if (str.length !== start && str.length !== end) {
                throw 'Isbn lenght must be 10 or 13';
            }
        },
        validateStringContainDigit(str) {
            if (!str.match(/^[0-9]*$/)) {
                throw 'Error';
            }
        },
        validatePositiveInteger(numb) {
            if (typeof numb !== 'number' || numb <= 0) {
                throw 'Error numb';
            }
        },
        validateNumberBound(numb, start, end) {
            if (numb < start || numb > end) {
                throw 'Error';
            }
        }
    };

    var idGenerator = (function() {
        var id = 0;
        return function() {
            id += 1;
            return id;
        }
    }());

    class Item {
        constructor(description, name) {
            this.id = idGenerator();
            this.description = description;
            this.name = name;
        }
        get description() {
            return this._description;
        }
        set description(description) {
            Validator.validateStringEmpty(description);
            this._description = description;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            Validator.validateStringLenght(name, 2, 40);
            this._name = name;
        }

    }

    class Book extends Item {
        constructor(description, name, isbn, genre) {
            super(description, name);
            this.isbn = isbn;
            this.genre = genre;
        }
        get isbn() {
            return this._isbn;
        }
        set isbn(isbn) {
            Validator.validateStringLenghtExactly(isbn, 10, 13)
            Validator.validateStringEmpty(isbn);
            Validator.validateStringContainDigit(isbn);
            this._isbn = isbn;
        }
        get genre() {
            return this._genre;
        }
        set genre(genre) {
            Validator.validateStringLenght(genre, 2, 20)
            this._genre = genre;
        }
    }

    class Media extends Item {
        constructor(description, name, duration, rating) {
            super(description, name);
            this.duration = duration;
            this.rating = rating;
        }
        get duration() {
            return this._duration;
        }
        set duration(duration) {
            Validator.validatePositiveInteger(duration);
            this._duration = duration;
        }
        get rating() {
            return this._rating;
        }
        set rating(rating) {
            if (typeof rating !== 'number') {
                throw 'Rating must be a number!';
            }
            Validator.validateNumberBound(rating, 1, 5)
            this._rating = rating;
        }

    }
    class Catalog {
        constructor(name) {
            this.id = idGenerator();
            this.name = name;
            this.items = [];
        }
        get name() {
            return this._name;
        }
        set name(name) {
            Validator.validateStringLenght(name, 2, 40);
            this._name = name;
        }

        add(...items) {
            if (Array.isArray(items[0])) {
                items = items[0];
            }
            if (items.length === 0) {
                throw 'Error';
            }
            this.items.push(...items);
            return this;
        }
        find(x) {
            if (typeof x === 'number') {
                var item = this.items.find(i => i.id === x);
                return item;
            }
            return null;

            if (x !== null && typeof x === 'object') {
                return this.items.filter(function(item) {
                    return Object.keys(x).every(function(prop) {
                        return x[prop] === item[prop];
                    });
                });
            }

            throw 'Invalid options or id';
        }
        search(pattern) {
            if (typeof pattern !== 'string' || pattern === '') {
                throw 'Error';
            }
            return this.items.filter(function(item) {
                return item.name.indexOf(pattern) >= 0 || item.description.indexOf(pattern) >= 0;
            });
        }
    }
    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }
        add(...books) {
            if (Array.isArray(books[0])) {
                books = books[0];
            }
            books.forEach(function(x) {
                if (!(x instanceof Book)) {
                    throw 'Must add only books';
                }
            });
            return super.add(...books);
        }
        getGenres() {
            var uniqueGenres = {};
            this.items.forEach(x => uniqueGenres[x.genre] = true);
            return Object.keys(uniqueGenres);
        }
        find(x) {
            return super.find(x);
        }
    }

    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }
        add(...medias) {
            if (Array.isArray(medias[0])) {
                medias = medias[0];
            }

            medias.forEach(function(x) {
                if (!(x instanceof Media)) {
                    throw 'Must add only medias';
                }
            });

            return super.add(...medias);
        }
        getTop(count) {
            if (typeof count !== 'number') {
                throw 'Count should be a number';
            }
            if (count < 1) {
                throw 'Count must be more than 1';
            }

            return this.items
                .sort((a, b) => a.rating < b.rating)
                .filter((_, ind) => ind < count)
                .map(x => ({
                    id: x.id,
                    name: x.name
                }));
        }
        getSortedByDuration() {
            return this.items
                .sort((a, b) => {
                    if (a.duration === b.duration) {
                        return a.id < b.id;
                    }

                    return a.duration > b.duration;
                });
        }
    }


    return {
        getBook(name, isbn, genre, description) {
            return new Book(description, name, isbn, genre);
        },
        getMedia(name, rating, duration, description) {
            return new Media(description, name, duration, rating);
        },
        getBookCatalog(name) {
            return new BookCatalog(name);
        },
        getMediaCatalog(name) {
            return new MediaCatalog(name);
        },
    };
}

module.exports = solve;

var {
    getBook,
    getMedia,
    getBookCatalog,
    getMediaCatalog
} = solve();

var book = getBook('JSS', '1234567891', 'Code', 'OOP');
var media = getMedia('C#', 5, 20, 'Curse');
var getBook = getBookCatalog('JS-OOP');
getBook.add(book);
console.log(getBook.search('JS'));
console.log(getBook);