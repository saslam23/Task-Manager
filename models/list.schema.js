const mongoose = require('mongoose');


const listSchema = {
    title:{type: String}
}

const List = mongoose.model('List', listSchema)

module.exports= List;