let obj = { '2': 2, '4': 5, '5': 3, s: 7, f: 6, a: 4 };

// Step 1: Convert object to an array of key-value pairs
let entries = Object.entries(obj);

// Step 2: Sort the array by values in descending order
entries.sort(([, valueA], [, valueB]) => valueB - valueA);

// Step 3: Convert the sorted array back to an object
let sortedObj = Object.fromEntries(entries);

console.log(sortedObj);
