var express = require('express');
var app = express();
var path = require('path');
// let req = require('request');
let rp = require('request-promise');

app.use(express.static(path.join(__dirname)));



const info = function(req,res) {
    rp({
      method: 'GET',
      url: 'http://developer.mbta.com/lib/gtrtfs/Departures.csv'
    }).then(function(result){
      var data = [];
      var lines= result.replace(/"/g,"").split(/\r\n|\n|\r/);
      var headers=lines[0].split(",");
      for (var i=1; i < lines.length-1; i++){
        var obj = {};
        var currentline = lines[i].split(',');
        for(var j=0; j < headers.length; j++){
          obj[headers[j]] = currentline[j];
        }
        data.push(obj);
      }
      // console.log('hit');
      // console.log(data);
      res.send(data);
    });
  };


app.get('/api/board', info);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 8080);
