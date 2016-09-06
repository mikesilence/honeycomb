'use strict';

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.static('static'));
app.use('/storage', express.static('/storage.json'));

app.post('/storage', function(req, res) {
    var body = '';
    var filePath = path.join(__dirname + '/storage.json');

    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function (){
      fs.writeFile(filePath, body, function() {
        res.end();
      });
    });
});

app.get('/',function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/storage',function(req, res){
  res.sendFile(path.normalize(__dirname + '/storage.json'))
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
