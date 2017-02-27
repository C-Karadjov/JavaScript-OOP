function solve() {

	var Validator = {
		validateStringLenght(str, start, end) {
			if (typeof str !== 'string' || (str.length < start || str.length > end)) {
				throw 'String must be between 3 and 25 charachters !';
			}
		},

	};

	function* getId() {
		var id = 0;
		while (true) {
			id += 1;
			yield id;
		}
	}

	var idGenerator = getId();

	class Player {
		constructor(name) {
			this.name = name;
			this._playList = [];
		}
		get name() {
			return this._name;
		}
		set name(name) {
			Validator.validateStringLenght(name, 3, 25);
			this._name = name;
		}
		addPlayList(playListToAdd) {
			if (!(playListToAdd instanceof PlayList)) {
				throw Error('Must be a instance!');
			}
			this._playList.push(playListToAdd);
			return this;
		}
		getPlaylistById(id) {
			var result = this._playList.find(x => x.id === id);
			if (result === undefined) {
				return null;
			}
			return result;
		}
		removePlaylist(playlist) {
			if (typeof playable === 'number') {
				var index = this._playList.findIndex(x => x.id === playable);
				if (index === -1) {
					throw Error('Error');
				}
				return this._playList.splice(index, 1);
			}
			if (typeof params === 'object') {
				let index = this._playList.findIndex(x => x.id === playable.id);

				if (index === -1) {
					throw Error("Error");
				}
				return this._playList.splice(index, 1);
			}
		}
		listPlaylists(page, size) {

		}
		contains(playable, playlist) {

		}
		search(pattern) {

		}
	}

	class PlayList {
		constructor(name) {
			this.id = idGenerator.next().value;
			this.name = name;
			this._playAble = [];
		}
		get name() {
			return this._name;
		}
		set name(name) {
			Validator.validateStringLenght(name, 3, 25);
			this._name = name;
		}
		addPlayable(playable) {
			this._playAble.push(playable);
			return this;
		}
		getPlayableById(id) {
			var result = this._playAble.find(x => x.id === id);
			if (result === undefined) {
				return null;
			}
			return result;
		}
		removePlayable(playable) {
			if (typeof playable === 'number') {
				var index = this._playAble.findIndex(x => x.id === playable);
				if (index === -1) {
					throw Error('Error');
				}
				return this._playAble.splice(index, 1);
			}
			if (typeof params === 'object') {
				let index = this._playable.findIndex(x => x.id === playable.id);

				if (index === -1) {
					throw Error("Error");
				}
				return this._playable.splice(index, 1);
			}
		}

		listPlayables(page, size) {
			if (typeof page === 'undefined' ||
				typeof size === 'undefined' ||
				page < 0 ||
				size <= 0 ||
				page * size > this._playable.length) {
				throw Error('Wrong');
			}
			let sortedPlayable = this._playable.sort((x, y) => {
				if (x.name === y.name) {
					return x.id - y.id;
				}
				return x.name.localCompare(y.name);
			});
			let slicedPlayable = sortedPlayable.slice(page * size, (page + 1) * size);
			return slicedPlayable;
		}
	}

	class Playable {
		constructor(title, author) {
			this.id = idGenerator.next().value;
			this.title = title;
			this.author = author;
		}
		get title() {
			return this._title;
		}
		set title(title) {
			Validator.validateStringLenght(title, 3, 25);
			this._title = title;
		}
		get author() {
			return this._author;
		}
		set author(author) {
			Validator.validateStringLenght(author, 3, 25);
			this._author = author;
		}

		play() {
			return ('[' + this.id + ']' + '.' + ' [' + this.title + '] ' + '-' + ' [' + this.author + ']');
		};
	}

	class Audio extends Playable {
		constructor(title, author, length) {
			super(title, author);
			this.length = length;
		}
		get length() {
			return this._lenght;
		}
		set length(length) {
			if (typeof length !== 'number') {
				throw 'Lenght must be positive number';
			}
			if (length < 0) {
				throw 'Lenght must be positive number';
			}
			this._lenght = length;
		}

		play() {
			return (super.play() + ' ' + '-' + ' [' + this.length + ']');
		}
	}

	class Video extends Playable {
		constructor(title, author, imdbRating) {
			super(title, author);
			this.imdbRating = imdbRating;
		}
		get imdbRating() {
			return this._imdbRating;
		}
		set imdbRating(imdbRating) {
			if (typeof imdbRating !== 'number') {
				throw Error('Imdb rating must be a number!');
			}
			if (imdbRating < 1 || imdbRating > 5) {
				throw Error('imdbRating must between 1 and 5!');
			}

			this._imdbRating = imdbRating;
		}

		play() {
			return (super.play() + ' ' + '-' + ' [' + this.imdbRating + ']');
		}
	}

	const module = {
		getPlayer(name) {
			return new Player(name);
		},
		getPlaylist(name) {
			return new PlayList(name);
		},
		getAudio(title, author, length) {
			return new Audio(title, author, length);
		},
		getVideo(title, author, imdbRating) {
			return new Video(title, author, imdbRating);
		}
	};

	return module;
}

module.exports = solve;

// var {
// 	getPlayer,
// 	getPlaylist,
// 	getAudio,
// 	getVideo
// } = solve();

// var audio = getAudio('House', 'Mark Knight', 10);
// var video = getVideo('Mission Imposible', 'Jonh', 1);
// console.log(video.play());
// console.log(audio.play());
// var playlist = getPlaylist('JavaSctipt');
// playlist.addPlayable(audio)

// console.log(playlist.removePlayable(1))