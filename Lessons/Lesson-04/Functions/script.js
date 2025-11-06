// const person = "Jenni";

// const person1 = "Tom";
// const person2 = "Jane";

// // add person so you can change the parameter of the function later
// const myGreetings = function (person1, person2) {
    
//     console.log("Hi " + person1 + " and " + person2 + "!");
// }

// function will not show if its not called
// console.log("Hi!");

// format to calling function

// SCOPE: if the variable is used inside the function, it only exist inside the function
// this will not work
    // console.log(person); 

// greet ("John", "Steph")

// console.log("Hi " + person1 + " and " + person2 + "!");

// add functions into a constant (variable)
// myGreetings ("Elia", "Giovanni");


function fullName(name, surname) {
    return "Name: " + name + ", Surname: " + surname;
}

// return is used when there are multiple parameters in multiple function, take the value and return to the function

function printInfo (name, surname, course) {
    console.log (fullName(name, surname) + ", course: " + course)
}

function printGrade (name, surname, grade){
    console.log (", grade: " + grade)
}

printInfo ("Marco", "Lurati", "Creative Coding");
printGrade ("Marco", "Lurati", 10);