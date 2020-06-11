const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();

const host = "0.0.0.0";

const port = 3000;

//SERVER USE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//SERVER SET
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));

//SERVER GET
//hihi

app.get('/', (req, res) => {
  res.render('home');
});
//SERVER ROUTES
let rouAccount = require('./routes/r_account');
rouAccount(app);
let rouCalendar = require('./routes/r_calendar.js');
rouCalendar(app);
app.use(function (req, res) {
  res.status(404).render('404');
});
  if(!module.parent){
    app.listen(port, host, () => {
      console.log("Server running - port" + port);
    });
  }
  module.exports = app
