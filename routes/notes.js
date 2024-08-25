const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");


const Note = require("../models/Note");

// Route 1: Fetch all notes for the logged-in user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});












// Route 2: Add a new note using a POST request at "/api/auth/addnote"
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters long").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // If there are validation errors, return a bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Create a new note
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });
        
        // Save the note to the database
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});





// ROUTE 3: Update an existing note using PUT "/api/notes/updatenote/:id"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
        // Find the note to be updated and ensure it belongs to the user
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Check if the note belongs to the logged-in user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});









// ROUTE 4: DELETE an existing note using PUT "/api/notes/DELETEnote/:id"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;



    
    try {
        // Find the note to be updated and ensure it belongs to the user
        let note = await Note.findById(req.params.id);
        if (!note) {
            ret
            return res.status(404).send("Not Found");
        }

        // Check if the note belongs to the logged-in user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        
        note = await Note.findByIdAndDelete(req.params.id)

        res.json({"Success": "Note deleted",note :note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});









module.exports = router;
