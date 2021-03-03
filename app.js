const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes');
const dbURI = require('./config');
// express app
const app = express();

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

// connect to mongo db
// const dbURI = 'your db uri';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to db');
    app.listen(port, host);
  })
  .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews'); // folder with html, ejs, etc

// middleware & static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', {title:'About'});
  // res.sendFile('./views/about.html', { root: __dirname});
});

// blog routes
app.use('/blogs',blogRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404',{title:'404'});
});
