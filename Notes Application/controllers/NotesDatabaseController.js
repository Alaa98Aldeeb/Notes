const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/NotesDatabase')
.then(()=>{
    console.log('connected to mongodb successuflly');
})
.catch(()=>{
    console.log('connection failed');
})

const schema = new mongoose.Schema({
    noteTitle:{
        type:String,
    },
    noteContent:{
        type:String,
    }
})

const collectionDB = new mongoose.model('NotesItems', schema)
module.exports = collectionDB 