// function declaration
function makeDemoUsecase({input}) {
  return function f({input2}) {
    try {
      console.info(input);
      return input;
    } catch (e) {
      console.error(e);
    }
  };
}

// function call
const result = makeDemoUsecase({input: 'a'});
console.info(result({}));


// returns makeDemoUsecase
// returns a
// returns function f
//
