var express = require('express');
var app = express();
var path    = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");


//serve static files
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});




//API
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();    
// all of our routes will be prefixed with /api
app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});



router.route('/gifts')
.get(function(req, res){
    res.json(jsonBlob);
})
.post(function(req, res){
  jsonBlob.push(req.body);
  writeToFile();
  res.json({message: 'object saved'});
})
.put(function(req, res){
  jsonBlob[findItemById(req.body.id)] = req.body;
  res.json({message: 'object updated'});
})
.delete(function(req, res){
  jsonBlob.splice(findItemById(req.query.id), 1);
    res.json({message: 'object removed'});
});

router.route('/gifts/:id')
.get(function(req, res){
  res.json(jsonBlob[findItemById(req.params.id)]);
});




//server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var jsonBlob = [{
        "id": "8a1330c93e31b8af013e360d6a2106ea",
        "content": {
            "message": "Her er den perfekte gave",
            "id": "8a1330c93e31b8af013e360d6a2106ea",
            "network": "facebook",
            "postType": "photo",
            "media": {
                "fileName": "konfirmationsgave til hende.jpg",
                "url": "http://s3.amazonaws.com/mingler.falcon.scheduled_post_pictures/25c69cba-8881-4147-9fc9-d61a9c2de676"
            }
        },
        "tags": [
            "converstaion",
            "sales"
        ],
        "status": "draft",
        "channels": [
            {
                "name": "Konfirmanden",
                "id": 433104606739910
            }
        ],
        "scheduled": "2013-08-08T08:00:00.000Z",
        "geo": {
            "countries": [
                {
                    "value": "Afghanistan",
                    "key": "134"
                }
            ],
            "languages": [
                {
                    "value": "Afrikaans",
                    "key": "31"
                }
            ],
            "cities": [],
            "regions": []
        }
    }];



function writeToFile(){
fs.writeFile( "filename.json", JSON.stringify( jsonBlob ), "utf8", 
function(err){
  if(err){
    console.log(err);
  }
});
}
writeToFile();

fs.readFile('filename.json', function (err, data) {
   if (err) {
       return console.error(err);
   }
   jsonBlob = JSON.parse(data.toString());
});


function findItemById(id){
  for (var i = 0; i < jsonBlob.length; i++) {
    if(jsonBlob[i].id === id){
      return i;
    }
  };
}