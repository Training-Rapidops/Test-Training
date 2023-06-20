// Create a function taking a positive integer between 1 and 3999 (both included) as its parameter and returning a string containing the Roman Numeral representation of that integer.

// Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

// Example:

// solution(1000); // should return 'M'
// Help:

// Symbol    Value
// I          1
// V          5
// X          10
// L          50
// C          100
// D          500
// M          1,000z

function makeRoman(n) {
  const arr = ["I", "V", "X", "L", "C", "D", "M"];
  const num = [1, 5, 10, 50, 100, 500, 1000];
  let a = [];
  while (n > 0) {
    a.push(n % 10);
    n = Math.floor(n / 10);
  }
  console.log(a);
  let index = 0,
    j = 0,
    str = "";
  for (let i = 0; i < a.length; i++) {
    if (a[i] === 0) {
      j++;
      continue;
    } else {
      if (a[i] > num[j] && index < 3) {
        str += arr[j];
        index++;
      } else {
        j++;
        str += arr[j];
        index = 0;
      }
    }
  }

  return str;
}

console.log(makeRoman(1500));
