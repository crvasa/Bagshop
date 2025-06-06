import { model, Schema, Document } from "mongoose";

// Interfaccia Bag con Document incluso per Mongoose
export interface Bag extends Document {
    id: number;
    name: string;
    price: number;
    tags: string[];
    favorite: boolean;
    description: string; 
    imageUrl: string;
    origins: string[];
    cookTime: string;
}

// Definizione dello schema
export const BagSchema = new Schema<Bag>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        tags: { type: [String] },  // Array di stringhe per i tag
        favorite: { type: Boolean, default: false },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        origins: { type: [String], required: true },  // Array di stringhe per le origini
        cookTime: { type: String, required: true },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

export const BagModel = model<Bag>('bag', BagSchema);
