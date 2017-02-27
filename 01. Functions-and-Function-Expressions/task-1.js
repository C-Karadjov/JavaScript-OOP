/* Task Description */
/* 
	Write a function that sums an array of numbers:
	  1)numbers must be always of type Number
	  2)returns `null` if the array is empty
	  3)throws Error if the parameter is not passed (undefined)
	  4)throws if any of the elements is not convertible to Number	

*/

function solve() {
	return function sum(numbers) {
		for (var i = 0; i < numbers.length; i += 1) {
			if (Number.isNaN(Number(numbers[i]))) {
				throw 'Error';
			}
		}
		if (numbers.length === 0) {
			return null;
		}
		return numbers.reduce((x, y) => x + (+y), 0);
	}
}

module.exports = solve;