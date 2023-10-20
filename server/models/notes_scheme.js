// const mongoose = require('mongoose')
import mongoose from 'mongoose';


const noteschema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required:true},
})

const NoteModel = mongoose.model("note", noteschema);

// module.exports = User;

export default NoteModel;