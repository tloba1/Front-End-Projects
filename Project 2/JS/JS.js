// Import the readline module
const readline = require('readline');

// Create an interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for a number
rl.question('Enter a number: ', (input) => {
  // Parse the input as an integer
  const number = parseInt(input, 10);

  // Check if the input is a valid number
  if (!isNaN(number)) {
    // Convert the number to binary
    const binary = number.toString(2);
    console.log(`The binary representation of ${number} is ${binary}`);
  } else {
    console.log('Please enter a valid number.');
  }

  // Close the readline interface
  rl.close();
});
