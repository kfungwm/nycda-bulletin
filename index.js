const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      pug = require('pug'),
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('Kevin', 'Kevin', '', { dialect: 'postgres' });

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'pug');


var Bulletin = sequelize.define('bulletinboard', {
  title: Sequelize.STRING,
  body: Sequelize.text
});

app.get('/', (request, response) => {
  response.redender('/messages');
});


app.get('/message', (request, response) => {
  Bulletin.findAll({ order:'id ASC'}).then((messages) => {
    response.render('messages/index', { messages: messages });
  });
});

app.get('/messages/new', (request, response) => {
  response.render('messages/new');
});

app.post('/messages', (request, response) => {
  if (request.body.title) {
    Bulletin.create(request.body).then(() => {
      response.redirect('/');
    });
  } else {
    response.redirect('/messages/new');
  }
});








sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
