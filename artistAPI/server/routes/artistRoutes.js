// --- example-route.js ---
// • This is an example on how a simple route should be created
// • Routes are imported on index.js file and are used to declare our simple
// API endpoints.
// • Remember, this is a simple template and I will not complicate things but
// is a good practice to create one file on which you'll import all routes
// and import that file later on index.js. This way, index.js file will be
// more clean and simple to read.
// -----------------------------------------------------------------------------

const artists = require('../../repo/artistRepo')
const express = require('express')
const router = express.Router()

// • Declaring GET method
router.get('/list', function (req, res) {
  console.log('GET /artists/list')
  artists.find({}, function (err, docs) { 
    if (err) {
      res.send(err)
    } else {
      listedArtists = ""
      docs.forEach(function (item, i, arr) {
        listedArtists = listedArtists + `<a href="//${item["social"]}">${item["name"]}</a>, ${item["open"]}, ${item["link"]}, ${item["beware"]}, ${item["type"]}`
        if (docs.length != i+1) {
          listedArtists = listedArtists + '&'
        }
      })
      res.send(listedArtists)
    }
  })
})

// • Declaring POST method
router.post('/new',function(req,res){
  // add some sort of captcha or something to avoid bots/spam
  
  //post to mongodb
});

// • Export router to use it on other modules
module.exports = router
