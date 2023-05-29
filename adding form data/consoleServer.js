const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://satellite_21:<password>@satellite.cfn4pz0.mongodb.net/mydatabase?retryWrites=true&w=majority");

var nameSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
// var User = mongoose.model("mycollection", nameSchema, "mycollection");

var User = require("./UserModel");
///note that this is an http method to create the server and  it doesnt uses the express framework
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = path.join(__dirname, pathname === '/' ? 'start.html' : pathname);

  if (req.method === 'GET') {
    // Render start.html on GET request
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading HTML file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (req.method === 'POST' && pathname === '/submit') {
    // Handle form submission on POST request
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      console.log(data);
    });

  

    req.on('end', () => {
      const formData = new URLSearchParams(data);
      console.log(formData);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Email validation
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(email)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid email');
        return;
      }

      
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Message:', message);

      res.writeHead(200, { 'Content-Type': 'text/plain' });

      var myData = new User({
        name: name,
        email: email,
        message: message
      });
      myData.save()
        .then(item => {
          console.log("<<<<<<Congratulations!!!The above entry has been stored.>>>>>>>\n")
          res.end("Entry Saved!");
          
        })
        .catch(err => {
          res.status(400).send("Unable to save to the database");
        });
    });
  } else {
    // Handle other routes
    res.writeHead(404);
    res.end('Not Found');
  }
});

const port = 3000; // Choose any available port number
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
