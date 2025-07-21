"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../data");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bag_model_1 = require("../models/bag.model");
const router = (0, express_1.Router)();
// Route per il seed
router.get("/seed", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bagsCount = yield bag_model_1.BagModel.countDocuments();
        if (bagsCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        yield bag_model_1.BagModel.create(data_1.sample_bags);
        res.send("Seed is done!");
    }
    catch (error) {
        res.status(500).send("Error seeding database");
    }
})));
// Route per ottenere tutte le borse
router.get("/", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bags = yield bag_model_1.BagModel.find();
        res.send(bags);
    }
    catch (error) {
        res.status(500).send("Error retrieving bags");
    }
})));
// Route per la ricerca delle borse
router.get("/search/:searchTerm", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const bags = yield bag_model_1.BagModel.find({ name: { $regex: searchRegex } });
        res.send(bags);
    }
    catch (error) {
        res.status(500).send("Error searching for bags");
    }
})));
// Route per ottenere i tag delle borse
// Route per ottenere i tag delle borse
router.get("/tags", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield bag_model_1.BagModel.aggregate([
            { $unwind: '$tags' }, // Scomponi gli array di tag
            { $group: { _id: '$tags', count: { $sum: 1 } } }, // Raggruppa per tag e conta le occorrenze
            { $project: { _id: 0, name: '$_id', count: '$count' } } // Rimuovi _id e mantieni nome e conteggio
        ]).sort({ count: -1 }); // Ordina per conteggio decrescente
        const all = {
            name: 'All',
            count: yield bag_model_1.BagModel.countDocuments() // Conta il numero totale di borse
        };
        // Aggiungi il tag "All" all'inizio dell'array dei tag
        tags.unshift(all); // Usa 'any[]' per forzare il tipo
        // Restituisci i tag
        res.send(tags);
    }
    catch (error) {
        res.status(500).send("Error retrieving tags");
    }
})));
// Route per ottenere borse per tag specifico
router.get("/tag/:tagName", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bags = yield bag_model_1.BagModel.find({ tags: req.params.tagName });
        res.send(bags);
    }
    catch (error) {
        res.status(500).send("Error retrieving bags for the tag");
    }
})));
// Route per ottenere una borsa per id
router.get("/:bagId", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bag = yield bag_model_1.BagModel.findById(req.params.bagId);
        res.send(bag);
    }
    catch (error) {
        res.status(500).send("Error retrieving the bag");
    }
})));
exports.default = router;
