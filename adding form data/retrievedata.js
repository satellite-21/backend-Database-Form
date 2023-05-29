const mongoose = require("mongoose");
var User = require("./UserModel");
 // Replace with the actual path to your User model file

mongoose.connect("mongodb+srv://satellite_21:3uCWwwf8K49dvq3B@satellite.cfn4pz0.mongodb.net/mydatabase?retryWrites=true&w=majority");

function retrieveEntries() {
    User.find({ name: "Kartik" })
      .then(entries => {
        // Handle the retrieved entries
        console.log(entries);
        // Perform further operations with the retrieved data
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  // Call the function to retrieve the entries
  retrieveEntries();


  