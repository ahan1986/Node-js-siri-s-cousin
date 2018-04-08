var keys = require('./keys.js');
// require("dotenv").config();

var command = process.argv[2];

// creating for loop to collect any words after the 3rd index
var name = process.argv[3];

for (var i=4; i<process.argv.length; i++) {
    name += " " + process.argv[i];
}
console.log(name);