const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

  // lodash
  const num = _.random(0, 20);
  console.log(num);

  // set header content type
  res.setHeader('Content-Type', 'text/html');

  // get url 
  let path = './views/';
  switch(req.url) {
    case '/':
      res.statusCode = 200;
      path += 'index.html';
      break;

    case '/about':
      res.statusCode = 200;
      path += 'about.html';
      break;
    case '/about-blah':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      res.statusCode = 404;
      path += '404.html';
      break;
  }

  // send an html file
  fs.readFile(path,(err, data) => {
    if(err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });


});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});