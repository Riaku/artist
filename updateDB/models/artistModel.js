const mongoose = require('mongoose')
const Schema = mongoose.Schema

// • Create Schema. This will be used later to define model fields (db columns)
const artistSchema = new Schema(
  {
    name: String,
    social: String,
    open: String,
    link: String,
    Details: String,
    beware: String,
    type: String,
    field1: String,
    field2: String,
    field3: String,
    field4: String,
    field5: String,
    field6: String,
    field7: String,
    field8: String,
    field9: String
  },
  { timestamps: true }
)

// • Created Model below will help us to work with MongoDB easily.
var artistModel = mongoose.model('artists', artistSchema, 'artists')

// • Export Model 
module.exports = artistModel

