const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) { // doesnt work for upper and lowercase
	let results = [];
	// filter the fruit array based off of the string (input);
	let filtered = fruits.filter(fruit => {
		fruitLower = fruit.toLowerCase();
		strLower = str.toLowerCase();
		return fruitLower.includes(strLower);
	});
	// loop through the filtered array to push each element into the results array
	filtered.forEach(fruit => results.push(fruit));
	// run showSuggestions with the results array
	showSuggestions(results,str);
	return results;
}

function deleteLi(){ // delete li's to refresh autofill list
	while(suggestions.firstChild){
		suggestions.removeChild(suggestions.firstChild);
	}
}

function searchHandler(e) {
	// When a user starts typing
	deleteLi(); // delete all li's 
	let val = input.value;
	search(val); 
	
}

function showSuggestions(results, inputVal) { // need to get this to refresh if an array elem is deleted
	results.forEach((elem,i) => {      // create an li for each array element
			let li = document.createElement("li");
			li.innerText = elem;
			li.classList.add('listElement');   // add a class so that you can delete them later
			suggestions.appendChild(li);   // append them to the daddy ul
			li.addEventListener('click', useSuggestion);  // add a click event listener so that you can run use Suggestion
	})
	if (!inputVal){ // if there is no inputVal / if the input bar is blank, delete all Li's
		console.log(inputVal);
		deleteLi();
	}
	listCleanup(results); 
}

function listCleanup(arr){   // makes it to where it doesnt display every single fruit
	let desired = arr.length - 8;
	for(let i = 0; i <= desired; i++){
		suggestions.removeChild(suggestions.lastChild);
	}
}


function useSuggestion(e) { // When a suggestion is clicked on, update input box
	input.value = e.target.innerText;
	deleteLi(); // delete the list after the input box is updated
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);