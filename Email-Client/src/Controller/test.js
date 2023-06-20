// function addUser(){​​​​​​​​
//     return async function ()
//     {​​​​​​​
//         ​ await validateInput();
//         console.log("Hello World!");
//     }​​​​​​​​;
//      async function validateInput()
//     {​​​​​​​​ for (leti = 0; i < 100; i++)
//     {​​​​​​​​ console.log(i); }​​​​​​​​
//     }​​​​​​​​
// }​​​​​​​​
// addUser()();
// console.log("Hey!!!");

// //
class Jayraj {
  name = "amit";

  a = setTimeout(() => {
    console.log(this.name);
  }, 1000);

  hello() {
    console.log("inside class " + this.name);
  }

  b = () => {
    console.log("b from inside " + this.name);
  };
}

let jayraj = new Jayraj();

console.log("Jayraj.a from ouside " + jayraj.a);

console.log("Jayraj.hello from outside " + jayraj.hello());

console.log("Jayraj.b from outside " + jayraj.b());
