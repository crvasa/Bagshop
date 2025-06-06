import { Router, Request, Response } from "express"; 
import { sample_bags, sample_tags } from "../data"; 
import asyncHandler from 'express-async-handler'; 
import { BagModel } from "../models/bag.model"; 
import { count } from "console"; 

const router = Router();

// Route per il seed
router.get("/seed", asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const bagsCount = await BagModel.countDocuments();
            if (bagsCount > 0) {
                res.send("Seed is already done!");
                return;
            }
            await BagModel.create(sample_bags);
            res.send("Seed is done!");
        } catch (error) {
            res.status(500).send("Error seeding database");
        }
    }
));

// Route per ottenere tutte le borse
router.get("/", asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const bags = await BagModel.find();
            res.send(bags);
        } catch (error) {
            res.status(500).send("Error retrieving bags");
        }
    }
));

// Route per la ricerca delle borse
router.get("/search/:searchTerm", asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const searchRegex = new RegExp(req.params.searchTerm, 'i');
            const bags = await BagModel.find({ name: { $regex: searchRegex } });
            res.send(bags);
        } catch (error) {
            res.status(500).send("Error searching for bags");
        }
    }
));

// Route per ottenere i tag delle borse
// Route per ottenere i tag delle borse
router.get("/tags", asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const tags = await BagModel.aggregate([
                { $unwind: '$tags' },  // Scomponi gli array di tag
                { $group: { _id: '$tags', count: { $sum: 1 } } },  // Raggruppa per tag e conta le occorrenze
                { $project: { _id: 0, name: '$_id', count: '$count' } }  // Rimuovi _id e mantieni nome e conteggio
            ]).sort({ count: -1 });  // Ordina per conteggio decrescente
            
            const all = {
                name: 'All',
                count: await BagModel.countDocuments()  // Conta il numero totale di borse
            };

            // Aggiungi il tag "All" all'inizio dell'array dei tag
            (tags as any[]).unshift(all);  // Usa 'any[]' per forzare il tipo

            // Restituisci i tag
            res.send(tags);
        } catch (error) {
            res.status(500).send("Error retrieving tags");
        }
    }
));


// Route per ottenere borse per tag specifico
router.get("/tag/:tagName", asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const bags = await BagModel.find({ tags: req.params.tagName });
            res.send(bags);
        } catch (error) {
            res.status(500).send("Error retrieving bags for the tag");
        }
    }
));

// Route per ottenere una borsa per id
router.get("/:bagId", asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const bag = await BagModel.findById(req.params.bagId);
            res.send(bag);
        } catch (error) {
            res.status(500).send("Error retrieving the bag");
        }
    }
));

export default router;
