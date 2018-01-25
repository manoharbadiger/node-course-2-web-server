const express = require('express');
const hbs = require('hbs');
var fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partial')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url} ${'\n'}`)
  fs.appendFile('server.log', log,  (err)=>{
    if (err) {
      console.log('unable to create log server file');
    }
  });
  next();
});

app.get('/',(req,res)=>{
  //res.send('Hello Express');
res.render('home.hbs',{
  Name: 'Manohar Badiger',
  Address: 'Bangalore',
  Location: [
   'Arekere',
    '560076'
  ],
  cuurentYear: new Date().getFullYear()
});
});

app.get('/bad',(req,res)=>{
  res.send('<h1> Hello Mr.BadMan </h1>');
});

app.listen(3000);
