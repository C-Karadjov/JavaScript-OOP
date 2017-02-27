/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() {
	return function findPrimes(x, y) {
		if (arguments.length < 2) {
			throw 'Error';
		}
		var from = +x,
			to = +y,
			divisor,
			maxdivisor,
			isPrime,
			primeNumber = [];

		for (i = from; i <= to; i += 1) {
			maxdivisor = Math.sqrt(i);
			isPrime = true;
			for (divisor = 2; divisor <= maxdivisor; divisor += 1) {
				if (i % divisor === 0) {
					isPrime = false;
					break;
				}
			}
			if (isPrime && i > 1) {
				primeNumber.push(i);
			}
		}
		return primeNumber;
	}
}

module.exports = solve;