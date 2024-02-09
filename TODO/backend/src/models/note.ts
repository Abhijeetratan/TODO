import mongoose, { Schema, Document } from 'mongoose';

export interface Note extends Document {
    id: string;
    title: string;
    text: string;
    content?: string;
    createdAt: Date;
    updatedAt: Date;
}

const noteSchema = new Schema<Note>({

    title: { type: String, required: true },
    text: { type: String, required: true },
    content: { type: String },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

const NoteModel = mongoose.model<Note>('Note', noteSchema);

export default NoteModel;
