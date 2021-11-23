const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()

const options = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGOURL || 'mongodb://127.0.0.1:27017/artistDB?retryWrites=true&w=majority', options, (err) => {
  if (err) {
    console.log(err)
  } else { 

    console.log('Connected to MongoDB')

    app.use(express.json())
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'dist')))

    app.use('/', function (req, res, next) {
      console.log('Time:', Date.now())
      next()
    })

    app.use('/api', require('./server/routes/artistRoutes'))

    const PORT = 3000
    app.listen(PORT, () => console.log(`Application started successfully on port: ${PORT}!`))

    //run index.js script every 30 minutes
    setInterval(() => {
      require('../updateDB/index.js')
    }, 1800000)
    
    }
})

