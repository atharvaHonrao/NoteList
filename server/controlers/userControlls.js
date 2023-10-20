import { dirname } from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';
import request from 'request-promise-native';
import UserMode from '../models/scheme_schema.js'
import UserModel from '../models/user_schema.js'
import NoteModel from '../models/notes_scheme.js';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));

class UserControlsers {

    static fetchNotes = async (req, res) => {

        console.log("heyyyyy in server")
        try {
            console.log("hi in server")
            const result = await NoteModel.find({});

            console.log(result)

            res.json(result)

        } catch (error) {
            console.log(error)

        }
    }

    

    static deleteNote = async (req, res) => {

        const { _id } = req.body
        console.log(_id)

        const noteId = 'your-document-id-here'; // Replace with the actual ID of the document you want to delete

        NoteModel.findByIdAndDelete(_id, (err, deletedNote) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to delete the document" });
            }

            if (!deletedNote) {
                return res.status(404).json({ message: "Document not found" });
            }

            console.log("Document deleted successfully");
            return res.status(200).json({ message: "Document deleted successfully" });
        });


    }

    static register = async (req, res) => {
        console.log("in server")


        const { _id, title, content } = req.body

        console.log(_id)

        if (_id == undefined) {

            try {
                const doc = new NoteModel({
                    title, content
                })
                await doc.save().then(() => {
                    console.log("success")
                    return res.status(201).json({ message: "success" })
                }).catch((err) => {

                    console.log(err)
                    return res.status(422).json({ message: "error" })
                })
            } catch (error) {
                console.log(error)
                return res.status(422).json({ message: "error" })

            }

        } else {

            // const result = await NoteModel.findOne({_id:_id});
            // console.log("sfjd",result)


            const filter = { _id: _id }; // Define the filter condition to match the document to be updated
            const update = { title: title, content: content }; // Define the update you want to apply

            NoteModel.updateOne(filter, update, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Failed to update" });
                }
                console.log("success");
                return res.status(200).json({ message: "Document updated successfully" });
            });



        }

        // console.log(req.body)




    }

}

export default UserControlsers;