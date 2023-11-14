var express = require('express')
var app = express()

var bodyParser = require('body-parser')
var urlencoded = bodyParser.urlencoded({extended: false})

var notesDatabase = require('./controllers/NotesDatabaseController')
const { ObjectId } = require('mongodb')


app.set('view engine', 'ejs')
app.use('/assets', express.static('assets'))

app.get('/home', (req, res)=>{
    res.render('home')
})

app.get('/addNotes', (req, res)=>{
    res.render('addNotes')
})

app.post('/addNotes',urlencoded ,async(req, res)=>{
    const note = {
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent
    }
    await notesDatabase.insertMany([note]) // OR we can type ( await notesDatabase.create(note) )
    res.render('home')
})

app.get('/showNotes', async(req, res)=>{
   const data = await notesDatabase.find({})
   res.render('showNotes', {data: data})
})

app.post('/showNotes', async(req, res)=>{
    await notesDatabase.deleteMany({})
    const data = await notesDatabase.find({})
    res.render('showNotes', {data: data})
})

app.get('/noteDetails', urlencoded,async(req, res)=>{
    const nodeID = req.query.id
    var noteId = new ObjectId(nodeID)
    const data = await notesDatabase.find({_id: noteId})
    res.render('noteDetails', {noteItem: data})
})

app.post('/noteDetails',urlencoded, async(req, res)=>{
    const nodeID = req.query.id
    var noteId = new ObjectId(nodeID)
    const data = await notesDatabase.find({_id: noteId})
    res.render('updateNote', {noteItem: data})
})

app.get('/updateNote',  urlencoded,async(req, res)=>{
    const nodeID = req.query.id
    var noteId = new ObjectId(nodeID)
    const data = await notesDatabase.find({_id: noteId})
    res.render('updateNote', {noteItem: data})
})

app.post('/updateNote', urlencoded, async(req, res)=>{
    const nodeID = req.query.id
    var noteId = new ObjectId(nodeID)
    const note = {
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent
    };
    await notesDatabase.findByIdAndUpdate(noteId, note)
    const newUpdatedData = await notesDatabase.find({_id: noteId})
    res.render('noteDetails',{noteItem: newUpdatedData})
})

app.get('/deleteNote',  urlencoded, async(req, res)=>{
    const nodeID = req.query.id
    var noteId = new ObjectId(nodeID)
    const data = await notesDatabase.find({_id: noteId})
    res.render('deleteNote', {noteItem: data})
})

app.post('/deleteNote', urlencoded, async(req, res)=>{
    const nodeID = req.query.id
    var noteId = new ObjectId(nodeID)
    await notesDatabase.deleteOne({_id: noteId})
    const data = await notesDatabase.find({})
    res.render('showNotes', {data: data})
})


app.listen(3000)