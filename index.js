const express = require('express');

const bodyParser = require('body-parser');

//const authRoutes = require('./routes/auth');

//const postsRoutes = require('./routes/posts');

//const errorController = require('./controllers/error');
//const path = require('path')
const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });
/* var corsOptions = {
  origin: "http://localhost:3000"
}; */
// Create api call
//     this.app.get('/api', (req, res) => res.json({ application: 'Reibo collection'}));
// app.use(bodyParser.json());
//const User = require('./models/user');
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "posts",
  password: "Sulu@ammu1"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//const db = require('./connection.js');
app.post('/form', function(req, res){
  var username = req.body.name;
  const userDetails = {
       name: req.body.name,
       email: req.body.email,
     
       password: req.body.password,
      };
      /* var name = req.body.name;
      var email = req.body.name; */
    
     con.query(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [userDetails.name, userDetails.email, userDetails.password]
        );
        res.send("Successfully registered");
      
     // alert("Successfully registered");
  //require("./routes/signup.routes")(app);
  //res.success(userDetails.password);
  
});
/* app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
}); */

//require("./routes/signup.routes")(app);
//app.use (express.static(path.join('C:/Users/mca/frontend')));
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});