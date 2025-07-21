"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BagModel = exports.BagSchema = void 0;
const mongoose_1 = require("mongoose");
// Definizione dello schema
exports.BagSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] }, // Array di stringhe per i tag
    favorite: { type: Boolean, default: false },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    origins: { type: [String], required: true }, // Array di stringhe per le origini
    cookTime: { type: String, required: true },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
exports.BagModel = (0, mongoose_1.model)('bag', exports.BagSchema);
