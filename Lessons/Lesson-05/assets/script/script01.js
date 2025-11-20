// console.log('ciao')

// console.log('ciao')

// const HOBBIES = ["judo", "boxing", "reading", "coding"];

// console.log(HOBBIES);

// console.log(HOBBIES. length);

// console.log(HOBBIES[0]);

// const PERSON = {
//     name: "Jennifer",
//     lastname: "Lee",
//     hobbies: HOBBIES
// }

// console.log(PERSON);

// console.log(PERSON.name);

// console.log(PERSON.hobbies);

// const CONTAINER = document.getElementById('container');

// for (let hobby of PERSON.hobbies) {
//     const ITEM = document.createElement('li');
//     ITEM.textContent = hobby;
//     // ITEM.innerHTML = hobby;

//     CONTAINER.appendChild(ITEM);
//     // console.log(hobby);
// }

const CONTAINER = document.getElementById('container');

fetch('/assets/data/data.json') // get the data from an external source

    .then(response => response.json()) // parse/convert the data in JavaScript format
   
    .then(data => displayData(data)) // dispay the data in the console
    
    .catch(error => displayError(error)); // display an error if the data cannot be loaded


function displayData(data) {
    console.log(data);

    let counter = 0;

    for (hobby of data.hobbies) {

        counter += 1;
       const ITEM = document.createElement('li');
       ITEM.textContent = `${counter}: * ${hobby}`;

       CONTAINER.appendChild(ITEM);
    }
}

function displayError(error) {
    console.log (error);
}