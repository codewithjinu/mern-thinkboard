import Note from "../models/Note.js";

// export function getAllNotes(req,res){
//     res.status(200).send("you just fetched the notes");
// }

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});// -1 will sort in desc. oder (newwest first)
        res.status(200).json(notes);

    } catch (error) {
        console.error("Error in getALLnotes controller", error);
        res.status(500).json({ message: "Internal server error" })

    }
}

export async function getNoteById(req, res) {
    try {
        const notes = await Note.findById(
            req.params.id
        );
        if(!notes) return res.status(400).json({message: "Note not found"})
        res.status(200).json(notes);

    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal server error" })

    }
}

// export function createNote(req,res){
//     res.status(201).json({message:"Note created successfully"});
// }

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        // const NewNote =  new Note({ title, content});

        // await NewNote.save();

        // res.status(200).json({message: "New Note created successfully"})

        const NewNote = new Note({ title, content });

        const savedNote = await NewNote.save();

        // res.status(200).json({savedNote, message: "New Note created successfully"})
        res.status(200).json({ savedNote, message: `${savedNote.title} created successfully` });


    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" })

    }
}

// export function updateNote(req,res){
//     res.status(200).json({message:"Note updated successfully"});
// }

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true,
            }
        );
        if (!updatedNote) return res.status(400).json({ message: "Note not found" })
        res.status(200).json({ updatedNote, message: "Note updated successfully" })
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error" })

    }
}
// export function deleteNote(req, res) {
//     res.status(200).json({ message: "Note deleted successfully" });
// }

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id,
            {
                new: true,
            }
        );
        if (!deletedNote) return res.status(400).json({ message: "Note not found" })
        res.status(200).json({ deletedNote, message: "Note deleted successfully" })
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error" })

    }
}
// export const getAllNotes(req,res) =>{
//     res.status(200).send("you just fetched the notes");
// }