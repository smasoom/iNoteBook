const mongoose= require('mongoose')

const NotesSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports.model('notes',NotesSchema)