// Carts and Products

// Implement a functionality to serve a Shopping Center
// 1 Export a function named getProduct
// Parameters:
// productType
// name
// price
// Example:
// getProduct("Sweets", "Shokolad Milka", 2)
// Returns an object that contains:
// productType: String
// name: String
// price: Number
// 2 Export a function named getShoppingCart
// No parameters
// Example:
// getShoppingCart()
// Returns an object that contains:
// products: Array
// add: Function
// remove: Function
// showCost: Function
// showProductTypes: Function
// getInfo: Function
// Behavior of the ShoppingCart object methods

// add(product)
// Parameters:
// A Product or Product-like object
// Behavior:
// Adds the product to the products array in the ShoppingCart instance
// A product can be added many times into the same ShoppingCart instance
// Should provide chaining

// remove(product)
// Parameters
// a Product or Product-like object
// Behavior:
// Removes the left-most object from the products array in the ShoppingCart instance, that has the same name, price and productType
// Should provide chaining
// Throws when:
// The ShoppingCart instance does not contain the product
// There are not products in the ShoppingCart instance

// showCost()
// No parameters
// Behavior:
// Returns the sum from the costs of all products in the ShoppingCart instance
// Returns 0 when there are no products in the ShoppingCart instance

// showProductTypes()
// No parameters
// Behavior:
// Returns the unique productTypes of the products added to the ShoppingCart instance
// The returned product types must be sorted alphabetically
// Returns an empty array when there are no products in the ShoppingCart instance

// getInfo()
// No parameters
// Behavior:
// Returns an object containing information about the products in the ShoppingCart instance. The returned object has two properties:
// products: Groups products by their name
// For each unique product name there creates an element:
// The name of the products
// Their total cost
// The quantity of products with the name in the ShoppingCart instance
// The groups must be sorted alphabetically by name
// totalPrice: The total price of all products in the ShoppingCart instance
// Returns an object with totalPrice equal to 0 and products - an empty array, when no products in the ShoppingCart instance

function solve() {
	function getProduct(productType, name, price) {
		return {
			productType: productType,
			name: name,
			price: price
		}
	}

	function getShoppingCart() {
		var products = [];

		function add(product) {
			products.push(product)
			return this;
		}

		function remove(product) {
			if (products) {
				var pos = products.findIndex(x => x.name === product.name &&
					x.productType === product.productType && x.price === product.price);
				if (pos >= 0) {
					for (var i = pos; i < products.length - 1; i += 1) {
						products[i] = products[i + 1];
					}
					products.pop();
				} else {
					throw 'Error';
				}
			} else {
				throw 'Error';
			}
			return this;
		}

		function showCost() {
			var sum = 0;
			if (products) {
				for (var i = 0; i < products.length; i += 1) {
					sum += products[i].price;
				}
			}
			return sum;
		}

		function showProductTypes() {
			var productTypes = [];

			for (var i = 0; i < products.length; i += 1) {
				if (!productTypes.some(x => x === products[i].productType)) {
					productTypes.push(products[i].productType);
				}
			}
			productTypes.sort(function(a, b) {
				if (a < b) return -1;
				if (a > b) return 1;
				return 0;
			})

			return productTypes;
		}

		function getInfo() {
			var productGroups = [];
			var names = [];
			for (var i = 0; i < products.length; i += 1) {
				if (!names.some(x => x === products[i].name)) {
					names.push(products[i].name);
				}
			}
			names.sort();
			var productGroup;
			for (var i = 0; i < names.length; i += 1) {
				let repetitions = products.filter(x => x.name === names[i]);
				let groupPrice = repetitions.reduce((sum, x) => sum + x.price, 0);
				productGroup = {
					name: names[i],
					totalPrice: groupPrice,
					quantity: repetitions.length
				}
				productGroups.push(productGroup);
			}
			return {
				totalPrice: this.showCost(),
				products: productGroups
			}
		}

		return {
			products: products,
			add: add,
			remove: remove,
			showCost: showCost,
			showProductTypes: showProductTypes,
			getInfo: getInfo
		};
	}

	return {
		getProduct: getProduct,
		getShoppingCart: getShoppingCart
	};
}

module.exports = solve();

//Another way:

function solve() {
	class Product {
		constructor(productType, name, price) {
			this.productType = productType;
			this.name = name;
			this.price = +price;

			return this;
		}
	}
	class ShoppingCart {
		constructor() {
			this.products = [];
		}
		add(product) {
			this.products.push(product);
			return this;
		}
		remove(product) {
			var index = this.products.findIndex(pr => pr.name === product.name && pr.price === product.price && pr.productType === product.productType);
			if (index < 0) {
				throw Error('ShoppingCart does not contain product!');
			}
			this.products.splice(index, 1)
			return this;
		}
		showCost() {
			var sum = this.products.reduce((x, y) => x + y.price, 0);
			return sum;
		}
		showProductTypes() {
			var pr = {};
			this.products.forEach(p => pr[p.productType] = true);
			return Object.keys(pr).sort();
		}
		getInfo() {

		}
		return {
			Product,
			ShoppingCart
		};
	}
	module.exports = solve

	var {
		Product,
		ShoppingCart
	} = solve();

	var pr1 = new Product('Sweet', 'Milka', 1);
	var pr2 = new Product('Meet', 'Chicken', 10);
	var card = new ShoppingCart();
	card.add(pr1).add(pr2);
	console.log(card.getInfo());