import { Request, Response, NextFunction, RequestHandler } from 'express';
import NoteModel, { Note } from '../models/note';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getNotes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes: Note[] = await NoteModel.find().exec();
        if (!notes || notes.length === 0) {
            throw createHttpError(404, 'Notes not found');
        }

        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler<{ noteId: string }> = async (req, res, next) => {
    const noteId = req.params.noteId;
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, 'Invalid note id');
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, 'Note not found');
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

interface CreateNoteBody {
    title?: string;
    text?: string;
}

export const createNote: RequestHandler<Record<string, any>, void, CreateNoteBody, { query: Record<string, any> }> = async (req: Request, res: Response, next: NextFunction) => {
    const { title, text } = req.body;

    try {
        if (!title) {
            throw createHttpError(400, 'Title is required');
        }
        // Create a new note
        const newNote: Note = await NoteModel.create({
            title,
            text,
        });

        // Respond with the newly created note
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

interface UpdateNoteBody {
    title?: string;
    text?: string;
}

export const updateNote: RequestHandler<{ noteId: string }, void, UpdateNoteBody, { query: Record<string, any> }> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const { title, text } = req.body;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, 'Invalid note id');
        }

        const existingNote = await NoteModel.findById(noteId).exec();
        if (!existingNote) {
            throw createHttpError(404, 'Note not found');
        }

        // Update the note properties
        existingNote.title = title || existingNote.title;
        existingNote.text = text || existingNote.text;

        // Save the updated note
        await existingNote.save();

        res.status(204).send();  // Respond with a 204 No Content status
    } catch (error) {
        next(error);
    }
};

export const deleteNote: RequestHandler<{ noteId: string }> = async (req, res, next) => {
    const noteId = req.params.noteId;
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, 'Invalid note id');
        }

        const result = await NoteModel.deleteOne({ _id: noteId }).exec();

        if (result.deletedCount === 0) {
            throw createHttpError(404, 'Note not found');
        }

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
